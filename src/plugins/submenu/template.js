/*
 * ExploreEditor
 *
 * The WYSIWYG Rich Text Editor
 * Copyright MetaExplore.
 * MIT license.
 */

export default {
  name: "template",
  display: "submenu",
  add: function (core, targetElement) {
    const context = core.context;
    context.template = {};

    /** set submenu */
    let templateDiv = this.setSubmenu(core);

    /** add event listeners */
    templateDiv.querySelector("ul").addEventListener("click", this.pickup.bind(core));

    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, templateDiv);

    /** empty memory */
    templateDiv = null;
  },

  setSubmenu: function (core) {
    const templateList = core.options.templates;
    if (!templateList || templateList.length === 0) {
      throw Error(
        '[ExploreEditor.plugins.template.fail] To use the "template" plugin, please define the "templates" option.'
      );
    }

    const listDiv = core.util.createElement("DIV");
    listDiv.className = "meta-list-layer";

    let list = '<div class="meta-submenu meta-list-inner">' + '<ul class="meta-list-basic">';
    for (let i = 0, len = templateList.length, t; i < len; i++) {
      t = templateList[i];
      list +=
        '<li><button type="button" class="meta-btn-list" data-value="' +
        i +
        '" title="' +
        t.name +
        '">' +
        t.name +
        "</button></li>";
    }
    list += "</ul></div>";

    listDiv.innerHTML = list;

    return listDiv;
  },

  pickup: function (e) {
    if (!/^BUTTON$/i.test(e.target.tagName)) {
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    const temp = this.options.templates[e.target.getAttribute("data-value")];

    if (temp.html) {
      this.setContents(temp.html);
    } else {
      this.submenuOff();
      throw Error('[ExploreEditor.template.fail] cause : "templates[i].html not found"');
    }

    this.submenuOff();
  },
};
