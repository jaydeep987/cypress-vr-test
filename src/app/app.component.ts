import { Component, OnInit } from '@angular/core';
import { UiButton } from './ui-components/ui-button/ui-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cypress-vr-test';
  uiButton: UiButton;
  yuhu: string;

  ngOnInit(): void {
    this.uiButton.type = 'primary';
    this.uiButton.label = 'Primary Button';
    this.uiButton.handleClick = this.handleButtonClick;
  }

  handleButtonClick = () => {
    this.yuhu = 'Yuhuuu!!';
  }
}
