import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from './services/user-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userLoggedIn = false;
  title: any = 'OOAD'

  constructor(private userHandlerService: UserHandlerService){
    this.subscribeToUserHandlerService();
  }

  subscribeToUserHandlerService() {
    this.userHandlerService.clientName$.subscribe(userName => {
      if (userName.length >=6) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
