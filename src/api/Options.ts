import { Editor, EditorOptions } from 'tinymce';

const option: {
  <K extends keyof EditorOptions>(name: K): (editor: Editor) => EditorOptions[K] | undefined;
  <T>(name: string): (editor: Editor) => T | undefined;
} = (name: string) => (editor: Editor) =>
  editor.options.get(name);
  
type MetadataConfig = {
  label: string,
  id: string,
}

const register = (editor: Editor): void => {
  const registerOption = editor.options.register;

  registerOption('metadata', {
    processor: 'object[]'
  });
};

const getMetadata = option<MetadataConfig[]>('metadata');

export {
  register,
  getMetadata
};
