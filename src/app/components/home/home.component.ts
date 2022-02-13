import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';
import { UserHandlerService } from 'src/app/user-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userHandlerService: UserHandlerService){

  }

  //zeigt Eingabewerte
  onSubmit(e: any) {
    var name = e.target.nameInput.value;
    var email = e.target.emailInput.value;
    var password = e.target.passwordInput.value;

    //console.log("User - " + name + " has signed in");
    this.userHandlerService.updateResultList(name);
  }

}
