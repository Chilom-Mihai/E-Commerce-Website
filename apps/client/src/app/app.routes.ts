import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'headphones', loadComponent: () => import('./headphones/headphones.component').then(m => m.HeadphonesComponent) },
    { path: 'speakers', loadComponent: () => import('./speakers/speakers.component').then(m => m.SpeakersComponent) },
    { path: 'earphones', loadComponent: () => import('./earphones/earphones.component').then(m => m.EarphonesComponent) },
    { path: 'checkout', loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent) },
    { path: 'success-page', loadComponent: () => import('./success-page/success-page.component').then(m => m.SuccessPageComponent) },
    { path: 'product-detail/:name', loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
    { path: '**', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
];
