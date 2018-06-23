import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import {  SearchForm, Checkbox } from '../../models/search-form.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule} from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Location} from '@angular/common';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public api: ApiService;
  public file: File;
  public firm: string;
  public cathegory: string;
  public todo: number;
  public href: string;
    public img:File;

    myControl: FormControl = new FormControl();
  myControl2: FormControl = new FormControl();
   toppingList = [
       new Checkbox('Оригинал', false, 'Парфюмерия'),
      new Checkbox('Тестер (ОАЭ)', false, 'Парфюмерия'),
      new Checkbox('25 мл', false, 'Тестер (ОАЭ)'),
      new Checkbox('40 мл', false, 'Тестер (ОАЭ)'),
      new Checkbox('50 мл', false, 'Тестер (ОАЭ)'),
      new Checkbox('В чехлах', false, 'Тестер (ОАЭ)'),
      new Checkbox('На блистере', false, 'Тестер (ОАЭ)'),
      new Checkbox('С феромонами', false, 'Тестер (ОАЭ)'),
      new Checkbox('Наборы 3в1', false, 'Тестер (ОАЭ)'),
      new Checkbox('Мини-парфюмерия', false, 'Тестер (ОАЭ)'),
      new Checkbox('Парфюмерные масла', false, 'Тестер (ОАЭ)'),

      new Checkbox('Пилки для ногтей', false, 'Уход за телом'),
      new Checkbox('Крем', false, 'Уход за телом'),
      new Checkbox('Бальзам', false, 'Уход за телом'),
      new Checkbox('Гель', false, 'Уход за телом'),
      new Checkbox('Жидкое мыло', false, 'Уход за телом'),
      new Checkbox('Лосьон', false, 'Уход за телом)'),
      new Checkbox('Наборы 4в1', false, 'Уход за телом')
    ];
  options = [
    'Парфюмерия',
    'Косметика',
    'Средства для стирки',
     'Уход за телом',
    'Профессиональная техника для парикмахерских',

  ];
    public activeLink:string = this.options[0];
  filteredOptions: Observable<string[]>;

    ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
    startWith(''),
    map(val => this.filter(val))
    );
    }

    filter(val: string): string[] {
    return this.options.filter(option =>
    option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }

    constructor(private http: HttpClient, private location:Location) {
     // this.todo= new Object() as ToDo;
      this.todo=1;
   
      this.href=window.location.href;
    this.api = new ApiService(http);
    if (window.location.href.endsWith('parfumes')) {this.changeToDo(2); this.activeLink=this.options[0];}
    }

    changeToDo(number: number) {
      switch (number) {
        case 1: {  this.todo=1
       break;}
                  case 2: {  this.todo=2;
      
              this.activeLink=this.options[0];
          break;
   }
                  case 3: {  this.todo=3;
      break;}

      }
    }

    handleFileInput(files: FileList) {
    let fileItem = files.item(0);
    // console.log("file input has changed. The file is", fileItem)
    this.file = fileItem;
    }
    handleImageInput(files: FileList) {
    let fileItem = files.item(0);
    // console.log("file input has changed. The file is", fileItem)
    this.img = fileItem;
    }
    sendTable() {
    let input = new FormData();
    input.append("file", this.file);
    input.append("firm", this.firm);
    input.append("cathegory", this.cathegory);
    // this.getBase64Image(this.img);
    //input.append("image", this.img);
    this.api.post('/api/Upload', input).subscribe();
    }
    relocateWindow(param: string) : string {
      switch (param) {
        case 'Парфюмерия': { return '/parfumes'; }
          case 'Косметика': {return '/cosmetics';;}
          case 
    'Средства для стирки': {return '/wash'; }
          case 
     'Уход за телом': {return '/bodycare'; }
          case 
    'Профессиональная техника для парикмахерских': {return '/hair';}
      }
      return '';
    }

    //  getBase64Image(img: any) {
    //    // Create an empty canvas element
    //    var canvas = document.createElement("canvas");
    //    canvas.width = img.width;
    //    canvas.height = img.height;

    //    // Copy the image contents to the canvas
    //    var ctx = canvas.getContext("2d");

    //    if(ctx) ctx.drawImage(img, 0, 0);

    //    // Get the data-URL formatted image
    //    // Firefox supports PNG and JPEG. You could check img.src to
    //    // guess the original format, but be aware the using "image/jpg"
    //    // will re-encode the image.
    //    var dataURL = canvas.toDataURL("image/png");

    //    this.image = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    //}

    }

interface ToDo {
  orders: boolean;
  items: boolean;
  upload: boolean;
}