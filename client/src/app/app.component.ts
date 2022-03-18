import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHandlerService } from './components/drawAppPage/services/user-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: any = 'OOAD'

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['drawApp']);
  }, 0);  //5s
  }
}
