export class UiButton1 {
  public handleClick;
  public label: string;
  public type: ButtonTypes = 'primary';
  classNames: { [key: string]: boolean };

  init() {
    this.classNames = {
      [this.type]: true,
    };
  }

  onClick = ($event) => {
    if (this.handleClick) {
      this.handleClick($event);
    }
  }
}

export interface UiButton {
  handleClick: ($event) => void;
  label: string;
  type?: ButtonTypes;
  classnames?: { [key: string]: boolean };
}

export const uiButton: UiButton = {
  handleClick: undefined,
  label: undefined,
  type: 'primary',
};

export type ButtonTypes = 'primary' | 'secondary' | 'curved';
