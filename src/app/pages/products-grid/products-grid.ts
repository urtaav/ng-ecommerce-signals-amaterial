import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard, MatSidenavContainer, MatSidenavContent, MatSidenav, MatNavList, MatListItem, MatListItemTitle,RouterLink,TitleCasePipe],
  template: `

  <mat-sidenav-container>
    <mat-sidenav mode="side" opened="true">
      <div class="p-6">
        <h2 class="text-lg text-gray-900">Categories</h2>
        <mat-nav-list>
          @for (itemCategory of categories(); track itemCategory){
            <mat-list-item [activated]="itemCategory === category()" class="my-2" [routerLink]="['/products', itemCategory]">
              <span matListItemTitle class="font-medium" [class]="itemCategory === category() ? 'text-white': null">{{itemCategory | titlecase}}</span>
            </mat-list-item>
          }
        </mat-nav-list>
      </div>
    </mat-sidenav>
    <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900">{{category()}}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ filteredProducts().length }} products found
        </p>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id){
            <app-product-card [product]="product" (addToCart)="addToCart($event)"></app-product-card>
          }
        </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {

  category = input<string>('all');
  products = signal<Product[]>([
    {
      id: 1,
      name: "Mechanical Keyboard RGB",
      description: "Durable mechanical keyboard with RGB lighting and blue switches.",
      price: 89.99,
      imageUrl: "https://www.gskill.com/_upload/images/2303141832150.png",
      rating: 4.7,
      reviewCount: 134,
      inStock: true,
      category: "electronics",
    },
    {
      id: 2,
      name: "Wireless gaming Mouse",
      description: "Ergonomic mouse with high-precision sensor and customizable DPI.",
      price: 49.5,
      imageUrl: "https://i.ytimg.com/vi/gm4vPHHwIjo/maxresdefault.jpg",
      rating: 4.6,
      reviewCount: 220,
      inStock: true,
      category: "electronics",
    },
    {
      id: 3,
      name: "27'' 4K Monitor",
      description: "Ultra HD IPS monitor with 144Hz refresh rate for smooth visuals.",
      price: 329.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2025/06/BEST-4K-MONITORS-5554.jpg?auto=webp&quality=75&width=1024",
      rating: 4.8,
      reviewCount: 95,
      inStock: true,
      category: "electronics",
    },
    {
      id: 4,
      name: "Ultrabook 14'' Laptop",
      description: "Slim and powerful laptop with Intel i7, 16GB RAM, and 512GB SSD.",
      price: 999.0,
      imageUrl: "https://cdn.mos.cms.futurecdn.net/XqGivtuX2z53CpKzBSkbw4-1920-80.jpg",
      rating: 4.5,
      reviewCount: 88,
      inStock: true,
      category: "computers",
    },
    {
      id: 5,
      name: "Ergonomic office Chair",
      description: "Comfortable adjustable chair with lumbar and head support.",
      price: 179.99,
      imageUrl: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2023_17/3604406/230425-ergonomic-chairs-kb-2x1.jpg",
      rating: 4.4,
      reviewCount: 160,
      inStock: true,
      category: "furniture",
    },
    {
      id: 6,
      name: "Noise Cancelling Headphones",
      description: "Wireless headphones with ANC and 30-hour battery life.",
      price: 149.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2025/05/BEST-NOISE-CANCELLING-HEADPHONES-8246-3x2-1.jpg?auto=webp&quality=75&crop=1:1,smart&width=1024",
      rating: 4.6,
      reviewCount: 340,
      inStock: true,
      category: "audio",
    },
    {
      id: 7,
      name: "Smartwatch Pro",
      description: "Fitness tracker with heart rate monitor and GPS support.",
      price: 159.99,
      imageUrl: "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-watch-2-pro/m/845f663b715b254ac30baac221535abb.png",
      rating: 4.3,
      reviewCount: 410,
      inStock: false,
      category: "wearables",
    },
    {
      id: 8,
      name: "Android Tablet 10''",
      description: "HD display tablet with 64GB storage and long battery life.",
      price: 189.99,
      imageUrl: "https://i.ytimg.com/vi/PcWQjuNsQtw/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgWyhIMA8=&rs=AOn4CLA8axPb6vE-iW4XZBTXAYgcvFJ_yA",
      rating: 4.2,
      reviewCount: 90,
      inStock: true,
      category: "electronics",
    },
    {
      id: 9,
      name: "DSLR Camera 24MP",
      description: "Professional camera with Wi-Fi and interchangeable lens.",
      price: 849.99,
      imageUrl: "https://i.pcmag.com/imagery/reviews/05OtNndziIOZP3u9QWEDMrr-2..v1701893932.jpg",
      rating: 4.9,
      reviewCount: 55,
      inStock: true,
      category: "photography",
    },
    {
      id: 10,
      name: "Studio Microphone",
      description: "Professional condenser microphone for recording and streaming.",
      price: 109.99,
      imageUrl: "https://cdn.mos.cms.futurecdn.net/8gX8TFTDn8pJwgc4RHe5rc.jpg",
      rating: 4.5,
      reviewCount: 145,
      inStock: true,
      category: "audio",
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      description: "Portable waterproof speaker with 12-hour battery life.",
      price: 59.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/11/portablebluetoothspeakers-2048px-9130.jpg?auto=webp&quality=75&width=1024",
      rating: 4.4,
      reviewCount: 230,
      inStock: true,
      category: "audio",
    },
    {
      id: 12,
      name: "1TB NVMe SSD",
      description: "High-speed solid state drive with ultra-fast read/write speeds.",
      price: 139.99,
      imageUrl: "https://m.media-amazon.com/images/I/61dFM2e6mUL.jpg",
      rating: 4.8,
      reviewCount: 300,
      inStock: true,
      category: "storage",
    },
    {
      id: 13,
      name: "16GB DDR4 RAM",
      description: "High-performance 3200MHz DDR4 memory module.",
      price: 69.99,
      imageUrl: "https://assets.corsair.com/image/upload/c_pad,q_auto,h_1024,w_1024,f_auto/products/Memory/CMG16GX4M1E3200C16/Gallery/VENGEANCE_RGB_RS_10.webp",
      rating: 4.7,
      reviewCount: 120,
      inStock: true,
      category: "components",
    },
    {
      id: 14,
      name: "Wireless Charger",
      description: "Fast charging pad compatible with iPhone and Android.",
      price: 24.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_E773pwkW5v0xMffTzRnFDO7NnZMJbxyhQ&s",
      rating: 4.2,
      reviewCount: 180,
      inStock: true,
      category: "accessories",
    },
    {
      id: 15,
      name: "WiFi 6 Router",
      description: "High-speed dual-band router with advanced security features.",
      price: 129.99,
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwA1UOXz5pKXBZmgccZgIl50NszLoTLblDyg&s",
      rating: 4.6,
      reviewCount: 88,
      inStock: true,
      category: "networking",
    },
    {
      id: 16,
      name: "Smart TV 55'' 4K",
      description: "4K Ultra HD smart TV with Android OS and voice assistant.",
      price: 699.99,
      imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/mx/un55u8000ffxzx/gallery/mx-uhd-u8000f-un55u8000ffxzx-545406768?$720_576_JPG$",
      rating: 4.5,
      reviewCount: 65,
      inStock: true,
      category: "electronics",
    },
    {
      id: 17,
      name: "Multifunction Printer",
      description: "All-in-one printer with WiFi and scanning capabilities.",
      price: 119.99,
      imageUrl: "https://cdn.thewirecutter.com/wp-content/media/2024/07/allinoneprinters-2048px-01817-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024",
      rating: 4.1,
      reviewCount: 105,
      inStock: true,
      category: "office",
    },
    {
      id: 18,
      name: "Full HD Webcam",
      description: "1080p webcam with built-in microphone for meetings.",
      price: 59.99,
      imageUrl: "https://www.logitech.com/content/dam/logitech/en/products/webcams/brio-500/gallery/brio-500-gallery-offwhite-1.png",
      rating: 4.4,
      reviewCount: 97,
      inStock: true,
      category: "accessories",
    },
    {
      id: 19,
      name: "LED Projector",
      description: "Compact projector with HDMI and wireless screen mirroring.",
      price: 199.99,
      imageUrl: "https://source.unsplash.com/featured/?projector",
      rating: 4.3,
      reviewCount: 112,
      inStock: true,
      category: "home theater",
    },
    {
      id: 20,
      name: "gaming Chair",
      description: "Comfortable adjustable chair with headrest and lumbar pillow.",
      price: 249.99,
      imageUrl: "https://source.unsplash.com/featured/?gaming-chair",
      rating: 4.5,
      reviewCount: 180,
      inStock: true,
      category: "furniture",
    },
    {
      id: 21,
      name: "Smartphone 128GB",
      description: "5G smartphone with AMOLED display and dual cameras.",
      price: 699.99,
      imageUrl: "https://source.unsplash.com/featured/?smartphone",
      rating: 4.7,
      reviewCount: 210,
      inStock: true,
      category: "mobile",
    },
    {
      id: 22,
      name: "External Hard Drive 2TB",
      description: "Portable USB 3.0 hard drive with fast data transfer.",
      price: 99.99,
      imageUrl: "https://source.unsplash.com/featured/?hard-drive",
      rating: 4.6,
      reviewCount: 300,
      inStock: true,
      category: "storage",
    },
    {
      id: 23,
      name: "Mechanical gaming Pad",
      description: "Customizable gaming keypad with programmable keys.",
      price: 59.99,
      imageUrl: "https://source.unsplash.com/featured/?gaming-pad",
      rating: 4.3,
      reviewCount: 80,
      inStock: true,
      category: "gaming",
    },
    {
      id: 24,
      name: "Wireless Earbuds",
      description: "Compact true wireless earbuds with touch controls.",
      price: 79.99,
      imageUrl: "https://source.unsplash.com/featured/?earbuds",
      rating: 4.4,
      reviewCount: 250,
      inStock: true,
      category: "audio",
    },
    {
      id: 25,
      name: "Mechanical Watch",
      description: "Luxury analog watch with stainless steel case.",
      price: 349.99,
      imageUrl: "https://source.unsplash.com/featured/?watch",
      rating: 4.8,
      reviewCount: 55,
      inStock: true,
      category: "accessories",
    },
    {
      id: 26,
      name: "Action Camera 4K",
      description: "Waterproof action cam with stabilization and WiFi.",
      price: 229.99,
      imageUrl: "https://source.unsplash.com/featured/?action-camera",
      rating: 4.5,
      reviewCount: 130,
      inStock: true,
      category: "photography",
    },
    {
      id: 27,
      name: "Drone with 1080p Camera",
      description: "Compact drone with live view and auto-stabilization.",
      price: 399.99,
      imageUrl: "https://source.unsplash.com/featured/?drone",
      rating: 4.6,
      reviewCount: 145,
      inStock: true,
      category: "Drones",
    },
    {
      id: 28,
      name: "USB-C Hub 7-in-1",
      description: "Expand your laptop with HDMI, USB, SD and Ethernet ports.",
      price: 59.99,
      imageUrl: "https://source.unsplash.com/featured/?usb-hub",
      rating: 4.4,
      reviewCount: 90,
      inStock: true,
      category: "accessories",
    },
    {
      id: 29,
      name: "gaming Console Controller",
      description: "Wireless controller with dual vibration and Bluetooth.",
      price: 69.99,
      imageUrl: "https://source.unsplash.com/featured/?controller",
      rating: 4.5,
      reviewCount: 200,
      inStock: true,
      category: "gaming",
    },
    {
      id: 30,
      name: "VR Headset",
      description: "Virtual reality headset compatible with PC and mobile.",
      price: 499.99,
      imageUrl: "https://source.unsplash.com/featured/?vr-headset",
      rating: 4.7,
      reviewCount: 75,
      inStock: true,
      category: "gaming",
    },
  ]
  );

  filteredProducts = computed(() => {
    if (this.category() === 'all') return this.products();
    return this.products().filter(product => product.category.toLowerCase() === this.category().toLowerCase());
  });

  categories = computed(() => {
    const cats = this.products().map(p => p.category);
    return ['all', ...new Set(cats)];
  });

  addToCart = (product: Product) => {

  }

  test = computed(() => {
    console.log(this.category());
    return this.category();
  });
}
