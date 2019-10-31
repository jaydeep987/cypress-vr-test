import { UiButton } from '../../ui-button';
import { UiButtonComponent } from '../../ui-button.component';

const uiButton: UiButton = {
  label: 'Secondary',
  type: 'secondary',
  handleClick: () => console.log('ok'),
};

export const test: Partial<UiButtonComponent> = {
  uiButton,
  test: 'haha',
};
