# Project tasks. `just` lists them.

set shell := ["bash", "-euo", "pipefail", "-c"]
set quiet
# Cloudflare's credentials, for upload-videos (.env is not in git).
set dotenv-load

# SVT-AV1 prints its whole configuration unless told to log only errors.
export SVT_LOG := "1"

masters := "videos/masters"
prepared := "videos/prepared"
output := "public/videos"
content := "src/content/projects"
# The R2 bucket served at media.pablonortiz.com (docs/projects.md §42.7).
media_bucket := "pablonortiz-media"

# Starting points; to calibrate with the first real masters (docs/projects.md §42.7).
av1_crf := "35"
h264_crf := "24"

# Vertical (mobile) masters become 16:9: the screen centered at 86% of the height with
# rounded corners, over an enlarged, blurred and slightly darkened copy of itself.
rounded_corners := "if(lte(hypot(max(0,abs(X-W/2)-(W/2-36)),max(0,abs(Y-H/2)-(H/2-36))),36),255,0)"
mobile_background := "[background]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,gblur=sigma=40,eq=brightness=-0.08[background]"
mobile_screen := "[screen]scale=-2:928,format=yuva420p,geq=lum='p(X,Y)':a='" + rounded_corners + "'[screen]"
mobile_composition := "split[background][screen];" + mobile_background + ";" + mobile_screen + ";[background][screen]overlay=(W-w)/2:(H-h)/2"

default:
    @just --list

# Encodes a project's masters into everything the site uses (docs/projects.md §42.7).
encode-video slug:
    echo "Encoding {{ slug }}"
    just _check-clip {{ slug }}
    just _prepare {{ slug }} clip
    just _encode {{ slug }} clip 1280:720
    just _stills {{ slug }}
    if [ -f "{{ masters }}/{{ slug }}-tour.mp4" ]; then just _prepare {{ slug }} tour && just _encode {{ slug }} tour 1920:1080; fi

