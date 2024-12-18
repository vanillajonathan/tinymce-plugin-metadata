# TinyMCE metadata plugin

This plugin lets the user edit metadata from a dialog within TinyMCE.

## Basic setup
```javascript
tinymce.init({
  selector: 'textarea',  // change this value according to your HTML
  external_plugins: {
    'metadata': '/dist/tinymce-plugin-metadata.js',
  },
  metadata: [
    { label: "Author", id: "author" },
    { label: "Copyright", id: "copyright" }
  ],
  menu: {
    file: { title: 'File', items: 'newdocument separator metadata print' },
  },
  toolbar: "metadata | undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
});
```

## Options
These configuration options affect the execution of the Metadata plugin.

`metadata` (type: array) - This option lets you specify a list of HTML elements to add to the metadata editor dialog.
It takes the form of an array with items to set label text and the name of the `id` attribute of the element.

You can hide the form input elements from the page using the `hidden` attribute.

## Toolbar buttons
The Metadata plugin provides the following toolbar buttons:

| Toolbar button identifier | Description |
| - | - |
| `metadata` | Opens the metadata dialog. |

## Menu items
The Metadata plugin provides the following menu items:

| Menu item identifier | Description |
| - | - |
| `metadata` | Opens the metadata dialog. |

## Commands
The Metadata plugin provides the following TinyMCE command.

| Command | Description |
| - | - |
| `mceMetadata` | Opens the metadata dialog. |

Example:
```javascript
tinymce.activeEditor.execCommand('mceMetadata');
```
