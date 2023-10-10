import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  selector: 'full-stack-eshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  constructor(private http: HttpClient) { }

  createSession() {
    this.http.post('api/checkout-session', {}).subscribe((data: any) => {
      // Redirect to the Stripe checkout page
      window.location.href = data.url;
    });
  }
}
