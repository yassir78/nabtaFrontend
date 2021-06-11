import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DiseaseFacade } from 'src/app/facades/disease.facade';
import { Disease } from 'src/app/models/disease';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit {
  diseases$: Observable<Disease[]>;
  constructor(private diseaseFacade: DiseaseFacade, private router: Router) {}

  ngOnInit() {
    this.diseases$ = this.diseaseFacade.getDiseases$();
    this.diseaseFacade.loadDiseases();
  }
  edit(disease: Disease) {
    this.router.navigate(['/product/edit', disease.id]);
  }
}
