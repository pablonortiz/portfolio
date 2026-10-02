const countWords = (text: string) => text.trim().split(/\s+/).length;

/**
 * Reading-pace timing of the Hero text: for each group, the words before it and
 * its own words (as CSS variables), plus the total word count.
 */
export function getRevealTiming(groups: string[][]) {
  const wordCounts = groups.map((group) => countWords(group.join(" ")));
  const groupStyles = wordCounts.map((words, index) => {
    const wordsBefore = wordCounts
      .slice(0, index)
      .reduce((sum, count) => sum + count, 0);
    return `--words-before: ${wordsBefore}; --words: ${words}`;
  });
  const totalWords = wordCounts.reduce((sum, count) => sum + count, 0);
  return { groupStyles, totalWords };
}
