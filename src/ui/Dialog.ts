import { Editor } from 'tinymce';
import { Ui } from 'tinymce';

import * as Options from '../api/Options';

const open = (editor: Editor): void => {
  const items: Ui.Dialog.BodyComponentSpec[] = [];
  const initialData: Ui.Dialog.DialogData = {};
  const config = Options.getMetadata(editor);

  if (config === undefined) {
    throw Error('Metadata plugin not configured.');
  }

  for (const item of config) {
    const element = document.getElementById(item.id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

    if (element === null) {
      throw Error(`Element '#${item.id}' not found.`);
    }

    if (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA' && element.nodeName !== 'SELECT') {
      throw Error(`Element '#${item.id}' must be a input, textarea or a select but is ${element.nodeName}.`);
    }

    initialData[item.id] = element.value;

    const component: any = { type: 'input', name: item.id, label: item.label };

    if (element.nodeName === 'INPUT') {
      const inputElement = element as HTMLInputElement;
      component.type = 'input';
      if (inputElement.type === 'checkbox') {
        component.type = 'checkbox';
        initialData[item.id] = inputElement.checked;
        component.checked = inputElement.checked;
      } else if (inputElement.type === 'color') {
        component.type = 'colorinput';
      } else if (inputElement.type === 'range') {
        component.type = 'slider';
        initialData[item.id] = Number(element.value);
        component.min = Number(inputElement.min);
        component.max = Number(inputElement.max);
      }
      if (inputElement.inputMode) {
        component.inputMode = inputElement.inputMode;
      }
    } else if (element.nodeName === 'TEXTAREA') {
      component.type = 'textarea';
    } else if (element.nodeName === 'SELECT') {
      component.type = 'selectbox'; 
      component.items = [];
      for (const option of (element as HTMLSelectElement).options) {
        component.items.push({ text: option.label, value: option.value });
      }
    }

    if (element instanceof HTMLSelectElement && element.disabled) {
      component.enabled = false;
    }

    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      if (element.disabled || element.readOnly) {
        component.enabled = false;
      }
      if (element.placeholder) {
        component.placeholder = element.placeholder;
      }
    }

    items.push(component);
  }

  editor.windowManager.open({
    title: 'Metadata',
    size: 'normal',
    body: {
      type: 'panel',
      items
    },
    buttons: [
      {
        type: 'cancel',
        name: 'cancel',
        text: 'Cancel'
      },
      {
        type: 'submit',
        name: 'save',
        text: 'Save',
        primary: true
      }
    ],
    initialData,
    onSubmit: (api) => {
      for (const item of config) {
        const element = document.getElementById(item.id) as HTMLInputElement;
        if (element !== null) {
          element.value = api.getData()[item.id];
          if (element.type == 'checkbox') {
            element.checked = api.getData()[item.id];
          }
        }
      }
      api.close();
    }
  });
};

export { open };
