import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HeadphonesMobile } from './headphones/headphones.model';
import { ProductDetail } from './product-detail/product-detail.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<HeadphonesMobile[]> {
    return this.http.get<HeadphonesMobile[]>('api/items').pipe(
      map(data => data.filter(item => item.category === 'headphones'))
    );
  }

  getData2(): Observable<HeadphonesMobile[]> {
    return this.http.get<HeadphonesMobile[]>('api/items').pipe(
      map(data => data.filter(item => item.category === 'speakers'))
    );
  }

  getData3(): Observable<HeadphonesMobile[]> {
    return this.http.get<HeadphonesMobile[]>('api/items').pipe(
      map(data => data.filter(item => item.category === 'earphones'))
    );
  }

  getDataByName(name: string): Observable<ProductDetail | undefined> {
    return this.http.get<ProductDetail[]>('api/items').pipe(
      map(data => data.find(item => item.name === name))
    );
  }

  getDataBySlug(slug: string): Observable<ProductDetail | undefined> {
    return this.http.get<ProductDetail[]>('api/items').pipe(
      map(data => data.find(item => item.slug === slug))
    );
  }
}
