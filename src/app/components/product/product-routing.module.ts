import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListProductComponent,
        data: {
          title: 'liste des produits',
        },
      },
      {
        path: 'add',
        component: AddProductComponent,
        data: {
          title: 'Ajout des produits',
        },
      },
      {
        path: 'edit/:id',
        component: EditProductComponent,
        data: {
          title: 'Ajout des produits',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
