import "../style.css";
import "../common.js";

const { ExploreEditor, katex, CodeMirror } = window;

ExploreEditor.create("exampleOptions", {
  font: ["Arial", "tahoma", "Courier New,Courier"],
  fontSize: [8, 10, 14, 18, 24, 36],
  colorList: [
    ["#ccc", "#dedede", "OrangeRed", "Orange", "RoyalBlue", "SaddleBrown"],
    ["SlateGray", "BurlyWood", "DeepPink", "FireBrick", "Gold", "SeaGreen"],
  ],
  paragraphStyles: [
    "spaced",
    "neon",
    {
      name: "Custom",
      class: "__meta__customClass",
    },
  ],
  textStyles: [
    "translucent",
    {
      name: "Emphasis",
      style: "-webkit-text-emphasis: filled;",
      tag: "span",
    },
  ],
  width: "100%",
  maxWidth: "100%",
  minWidth: 400,
  height: "auto",
  videoWidth: "80%",
  youtubeQuery: "autoplay=1&mute=1&enablejsapi=1",
  imageWidth: 150,
  popupDisplay: "local",
  resizingBar: false,
  toolbarItem: [
    ["font", "fontSize", "fontColor", "hiliteColor", "video", "paragraphStyle", "textStyle", "fullScreen", "codeView"],
  ],
  callBackSave: function (contents) {
    alert(contents);
  },
});

ExploreEditor.create("lineBreak", {
  toolbarContainer: "#toolbar_container",
  showPathLabel: false,
  charCounter: true,
  maxCharCount: 720,
  maxWidth: "1920px",
  width: "auto",
  height: "auto",
  minHeight: "100px",
  maxHeight: "270px",
  toolbarItem: [
    ["undo", "redo", "font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript", "removeFormat"],
    "/", //Line break
    ["fontColor", "hiliteColor", "outdent", "indent", "align", "horizontalRule", "list", "table"],
    ["link", "image", "video", "fullScreen", "showBlocks", "codeView", "preview", "print", "save"],
  ],
  callBackSave: function (contents) {
    console.log(contents);
  },
});

ExploreEditor.create("useCodeMirror", {
  codeMirror: CodeMirror,
  toolbarItem: [["codeView"]],
  height: 330,
  width: "auto",
});

// response toolbar
ExploreEditor.create("responsive_Toolbar", {
  templates: [
    {
      name: "Template-1",
      html: "<p>HTML source1</p>",
    },
    {
      name: "Template-2",
      html: "<p>HTML source2</p>",
    },
  ],
  codeMirror: CodeMirror,
  katex: katex,
  toolbarItem: [
    // default
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock", "paragraphStyle", "blockquote"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
  ],
});

var spanDis = document.querySelector("#responsive_Toolbar_size");
window.addEventListener("resize", function (e) {
  spanDis.innerText = (window.innerWidth > 1200 ? 1200 : window.innerWidth) + "px";
});

// resize example
var editorimageResize = ExploreEditor.create("imageResize", {
  toolbarItem: [["undo", "redo"], ["image"]],
});

editorimageResize.onImageUploadBefore = function (files, info, core, uploadHandler) {
  try {
    ResizeImage(files, uploadHandler);
  } catch (err) {
    uploadHandler(err.toString());
  }
};

// upload management
var editorImageSample = ExploreEditor.create("imageManagement", {
  toolbarItem: [
    ["undo", "redo"],
    ["formatBlock"],
    ["horizontalRule", "list", "table"],
    ["image", "video"],
    ["showBlocks", "fullScreen", "preview", "print"],
  ],
});

function imageUpload(targetElement, index, state, imageInfo, remainingFilesCount) {
  console.log("imageInfo", imageInfo);

  if (state === "delete") {
    imageList.splice(findIndex(imageList, index), 1);
  } else {
    if (state === "create") {
      imageList.push(imageInfo);
    } else {
      // update
      //
    }
  }

  if (remainingFilesCount === 0) {
    console.log("imageList", imageList);
    setImageList(imageList);
  }
}

function videoUpload(targetElement, index, state, videoInfo, remainingFilesCount) {
  console.log("videoInfo", videoInfo);

  if (state === "delete") {
    videoList.splice(findIndex(videoList, index), 1);
  } else {
    if (state === "create") {
      videoList.push(videoInfo);
    } else {
      // update
      //
    }
  }

  if (remainingFilesCount === 0) {
    console.log("videoList", videoList);
    setVideoList(videoList);
  }
}

editorImageSample.onImageUpload = imageUpload;
editorImageSample.onVideoUpload = videoUpload;

// user function
var exploreEditor = null;
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var ds1 = document.getElementById("ds1");
var ds2 = document.getElementById("ds2");

