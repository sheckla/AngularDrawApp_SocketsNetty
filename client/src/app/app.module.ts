import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { IndexComponent } from './components/indexPage/index/index.component';
import { DrawAppComponent } from './components/drawAppPage/draw-app/draw-app.component';
import { DrawboardComponent } from './components/drawAppPage/drawboard/drawboard.component';
import { DrawtoolsComponent } from './components/drawAppPage/drawtools/drawtools.component';
import { HomeComponent } from './components/drawAppPage/home/home.component';
import { JoinboardComponent } from './components/drawAppPage/joinboard/joinboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    DrawboardComponent,
    NavbarComponent,
    HomeComponent,
    DrawtoolsComponent,
    JoinboardComponent,
    DrawAppComponent,
    IndexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
