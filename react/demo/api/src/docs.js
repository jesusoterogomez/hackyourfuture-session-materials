import DOCS_HTML from "./docs.html";
import { html } from "./http.js";

export function showDocs() {
  return html(DOCS_HTML);
}
