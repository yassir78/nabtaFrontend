import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularFireStorage } from '@angular/fire/storage';
import { DiseaseFacade } from 'src/app/facades/disease.facade';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Image } from 'src/app/models/image';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  symptoms: string;
  conditions: string;
  downloadURL: string;
  progress$ = new BehaviorSubject<number>(0);
  management: string;
  imageUrl: string | ArrayBuffer =
    'https://via.placeholder.com/300x300?text=Inserer+Votre+Image';
  control: string;
  public form = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    nomScientifique: new FormControl(null, [Validators.required]),
    langue: new FormControl(null, []),
  });
  images: Image[] = [];
  public Editor = ClassicEditor;
  @ViewChild('image', { static: false }) imageCont: ElementRef;
  file: File = null;
  constructor(
    private diseaseFacade: DiseaseFacade,
    private router: Router,
    private storage: AngularFireStorage,
    private renderer: Renderer2
  ) {}

  onChangeMultiple(event) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        this.file = event.target.files[index];
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          let image = this.renderer.createElement('img');
          this.renderer.setAttribute(image, 'src', reader.result.toString());
          console.log(this.imageCont);
          this.renderer.setStyle(image, 'width', '300px');
          this.renderer.setStyle(image, 'height', '300px');
          this.renderer.appendChild(this.imageCont.nativeElement, image);
          this.uploadImage(event.target.files[index], 'image');
          //this.imageUrl = reader.result;
        };
      }

      //this.uploadImageevent();
    }
  }
  onChange(event) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        this.file = event.target.files[index];
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
          this.imageUrl = reader.result;

          this.uploadImage(this.file, 'cycleImage');
          //this.uploadImageevent(event.target.files[index]);
          //this.imageUrl = reader.result;
        };
      }

      //this.uploadImageevent();
    }
  }
  uploadImage(file: File, path: string) {
    const n = Date.now();
    const filePath = `disease/${path}/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            if (url && path === 'cycleImage') {
              this.downloadURL = url;
            } else {
              this.images.push({ path: url });
            }
          });
        })
      )
      .subscribe((snapshot) => {
        if (snapshot) {
          var progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress$.next(progressValue);
        }
      });
  }
  ngOnInit() {}
  public onChangeSymptoms({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.symptoms = data;
  }
  public onChangeConditions({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.conditions = data;
  }
  public onChangeManagement({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.management = data;
  }
  public onChangeControl({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.control = data;
  }
  get nom() {
    return this.form.get('nom');
  }
  get nomScientifique() {
    return this.form.get('nomScientifique');
  }
  submit() {
    console.log({
      nom: this.nom.value,
      conditions: this.conditions,
      symptoms: this.symptoms,
      cycleImage: this.downloadURL,
      management: this.management,
      nomScientifique: this.nomScientifique.value,
      images: this.images,
    });
    this.diseaseFacade.save({
      nom: this.nom.value,
      conditions: this.conditions,
      symptoms: this.symptoms,
      cycleImage: this.downloadURL,
      management: this.management,
      nomScientifique: this.nomScientifique.value,
      langue: 'fr',
      images: this.images,
    });
  }
}
