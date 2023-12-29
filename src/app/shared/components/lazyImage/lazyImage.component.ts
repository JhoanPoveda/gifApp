import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyImage',
  templateUrl: './lazyImage.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input() public url!: string;

  @Input() public alt: string = "";

  hasLoaded: boolean = false;


  constructor() { }

  ngOnInit() {
    if(!this.url) throw new Error('Url is required')
  }

  onLoad(){
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
