import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  images: string[] = [
    'assets/img/slider/slider-1.jpg',
    'assets/img/slider/slider-2.jpg'
  ];

  slideOptions= {items: 1, dots: false, nav: false, loop: true, autoplay: true};

  constructor() {
  }

  ngOnInit() {

  }

}
