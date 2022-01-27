import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joinboard',
  templateUrl: './joinboard.component.html',
  styleUrls: ['./joinboard.component.css']
})
export class JoinboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit(code: any) {
    console.log("Code: " + code);
  }
}
