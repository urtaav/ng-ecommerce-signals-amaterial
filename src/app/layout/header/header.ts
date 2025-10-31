import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';

@Component({
  selector: 'app-header',
  imports: [MatToolbar,HeaderActions],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200px] mx-auto w-full flex justify-between items-center px-4">
       <span class="text-xl font-semibold">Modern Store</span>
        <app-header-actions/>
      </div>
 
    </mat-toolbar>

  `,
  styles: ``,
})
export class Header {

}
