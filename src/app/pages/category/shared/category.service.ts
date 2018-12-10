import { Injectable } from '@angular/core';
import { Category } from '../../categories/shared/category.model';

@Injectable()
export class CategoryService {

  private apiPath: string = "api/categories"

  constructor(private http: HttpClient) { }


}
