import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './services/in-memory-data.service'


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicantDetailComponent } from './applicant-detail/applicant-detail.component';


import { TimeOfDayPipe } from './pipes/time-of-day.pipe'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ApplicantDetailComponent,
    TimeOfDayPipe
  ], 
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    RouterModule.forRoot([
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'applicant/:id',
        component: ApplicantDetailComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
