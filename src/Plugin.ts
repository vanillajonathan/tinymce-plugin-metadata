import { Editor, TinyMCE } from 'tinymce';

import * as Commands from './api/Commands';
import * as Menu from './ui/Menu';
import * as Options from './api/Options';

declare const tinymce: TinyMCE;

export default (): void => {
  tinymce.PluginManager.add('metadata', (editor: Editor) => {
    Commands.register(editor);
    Options.register(editor);
    Menu.register(editor);
  });
};
