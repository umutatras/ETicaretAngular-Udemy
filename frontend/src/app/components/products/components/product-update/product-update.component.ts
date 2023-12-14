import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { CategoryModel } from 'src/app/components/categories/models/category.model';
import { CategoryService } from 'src/app/components/categories/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  categories:CategoryModel[]=[];
  productId:string="";
  images:File[]=[];
  imageUrls:any[]=[];
  productModel:ProductModel=new ProductModel();
  constructor(private categoryService:CategoryService,private toas:ToastrService,private productService:ProductService,private route:Router,private actived:ActivatedRoute)
  {
    this.actived.params.subscribe(res=>{
      this.productId=res["value"];
      this.getById();
    })
  }
  ngOnInit(): void {
    this.getCategories();
   }

   getById(){
    let model={_id:this.productId};
    this.productService.getById(model,res=>this.productModel=res);
   }

  getCategories(){
    this.categoryService.getAll(res=>this.categories=res);
  }

  getImages(event:any)
  {
    const file:File[]=Array.from(event.target.files);
    this.images.push(...file);

    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];
      const reader=new FileReader();
      reader.readAsDataURL(element);
      reader.onload=()=>{
        const imageUrl=reader.result as string;
        this.addImage(imageUrl,file);
      }

    }


  }
  addImage(imageUrl:string,file:any)
  {
    this.imageUrls.push({
      imageUrl:imageUrl,name:file.name,size:file.size
    })
  }

  update(form:NgForm)
  {
    if(form.value["categoriesSelect"].length==0)
    {
      this.toas.error("Kategori seçimi yapmadınız");
    }
    if(form.valid)
    {
      let product=form.value;
      let categories:string[]=product["categoriesSelect"];
      let price=product["price"];
      price=price.toString().replace(",",".");
      let formData=new FormData();
      formData.append("_id",this.productModel._id);
      formData.append("name",this.productModel.name);
      formData.append("price",price);
      formData.append("stock",product["stock"]);
      for(const category of categories)
      {
        formData.append("categories",category);
      }
      if(this.images!=undefined)
      {
        for(const image of this.images)
        {
          formData.append("images",image,image.name);
        }
      }
      this.productService.update(formData,res=>{
        this.toas.info(res.message);
        this.route.navigateByUrl("/products");
      })
    }

  }

 deleteImage(_id:string,index:number)
  {
    let model={
      _id:_id,
      index:index
    }
   this.productService.removeByIdImage(model,res=>{
    this.toas.warning(res.message);
    this.getById();
   })
  }


}
