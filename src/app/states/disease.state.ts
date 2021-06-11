import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root',
})
export class DiseaseState {
  private diseases$ = new BehaviorSubject<Disease[]>(null);
  getDiseases$(): Observable<Disease[]> {
    return this.diseases$.asObservable();
  }
  setDiseases(diseases: Disease[]) {
    this.diseases$.next(diseases);
  }
  addDisease(disease: Disease) {
    if (this.diseases$.getValue() == null) {
      this.diseases$.next(new Array(disease));
    } else {
      const currentValue = this.diseases$.getValue();
      this.diseases$.next([...currentValue, disease]);
    }
  }
  updateDiseaseId(diseaseToReplace: Disease, addedDiseaseWithId: Disease) {
    const diseases = this.diseases$.getValue();
    const updatedProductIndex = diseases.findIndex(
      (disease) => disease === diseaseToReplace
    );
    diseases[updatedProductIndex] = addedDiseaseWithId;
    this.diseases$.next([...diseases]);
  }
  removeDisease(diseaseToRemove: Disease) {
    const currentValue = this.diseases$.getValue();
    this.diseases$.next(
      currentValue.filter((disease) => disease !== diseaseToRemove)
    );
  }
  findDiseaseById(id: number) {
    const diseases = this.diseases$.getValue();
    const indexOfUpdated = diseases.findIndex((diseases) => diseases.id === id);
    return diseases[indexOfUpdated];
  }
  updateDisease(updatedDisease: Disease) {
    const diseases = this.diseases$.getValue();
    const indexOfUpdated = diseases.findIndex(
      (disease) => disease.id === updatedDisease.id
    );
    diseases[indexOfUpdated] = updatedDisease;
    this.diseases$.next([...diseases]);
  }
}
