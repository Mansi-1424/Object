
const metadataSymbol = Symbol("blogMetadata");


const blogPost = {
  title: "Understanding JavaScript Symbols",
  content:
    "Symbols allow developers to create hidden object properties that avoid accidental access and collisions.",

  [metadataSymbol]: {
    createdAt: new Date().toLocaleDateString(),
    internalNotes: "Draft reviewed by editor"
  },

};


const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const outputEl = document.getElementById("output");


titleEl.textContent = blogPost.title;
contentEl.textContent = blogPost.content;


document.getElementById("showMeta").addEventListener("click", () => {
  const meta = blogPost.getMetadata();
  outputEl.textContent =
    `Created At: ${meta.createdAt}\nNotes: ${meta.internalNotes}`;
});


document.getElementById("iterate").addEventListener("click", () => {
  let result = "Iterating blogPost:\n\n";

  for (let key in blogPost) {
    result += `${key}: ${blogPost[key]}\n`;
  }
  outputEl.textContent = result;
});
