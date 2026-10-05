import { z } from "astro/zod";

const latestReleaseSchema = z.object({
  version: z.string(),
  license: z.string().optional(),
});

export type NpmPackageInfo = z.infer<typeof latestReleaseSchema>;

const requests = new Map<string, Promise<NpmPackageInfo | undefined>>();

/**
 * A package's latest version and license, read from the npm registry at build
 * time: once per package, for every page that shows it. If npm doesn't answer,
 * the pages go without them instead of failing the build, so building offline
 * still works.
 */
export function getNpmPackageInfo(name: string) {
  let request = requests.get(name);
  if (!request) {
    request = fetchLatestRelease(name);
    requests.set(name, request);
  }
  return request;
}

async function fetchLatestRelease(name: string) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${name}/latest`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return latestReleaseSchema.parse(await response.json());
  } catch (error) {
    console.warn(`npm: no version for "${name}" (${error})`);
    return undefined;
  }
}

export const getNpmPackageUrl = (name: string) =>
  `https://www.npmjs.com/package/${name}`;
