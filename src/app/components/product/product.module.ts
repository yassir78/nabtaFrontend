import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { environment } from 'src/environments/environment';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
@NgModule({
  declarations: [
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    AngularFireStorageModule,
    CKEditorModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
})
export class ProductModuleModule {}
