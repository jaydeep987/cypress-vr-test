import { Component, OnInit, Input } from '@angular/core';
import { UiButton, uiButton } from './ui-button';

@Component({
  selector: 'ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent implements OnInit {

  @Input() uiButton: UiButton;
  @Input() test: string;
  public classNames: { [key: string]: boolean };

  constructor() { }

  ngOnInit() {
    this.classNames = {
      [this.uiButton.type]: true,
    };
  }

}
