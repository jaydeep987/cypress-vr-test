import { Component, OnInit, Input } from '@angular/core';
import { UiTextbox, UiText } from './ui-text';

@Component({
  selector: 'ui-text',
  templateUrl: './ui-text.component.html',
  styleUrls: ['./ui-text.component.scss']
})
export class UiTextComponent implements OnInit {

  // Not good way, somehow I want to apply defaults but that's not priority for this demo!!
  @Input() uiText: UiTextbox = UiText;

  constructor() { }

  ngOnInit() {
  }

}
