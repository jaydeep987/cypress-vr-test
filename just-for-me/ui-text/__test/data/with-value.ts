import { UiTextComponent } from '../../ui-text.component';
import { UiTextbox } from '../../ui-text';

const uiText: UiTextbox = {
  value: 'This is some value'
};

export const test: Partial<UiTextComponent> = {
  uiText,
};
