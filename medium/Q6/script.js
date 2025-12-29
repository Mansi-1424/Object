// Symbol for hidden metadata
const metadataSymbol = Symbol("blogMetadata");

// Blog post object
const blogPost = {
  title: "Understanding JavaScript Symbols",
  content:
    "Symbols allow developers to create hidden object properties that avoid accidental access and collisions.",

  [metadataSymbol]: {
    createdAt: new Date().toLocaleDateString(),
    internalNotes: "Draft reviewed by editor"
  },

  getMetadata() {
    return this[metadataSymbol];
  }
};

// DOM references
const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const outputEl = document.getElementById("output");

// Initial render
titleEl.textContent = blogPost.title;
contentEl.textContent = blogPost.content;

// Show metadata safely
document.getElementById("showMeta").addEventListener("click", () => {
  const meta = blogPost.getMetadata();
  outputEl.textContent =
    `Created At: ${meta.createdAt}\nNotes: ${meta.internalNotes}`;
});

// Iterate properties (metadata should NOT appear)
document.getElementById("iterate").addEventListener("click", () => {
  let result = "Iterating blogPost:\n\n";

  for (let key in blogPost) {
    result += `${key}: ${blogPost[key]}\n`;
  }

  result += "\nObject.keys():\n";
  result += JSON.stringify(Object.keys(blogPost), null, 2);

  outputEl.textContent = result;
});
