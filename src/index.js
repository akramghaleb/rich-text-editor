/*
 * ExploreEditor
 *
 * The WYSIWYG Rich Text Editor
 * Copyright MetaExplore.
 * MIT license.
 */

import "./assets/css/editor.css";
import "./assets/css/editor-contents.css";

import ExploreEditor from "./editor";
import plugins from "./plugins";

if (!window.ExploreEditor) {
  Object.defineProperty(window, "ExploreEditor", {
    enumerable: true,
    writable: false,
    configurable: false,
    value: ExploreEditor.init({
      plugins: plugins,
    }),
  });
}
