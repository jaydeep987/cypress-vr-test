import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-loading',
  templateUrl: './ui-loading.component.html',
  styleUrls: ['./ui-loading.component.scss']
})
export class UiLoadingComponent implements OnInit {

  @Input() loaderType: LoaderType;

  constructor() { }

  ngOnInit() {
  }

}

export type LoaderType = 'spinner-gif' | 'css-ring';
