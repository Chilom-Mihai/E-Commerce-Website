import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../category/category.model';
import { DataService } from '../data.service';
import { HeadphonesMobile } from './headphones.model';
import { HeaderHseComponent } from '../header-hse/header-hse.component';
import { CategoryComponent } from '../category/category.component';
import { LocationComponent } from '../location/location.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-headphones',
  templateUrl: './headphones.component.html',
  styleUrls: ['./headphones.component.scss'],
  imports: [HeaderHseComponent, RouterLink, CategoryComponent, LocationComponent, FooterComponent, NgIf, NgFor]
})
export class HeadphonesComponent implements OnInit{
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

  category = 'Headphones';

  headphonesComponents!: HeadphonesMobile[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(components => {
      this.headphonesComponents = components;
      // console.log(components)
    });
  }

}
