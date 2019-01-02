import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import { SearchForm, Checkbox } from '../../models/search-form.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Location } from '@angular/common';
import { Order } from '../../models/order.model';

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
  public subcathegories: Array<string>;
  public todo: number;
  public href: string;
  public img: File;
  public orders: Array<Order>;
  public gender = {
    male: false,
    female: false

  }

  myControl: FormControl = new FormControl();
  myControl2: FormControl = new FormControl();
  subCathegoriesList: SearchForm;
  cathegories:any = [];
  public activeLink: string = this.cathegories[0];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
    this.getOrders();
  }

  filter(val: any) {
    if (val != "") {
      return this.cathegories.filter((option:any) =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
    }
    else return this.cathegories;
    
  }

  constructor(private http: HttpClient, private location: Location) {
    // this.todo= new Object() as ToDo;
     this.http.get("/files/subCathegories.json").subscribe((data:any) => {
      this.subCathegoriesList = new SearchForm(data.subCathegories);
      
       
    });
       
  
    this.http.get("/files/cathegories.json").subscribe((data:any) => {
      this.cathegories = data.cathegories;
       if (window.location.href.endsWith('parfumes')) { this.changeToDo(2); this.activeLink = this.cathegories[0].name; }
    });
    this.todo = 1;

    this.href = window.location.href;
    this.api = new ApiService(http);
    
  }

  changeToDo(number: number) {
    switch (number) {
      case 1: {
      this.todo = 1
        break;
      }
      case 2: {
      this.todo = 2;

        this.activeLink = this.cathegories[0].name;
        break;
      }
      case 3: {
      this.todo = 3;
        break;
      }

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
    this.subcathegories = this.myControl2.value;
    let input = new FormData();
    input.append("file", this.file);
    input.append("subcathegories", JSON.stringify(this.subcathegories));
    input.append("cathegory", this.cathegory);
    if (this.gender.female && !this.gender.male) {
      input.append("gender", "2");
    }
    if (this.gender.male && !this.gender.female) {
      input.append("gender", "1");
    }
    else input.append("gender", "0");
    // this.getBase64Image(this.img);
    //input.append("image", this.img);
    this.api.post('/api/Upload', input).subscribe();
  }
  relocateWindow(param: string): string {
    let link :string = "";
    this.cathegories.forEach((el:any) => {
      if (el.name == param) {
         link = el.link.slice(7);
        
      }
    });
    return link;
  }

  getOrders() {
    this.api.get('api/Orders').subscribe(data => {
      this.orders = data;
      console.log(data);
    });

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