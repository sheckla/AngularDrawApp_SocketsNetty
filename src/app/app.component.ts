import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from 'src/app/user-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'socketio-angular';
  userLoggedIn = false;

  constructor(private userHandlerService: UserHandlerService){
    this.userHandlerService.resultList$.subscribe(resultList => {
      if (resultList.length > 0) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  ngOnInit(): void {
  }
}
