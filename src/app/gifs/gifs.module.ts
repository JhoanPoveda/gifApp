import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardListComponent } from './components/card-list/card-list.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HomePageComponent } from './pages/home/home-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchBoxComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent,
    CardListComponent
  ]
})
export class GifsModule { }
