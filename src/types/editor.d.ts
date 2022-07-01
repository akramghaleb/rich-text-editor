import { ExploreEditorOptions } from "./options";
import ExploreEditor from "./lib/core";

declare namespace _default {
  export function create(
    targetElement: string | Element,
    options: ExploreEditorOptions,
    init_options?: ExploreEditorOptions
  ): ExploreEditor;
  export function init(init_options: ExploreEditorOptions): {
    create: typeof create;
  };
}

export default _default;
