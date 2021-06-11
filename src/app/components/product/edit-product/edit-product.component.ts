import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { finalize } from 'rxjs/operators';
import { DiseaseFacade } from 'src/app/facades/disease.facade';
import { Disease } from 'src/app/models/disease';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  symptoms: string;
  conditions: string;
  management: string;
  control: string;
  disease: Disease;
  file;
  @ViewChild('image', { static: false }) imageCont: ElementRef;
  public form = new FormGroup({
    nom: new FormControl(null, [Validators.required]),
    nomScientifique: new FormControl(null, [Validators.required]),
    langue: new FormControl(null, []),
  });
  public Editor = ClassicEditor;
  downloadURL: any;
  constructor(
    private diseaseFacade: DiseaseFacade,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private storage: AngularFireStorage
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
          this.renderer.setStyle(image, 'width', '200px');
          this.renderer.setStyle(image, 'height', '200px');
          this.renderer.appendChild(this.imageCont.nativeElement, image);
          this.uploadImage(event.target.files[index], 'image');
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
              this.disease.images.push({ path: url });
            }
          });
        })
      )
      .subscribe((snapshot) => {
        if (snapshot) {
          var progressValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }
      });
  }
  public onChange({ editor }: ChangeEvent) {
    /*  const data = editor.getData();
    this.contenu = data; */
  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.disease = this.diseaseFacade.findById(+id);
    this.symptoms = this.disease.symptoms;
    this.conditions = this.disease.conditions;
    this.management = this.disease.management;
    this.control = this.disease.control;
    console.log(this.disease);
    this.form.setValue({
      nom: this.disease.nom,
      nomScientifique: this.disease.nomScientifique,
      langue: '',
    });
  }
  get nom() {
    return this.form.get('nom');
  }
  get nomScientifique() {
    return this.form.get('nomScientifique');
  }
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
  submit() {
    this.diseaseFacade.updateDisease({
      id: this.disease.id,
      nom: this.nom.value,
      conditions: this.conditions,
      symptoms: this.symptoms,
      images: this.disease.images,
      management: this.management,
      control: this.control,
      nomScientifique: this.nomScientifique.value,
    });
  }
}
