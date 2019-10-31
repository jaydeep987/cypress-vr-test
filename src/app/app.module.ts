import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiButtonComponent } from './ui-components/ui-button/ui-button.component';
import { UiTextComponent } from './ui-components/ui-text/ui-text.component';
import { UiLoadingComponent } from './ui-components/ui-loading/ui-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    UiButtonComponent,
    UiTextComponent,
    UiLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
