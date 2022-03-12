import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/services/user-handler.service';

@Component({
  selector: 'app-draw-app',
  templateUrl: './draw-app.component.html',
  styleUrls: ['./draw-app.component.css']
})
export class DrawAppComponent implements OnInit {
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
