import { Editor } from 'tinymce';

import * as Dialog from '../ui/Dialog';

const register = (editor: Editor): void => {
  editor.addCommand('mceMetadata', () => {
    Dialog.open(editor);
  });
};

export {
  register
};
