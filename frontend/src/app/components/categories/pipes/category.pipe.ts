import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  transform(value: CategoryModel[], search:string): CategoryModel[] {
    if(search=="")
    {
      return value;
    }
    return value.filter(P=>P.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }

}
