// command
import type { CommandPlugin } from "./CommandPlugin";
import type blockquote from "./command/blockquote";

// submenu
import type { SubmenuPlugin } from "./SubmenuPlugin";
import type align from "./submenu/align";
import type font from "./submenu/font";
import type fontSize from "./submenu/fontSize";
import type fontColor from "./submenu/fontColor";
import type hiliteColor from "./submenu/hiliteColor";
import type horizontalRule from "./submenu/horizontalRule";
import type list from "./submenu/list";
import type table from "./submenu/table";
import type formatBlock from "./submenu/formatBlock";
import type lineHeight from "./submenu/lineHeight";
import type template from "./submenu/template";
import type paragraphStyle from "./submenu/paragraphStyle";
import type textStyle from "./submenu/textStyle";

// dialog
import type { DialogPlugin } from "./DialogPlugin";
import type link from "./dialog/link";
import type image from "./dialog/image";
import type video from "./dialog/video";
import type audio from "./dialog/audio";
import type math from "./dialog/math";

// file browser
import type { FileBrowserPlugin } from "./FileBrowserPlugin";
import type imageGallery from "./fileBrowser/imageGallery";

declare const _default: {
  blockquote: CommandPlugin;
  align: SubmenuPlugin;
  font: SubmenuPlugin;
  fontSize: SubmenuPlugin;
  fontColor: SubmenuPlugin;
  hiliteColor: SubmenuPlugin;
  horizontalRule: SubmenuPlugin;
  list: SubmenuPlugin;
  table: SubmenuPlugin;
  formatBlock: SubmenuPlugin;
  lineHeight: SubmenuPlugin;
  template: SubmenuPlugin;
  paragraphStyle: SubmenuPlugin;
  textStyle: SubmenuPlugin;
  link: DialogPlugin;
  image: DialogPlugin;
  video: DialogPlugin;
  audio: DialogPlugin;
  math: DialogPlugin;
  imageGallery: FileBrowserPlugin;
  [key: string]: CommandPlugin;
};

export {
  blockquote,
  align,
  font,
  fontSize,
  fontColor,
  hiliteColor,
  horizontalRule,
  list,
  table,
  formatBlock,
  lineHeight,
  template,
  paragraphStyle,
  textStyle,
  link,
  image,
  video,
  audio,
  math,
  imageGallery,
};

export default _default;
