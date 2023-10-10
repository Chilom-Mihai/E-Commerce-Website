import { AsyncPipe, JsonPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { CategoryItem } from '../category/category.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LocationComponent } from '../location/location.component';


@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent, LocationComponent, CategoryComponent, FooterComponent, NgForOf, NgFor, RouterLink, NgIf, AsyncPipe, JsonPipe]
})
export class HomeComponent  {
  categoryItems: CategoryItem[] = [
    {
      title: 'Headphones',
      imgPath: '../../assets/headphones.svg',
      url: '/headphones'
    },
    {
      title: 'Speakers',
      imgPath: '../../../assets/speakers.svg',
      url: '/speakers'
    },
    {
      title: 'Earphones',
      imgPath: '../../../assets/earphones.svg',
      url: '/earphones'
    }
  ]
}
