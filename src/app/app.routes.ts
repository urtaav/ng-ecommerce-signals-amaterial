import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'products',
        loadComponent: () => import('./pages/products-grid/products-grid') // Adjusted to default export not is necessary the named export
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist') // Adjusted to default export not is necessary the named export
    }
];
