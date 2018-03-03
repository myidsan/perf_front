import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatRadioModule, MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CardModalService } from './service/card-modal.service';
// Service
import { SurveyResultService } from './service/survery-result.service';
import { routes } from './routes';
import { ModalsComponent } from './modal/modals/modals.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    ProfileCardComponent,
    ModalsComponent,
  ],
  imports: [
    BrowserModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    routes,
  ],
  providers: [SurveyResultService, CardModalService],
  bootstrap: [AppComponent],
})
export class AppModule { }
