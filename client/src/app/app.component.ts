import { Component, OnInit } from '@angular/core';
import { UserHandlerService } from './services/user-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: any = 'OOAD'

  ngOnInit(): void {
  }
}
