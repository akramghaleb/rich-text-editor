import "../style.css";
import "../common.js";
import doc from "./doc.md";

const { marked } = window;

// Markdown code example
const mdom = document.getElementById("md-example");
mdom.innerHTML = marked.parse(doc);