var options = {
  toolbarItem: [
    ["undo", "redo"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["removeFormat"],
    ["outdent", "indent"],
    ["fullScreen", "showBlocks", "codeView"],
    ["preview", "print"],
    ["image", "video"],
  ],
  width: "100%",
};

exploreEditor = ExploreEditor.create("exampleFunction", options);

function exploreEditor_setOptions() {
  exploreEditor.setOptions({
    mode: "inline",
    minHeight: "300px",
    colorList: [["#ccc", "#dedede", "OrangeRed", "Orange", "RoyalBlue", "SaddleBrown"]],
    toolbarItem: [["fontColor", "hiliteColor"]],
  });

  opt1.style.display = "none";
  opt2.style.display = "inline-block";
}

function exploreEditor_resetOptions() {
  exploreEditor.setOptions({
    mode: "classic",
    minHeight: null,
    colorList: null,
    toolbarItem: [
      ["undo", "redo"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
      ["image", "video"],
    ],
  });

  opt1.style.display = "inline-block";
  opt2.style.display = "none";
}

function exploreEditor_setDefaultStyle() {
  exploreEditor.setDefaultStyle("font-family: cursive; font-size: 10px;");
  ds1.style.display = "none";
  ds2.style.display = "inline-block";
}

function exploreEditor_resetDefaultStyle() {
  exploreEditor.setDefaultStyle("");
  ds1.style.display = "inline-block";
  ds2.style.display = "none";
}

function exploreEditor_noticeOpen(message) {
  exploreEditor.noticeOpen(message);
}

function exploreEditor_noticeClose() {
  exploreEditor.noticeClose();
}

function exploreEditor_save() {
  exploreEditor.save();
}

function exploreEditor_getContext() {
  console.log(exploreEditor.getContext());
}

function exploreEditor_getContents() {
  alert(exploreEditor.getContents());
}

function exploreEditor_getText() {
  alert(exploreEditor.getText());
}

function exploreEditor_getImagesInfo() {
  console.log(exploreEditor.getImagesInfo());
}

function exploreEditor_getFilesInfo(pluginName) {
  console.log(exploreEditor.getFilesInfo(pluginName));
}

function exploreEditor_insertImage() {
  exploreEditor.insertImage(document.getElementById("example_files_input").files);
}

function exploreEditor_insertHTML(html) {
  exploreEditor.insertHTML(html);
}

function exploreEditor_setContents(content) {
  exploreEditor.setContents(content);
}

function exploreEditor_appendContents(content) {
  exploreEditor.appendContents(content);
}

function exploreEditor_disabled() {
  exploreEditor.disabled();
}

function exploreEditor_enabled() {
  exploreEditor.enabled();
}

function exploreEditor_show() {
  exploreEditor.show();
}

function exploreEditor_hide() {
  exploreEditor.hide();
}

function exploreEditor_toolbar_disabled() {
  exploreEditor.toolbar.disabled();
}

function exploreEditor_toolbar_enabled() {
  exploreEditor.toolbar.enabled();
}

function exploreEditor_toolbar_show() {
  exploreEditor.toolbar.show();
}

function exploreEditor_toolbar_hide() {
  exploreEditor.toolbar.hide();
}

function exploreEditor_destroy() {
  exploreEditor.destroy();
  exploreEditor = null;
}

function exploreEditor_create() {
  ExploreEditor.onload = function (core, reload) {
    console.log("onload-core", core);
    console.log("onload-reload", reload);
  };
  ExploreEditor.onScroll = function (e) {
    console.log("onScroll", e);
  };
  ExploreEditor.onMouseDown = function (e) {
    console.log("onMouseDown", e);
  };
  ExploreEditor.onClick = function (e) {
    console.log("onClick", e);
  };
  ExploreEditor.onInput = function (e) {
    console.log("onInput", e);
  };
  ExploreEditor.onKeyDown = function (e) {
    console.log("onKeyDown", e);
  };
  ExploreEditor.onKeyUp = function (e) {
    console.log("onKeyUp", e);
  };
  ExploreEditor.onDrop = function (e) {
    console.log("onDrop", e);
  };
  ExploreEditor.onChange = function (contents) {
    console.log("onChange", contents);
  };
  ExploreEditor.onPaste = function (e, cleanData, maxCharCount, core) {
    console.log("onPaste", e, cleanData, maxCharCount);
  };
  ExploreEditor.onCopy = function (e, clipboardData, core) {
    console.log("onCopy", e, clipboardData);
  };
  ExploreEditor.onCut = function (e, clipboardData, core) {
    console.log("onCut", e, clipboardData);
  };
  ExploreEditor.onFocus = function (contents) {
    console.log("onFocus", contents);
  };
  ExploreEditor.onBlur = function (contents) {
    console.log("onBlur", contents);
  };
  ExploreEditor.onImageUpload = function (targetElement, index, state, imageInfo, remainingFilesCount) {
    console.log(
      "targetElement:" +
        targetElement +
        ", index:" +
        index +
        ', state("create","update","delete"):' +
        state +
        ", imageInfo:" +
        imageInfo +
        ", remainingFilesCount:" +
        remainingFilesCount
    );
  };
  ExploreEditor.onVideoUpload = function (targetElement, index, state, videoInfo, remainingFilesCount) {
    console.log(
      "targetElement:" +
        targetElement +
        ", index:" +
        index +
        ', state("create","update","delete"):' +
        state +
        ", videoInfo:" +
        videoInfo +
        ", remainingFilesCount:" +
        remainingFilesCount
    );
  };
  ExploreEditor.showInline = function (toolbar, context) {
    console.log("toolbar", toolbar);
    console.log("context", context);
  };
  ExploreEditor.showController = function (name, controllers, core) {
    console.log("plugin name", name);
    console.log("controller elements", controllers);
  };
}

exploreEditor_create();
