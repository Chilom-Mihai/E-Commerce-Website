import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../category/category.model';
import { DataService } from '../data.service';
import { HeaderHseComponent } from '../header-hse/header-hse.component';
import { SpeakersMobile } from './speakers.model';
import { CategoryComponent } from '../category/category.component';
import { LocationComponent } from '../location/location.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
  imports: [HeaderHseComponent, RouterLink, CategoryComponent, LocationComponent, FooterComponent, NgIf, NgFor]
})
export class SpeakersComponent implements OnInit{
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
  category = 'Speaker';

  speakersComponents!: SpeakersMobile[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData2().subscribe(components => {
      this.speakersComponents = components;
      // console.log(components)
    });
  }
}
