import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-zeichenflaeche',
  templateUrl: './zeichenflaeche.component.html',
  styleUrls: ['./zeichenflaeche.component.css']
})


export class ZeichenflaecheComponent implements OnInit {
  canvas;

  ngOnInit(): void {

  }
  constructor() {
    var canvas = document.getElementById("zeichenflaeche");

  }

}
