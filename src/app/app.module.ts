import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { DrawboardComponent } from './components/drawboard/drawboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DrawtoolsComponent } from './components/drawtools/drawtools.component';
import { JoinboardComponent } from './components/joinboard/joinboard.component';


@NgModule({
  declarations: [
    AppComponent,
    DrawboardComponent,
    NavbarComponent,
    HomeComponent,
    DrawtoolsComponent,
    JoinboardComponent,
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
