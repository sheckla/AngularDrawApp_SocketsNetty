import { Component} from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  errorDisplayMessage = '';

  constructor(private userHandlerService: UserHandlerService){
  }

  registerAsGuest() {
    this.userHandlerService.updateClientName("Gastnutzer" + Math.floor(Math.random() * 2500));
  }

  registerWithName(userName, password) {
    if (userName.length >= 4 && password.length >= 6) {
      this.userHandlerService.updateClientName(userName);
    } else if (password.length < 6) {
      this.errorDisplayMessage = "Passwort zu kurz";
    } else {
      this.errorDisplayMessage = "Name ist zu kurz";
    }
  }
}
