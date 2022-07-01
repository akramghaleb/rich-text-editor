## 1. Include JS/CSS
```html
<link href="https://cdn.jsdelivr.net/npm/explore-editor@latest/dist/css/explore-editor.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/explore-editor@latest/dist/explore-editor.min.js"></script>
```


## 2. Target a element
```html
<textarea id="editor-demo">Hi</textarea>
```


## 3. Create
```javascript
/**
* ID : 'editor-demo'
* ClassName : 'explore-editor'
*/
// ID or DOM object
const explore_editor = ExploreEditor.create((document.getElementById('editor-demo') || 'editor-demo'),{
  // All of the plugins are loaded in the "window.ExploreEditor" object in build/explore-editor.min.js file
  // Insert options
  // Language global object (default: en)
  lang: ExploreEditor_LANG['en']
});
```