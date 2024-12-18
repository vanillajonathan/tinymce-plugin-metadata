import { Editor } from 'tinymce';

const register = (editor: Editor): void => {
  const onAction = () => editor.execCommand('mceMetadata');

  editor.ui.registry.addButton('metadata', {
    icon: 'metadata',
    tooltip: 'Edit metadata',
    onAction,
  });

  editor.ui.registry.addIcon('metadata', '<svg height="24" width="24"><path d="M12 19 L19 5 L5 5 Z" /></svg>');

  editor.ui.registry.addMenuItem('metadata', {
    text: 'Edit metadata',
    onAction
  });
};

export {
  register
};
