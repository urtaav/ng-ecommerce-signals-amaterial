import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle, RouterLink, TitleCasePipe],
  template: `

  <mat-sidenav-container>
    <mat-sidenav mode="side" opened="true">
      <div class="p-6">
        <h2 class="text-lg text-gray-900">Categories</h2>
        <mat-nav-list>
          @for (itemCategory of store.categories(); track itemCategory){
            <mat-list-item [activated]="itemCategory === category()" class="my-2" [routerLink]="['/products', itemCategory]">
              <span matListItemTitle class="font-medium" [class]="itemCategory === category() ? 'text-white': null">{{itemCategory | titlecase}}</span>
            </mat-list-item>
          }
        </mat-nav-list>
      </div>
    </mat-sidenav>
    <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900">{{store.category()}}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id){
            <app-product-card [product]="product" (addToCart)="addToCart($event)"></app-product-card>
          }
        </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {

  store = inject(EcommerceStore);

  category = input<string>('all');

  constructor(){
    this.store.setCategory(this.category);
  }


  addToCart = (product: Product) => {

  }
}
