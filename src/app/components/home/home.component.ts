import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(){

  }

  //zeigt Eingabewerte
  clickme(email: any, passw: any) {

    //console.log(email + " " + passw);
  }


  

}
