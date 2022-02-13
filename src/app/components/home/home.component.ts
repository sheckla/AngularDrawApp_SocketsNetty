import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';
import { UserHandlerService } from 'src/app/user-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  errorDisplayMessage = '';

  constructor(private userHandlerService: UserHandlerService){

  }

  onSubmit(e: any) {
    var name = e.target.nameInput.value;
    /* var email = e.target.emailInput.value;
    var password = e.target.passwordInput.value; */

    if (name.length >= 6) {
      this.userHandlerService.updateResultList(name);
    } else {
      this.errorDisplayMessage = "Name ist zu kurz";
    }
  }

}
