exports.reverseText = (text) => text.split("").reverse().join("");

exports.diffText = (a, b) => {
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  let diffs = [];
  for (let i = 0; i < Math.max(linesA.length, linesB.length); i++) {
    if (linesA[i] !== linesB[i]) {
      diffs.push(`Line ${i + 1}: "${linesA[i] || ""}" vs "${linesB[i] || ""}"`);
    }
  }
  return diffs.join("\n");
};

exports.countText = (text) => ({
  characterCount: text.length,
  wordCount: text.trim().split(/\s+/).filter(Boolean).length,
});

exports.convertCase = (text, type) => {
  switch (type) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return text.replace(
        /\w\S*/g,
        (w) => w[0].toUpperCase() + w.slice(1).toLowerCase()
      );
    default:
      return text;
  }
};
