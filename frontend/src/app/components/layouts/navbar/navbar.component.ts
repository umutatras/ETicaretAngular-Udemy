import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { BasketService } from '../../baskets/services/basket.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public basketService:BasketService)
  {
      this.basketService.getCount();
  }

}
