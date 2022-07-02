import type { Module } from "../Module";

import type dialog from "./dialog";
import type component from "./component";
import type fileManager from "./fileManager";
import type resizing from "./resizing";

declare const _modules: Module[];

export { dialog, component, fileManager, resizing };
export default _modules;
