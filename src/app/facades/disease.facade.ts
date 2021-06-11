import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Disease } from '../models/disease';
import { DiseaseService } from '../services/disease.service';
import { DiseaseState } from '../states/disease.state';

@Injectable({
  providedIn: 'root',
})
export class DiseaseFacade {
  constructor(
    private diseaseService: DiseaseService,
    private diseaseState: DiseaseState,
    private router: Router
  ) {}
  getDiseases$(): Observable<Disease[]> {
    return this.diseaseState.getDiseases$();
  }
  loadDiseases() {
    this.diseaseService.findAll().subscribe(
      (diseases) => {
        this.diseaseState.setDiseases(diseases);
        console.log(diseases);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  findById(id: number) {
    return this.diseaseState.findDiseaseById(id);
  }
  updateDisease(diseaseToUpdate: Disease) {
    this.diseaseService.update(diseaseToUpdate).subscribe(
      (updatedDisease) => {
        this.diseaseState.updateDisease(updatedDisease);
        this.router.navigate(['/product/list']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  save(disease: Disease) {
    this.diseaseState.addDisease(disease);
    this.diseaseService.save(disease).subscribe(
      (savedDisease) => {
        this.diseaseState.updateDiseaseId(disease, savedDisease);
        console.log('okay');
        this.router.navigate(['/product/list']);
        console.log('hello world');
      },
      (error) => {
        console.log(error);
        this.diseaseState.removeDisease(disease);
      }
    );
  }
}
