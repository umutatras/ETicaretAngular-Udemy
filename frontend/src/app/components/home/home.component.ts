import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from '../categories/models/category.model';
import { CategoryService } from '../categories/services/category.service';
import { RequestModel } from 'src/app/common/models/request.model';
import { ProductService } from '../products/services/product.service';
import { ProductModel } from '../products/models/product.model';
import { BasketModel } from '../baskets/models/basket.model';
import { BasketService } from '../baskets/services/basket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
categories:CategoryModel[]=[];
productModel:ProductModel[]=[];

requestModel:RequestModel=new RequestModel();
constructor(private categoryService:CategoryService,private productserv:ProductService,private basketService:BasketService)
{

}
  ngOnInit(): void {
   this.getCategories();
   this.getAll();
  }
getAll(){
this.productserv.getAllForHomePage(this.requestModel,res=>this.productModel=res);
}
getCategories(){
  this.categoryService.getAll(res=>this.categories=res);
}

changeCategory(categoryId:string,categoryName:string)
{
  this.requestModel.categoryName=categoryName;
  this.requestModel.categoryId=categoryId;
  this.getAll();
}

addBasket(productId:string,price:number)
{
  let model=new BasketModel();
  model.productId=productId;
  model.price=price;
  model.quantity=1;
  this.basketService.add(model,res=>{
    this.getAll();
  });
}
}