# Creates placeholder masters for projects that have none (npm packages have no clip) and encodes them.
placeholder-videos:
    #!/usr/bin/env bash
    set -euo pipefail
    for project in {{ content }}/*/; do
      slug=$(basename "$project")
      grep -q '^npmPackage:' "$project/project.yaml" && continue
      [ -f "{{ masters }}/$slug-clip.mp4" ] && continue
      just _placeholder-master "$slug"
      just encode-video "$slug"
    done

# Only what changed goes up, and what's no longer here is deleted there. Cached for a day, so a
# re-encoded video can take that long to show (or purge it in Cloudflare).
# Uploads the encoded videos to Cloudflare R2, served at media.pablonortiz.com (docs/projects.md §42.7).
upload-videos:
    #!/usr/bin/env bash
    set -euo pipefail
    : "${CLOUDFLARE_API_TOKEN:?missing in .env}" "${CLOUDFLARE_ACCOUNT_ID:?missing in .env}"
    # R2's S3 credentials come from the (account) API token itself: its id and the SHA-256 of its value.
    token_id=$(curl -fsS -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
      "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/tokens/verify" |
      python3 -c 'import json, sys; print(json.load(sys.stdin)["result"]["id"])')
    export RCLONE_CONFIG=/dev/null RCLONE_CONFIG_R2_TYPE=s3 RCLONE_CONFIG_R2_PROVIDER=Cloudflare \
      RCLONE_CONFIG_R2_ENDPOINT="https://$CLOUDFLARE_ACCOUNT_ID.r2.cloudflarestorage.com" \
      RCLONE_CONFIG_R2_ACCESS_KEY_ID="$token_id" \
      RCLONE_CONFIG_R2_SECRET_ACCESS_KEY="$(printf %s "$CLOUDFLARE_API_TOKEN" | shasum -a 256 | cut -d ' ' -f 1)"
    rclone sync {{ output }} "r2:{{ media_bucket }}/videos" \
      --header-upload "Cache-Control: public, max-age=86400" --stats-one-line --stats 10s

_check-clip slug:
    #!/usr/bin/env bash
    set -euo pipefail
    master="{{ masters }}/{{ slug }}-clip.mp4"
    [ -f "$master" ] || { echo "Missing $master" >&2; exit 1; }
    duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$master")
    if awk -v duration="$duration" 'BEGIN { exit !(duration > 5.0) }'; then
      echo "$master lasts ${duration}s; the maximum is 5.0s" >&2
      exit 1
    fi

# Normalizes a master to 1920×1080 at 30 fps, composing vertical ones into 16:9.
_prepare slug kind:
    #!/usr/bin/env bash
    set -euo pipefail
    master="{{ masters }}/{{ slug }}-{{ kind }}.mp4"
    IFS=x read -r width height < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0:s=x "$master")
    if (( height > width )); then
      filter="{{ mobile_composition }}"
    elif (( width * 9 == height * 16 )); then
      filter="scale=1920:1080:flags=lanczos"
    else
      echo "$master is ${width}×${height}; expected 16:9 or vertical" >&2
      exit 1
    fi
    mkdir -p "{{ prepared }}"
    ffmpeg -v error -y -i "$master" -an -filter_complex "$filter,fps=30,format=yuv420p" \
      -c:v libx264 -crf 10 -preset veryfast "{{ prepared }}/{{ slug }}-{{ kind }}.mp4"

# AV1 is the lightest; H.264 is for browsers without AV1 (Safari only decodes it in hardware).
_encode slug kind size:
    mkdir -p "{{ output }}/{{ slug }}"
    ffmpeg -v error -y -i "{{ prepared }}/{{ slug }}-{{ kind }}.mp4" -vf "scale={{ size }}:flags=lanczos" -an \
      -c:v libsvtav1 -preset 6 -crf {{ av1_crf }} -movflags +faststart "{{ output }}/{{ slug }}/{{ kind }}.av1.mp4"
    ffmpeg -v error -y -i "{{ prepared }}/{{ slug }}-{{ kind }}.mp4" -vf "scale={{ size }}:flags=lanczos" -an \
      -c:v libx264 -preset slow -crf {{ h264_crf }} -profile:v high -pix_fmt yuv420p -movflags +faststart \
      "{{ output }}/{{ slug }}/{{ kind }}.h264.mp4"

# The first frame shows while the clip loads; the last one is the project's poster, kept in git.
_stills slug:
    ffmpeg -v error -y -i "{{ prepared }}/{{ slug }}-clip.mp4" -vf "scale=1280:720:flags=lanczos" -frames:v 1 \
      -c:v libsvtav1 -crf 30 "{{ output }}/{{ slug }}/clip-start.avif"
    ffmpeg -v error -y -sseof -1 -i "{{ prepared }}/{{ slug }}-clip.mp4" -vf "scale=1280:720:flags=lanczos" \
      -update 1 "{{ content }}/{{ slug }}/poster.png"

# 4 s of a slowly moving gradient in the category's colors with a progress bar on top, then 0.5 s still.
_placeholder-master slug:
    #!/usr/bin/env bash
    set -euo pipefail
    category=$(sed -n 's/^category: //p' "{{ content }}/{{ slug }}/project.yaml")
    case "$category" in
      web) colors="c0=0x1e1b4b:c1=0x4338ca:c2=0x818cf8" ;;
      mobile) colors="c0=0x2e1065:c1=0x7c3aed:c2=0xc4b5fd" ;;
      desktop) colors="c0=0x4a044e:c1=0xc026d3:c2=0xf0abfc" ;;
      *) colors="c0=0x0b0a12:c1=0x312e81:c2=0x6d28d9" ;;
    esac
    [ "$category" = mobile ] && size=1080x2340 || size=1920x1080
    seed=$(cksum <<< "{{ slug }}" | cut -d' ' -f1)
    mkdir -p "{{ masters }}"
    ffmpeg -v error -y \
      -f lavfi -i "gradients=s=${size}:rate=30:duration=4:nb_colors=3:${colors}:speed=0.03:seed=${seed}" \
      -f lavfi -i "color=white@0.9:s=${size%x*}x16:rate=30:duration=4" \
      -filter_complex "[0][1]overlay=x='-w+w*t/4':y=0:shortest=1,tpad=stop_mode=clone:stop_duration=0.5,format=yuv420p" \
      -c:v libx264 -crf 12 -preset veryfast "{{ masters }}/{{ slug }}-clip.mp4"
