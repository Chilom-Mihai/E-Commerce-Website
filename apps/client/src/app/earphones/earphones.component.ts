import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../category/category.model';
import { DataService } from '../data.service';
import { EarphonesMobile } from './earphones.model';
import { HeaderHseComponent } from '../header-hse/header-hse.component';
import { CategoryComponent } from '../category/category.component';
import { LocationComponent } from '../location/location.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone:true,
  selector: 'full-stack-eshop-app-earphones',
  templateUrl: './earphones.component.html',
  styleUrls: ['./earphones.component.scss'],
  imports:[HeaderHseComponent, RouterLink, CategoryComponent, LocationComponent, FooterComponent, NgFor, NgIf]
})
export class EarphonesComponent implements OnInit {

  earphonesComponents!: EarphonesMobile[];

  constructor(private dataService: DataService) { }
  
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

  earphones = 'earphones'

  ngOnInit() {
    this.dataService.getData3().subscribe(components => {
      this.earphonesComponents = components;
      // console.log(components)
    });
  }
}
