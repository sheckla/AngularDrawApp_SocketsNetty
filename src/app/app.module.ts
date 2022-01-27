import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { SocketioService } from './socketio.service';
import { ZeichenflaecheComponent } from './components/zeichenflaeche/zeichenflaeche.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ZeichentoolsComponent } from './components/zeichentools/zeichentools.component';
import { JoinboardComponent } from './components/joinboard/joinboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ZeichenflaecheComponent,
    NavbarComponent,
    HomeComponent,
    ZeichentoolsComponent,
    JoinboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
