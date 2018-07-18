import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import { SearchForm, Checkbox } from '../../models/search-form.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule, HttpParams } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Location } from '@angular/common';
import { DataService} from "../../services/data.service";


@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  public showStepper:boolean = false;
  public userItems: Array<Item>;
  public account_validation_messages = {
    'name': [
      { type: 'required', message: 'Введите своё имя' },
    
      { type: 'pattern', message: 'Имя должно содержать только буквы русского алфавита' }
      
    ],
    'surname': [
      { type: 'required', message: 'Введите свою фамилию' },
    
      { type: 'pattern', message: 'Фамилия должна содержать только буквы русского алфавита' }
      
    ],
    'middlename': [
     
    
      { type: 'pattern', message: 'Отчество должно содержать только буквы русского алфавита' }
      
    ],
    'email': [
      { type: 'required', message: 'Email обязателен для обратной связи' },
      { type: 'email', message: 'Введите корректный email' }
    ],
    'phone': [
      { type: 'required', message: 'Введите свой телефон' },
    
      { type: 'pattern', message: 'Введите корректный номер телефона' }
      
    ],
    'payVariant': [
      { type: 'required', message: 'Выберите вариант оплаты' }
    
      
    ],
    'deliveryVariant': [
      { type: 'required', message: 'Выберите вариант доставки' }
    
      
    ]
  }

  public api: ApiService;

  public payVariants = [
    'Наложенный платеж',
    'Безналичный расчет',
    'Покупка без риска'
  ]
  public deliveryVariants = [
    'Нова Пошта',
    'Почтоматы Приват Банка',
    'Транспортными компаниями Деливери, Интайм (по договорённости)',
    'Доставка Укрпочтой',
    'Доставка техники для парикмахерских (бесплатно)'
  ]

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  cities: string[] = new Array();
  filteredOptions: Observable<string[]>;
  postmails: string[] = new Array();
  filteredMails: Observable<string[]>;
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  public array: [1,2,3];

  public stepperActions(steps:any) {
    this.showStepper=true;
    setTimeout(function() {
       steps.scrollIntoView({block: "end", behavior: "smooth"});
    }, 100);
  // steps.scrollIntoView({block: 'end'});

  }


  getCities(val: string){
 
 
    this.cities.splice(0);
    let params = new HttpParams().set("lang", 'ru').set("name_startsWith",decodeURIComponent(val))
      .set("type",'json').set("cities", 'cities1000').set("country",'UA').set("username",'schrbkw');
    this.api.get('http://api.geonames.org/search', params).subscribe(res => {
     
      if (res.geonames.length>0) {

      for (var i = 0; i < 30 && i<res.geonames.length; i++) {
       if(this.cities.indexOf(res.geonames[i].name)===-1) this.cities.push(res.geonames[i].name);
      }
      }
    });

  }

  
  getMails(val: string){
    //var val = this.secondFormGroup.controls.cityCtrl.value;
    var send = {
      "modelName": "AddressGeneral",
        "calledMethod": "getWarehouses",
        "methodProperties": {
          "CityName": val,
        "Language": "ru"
      },
      "apiKey": "5f581cc52c0664c472664bb3d23eb4c9",
      
    }
 
    this.postmails.splice(0);
   this.api.post('https://api.novaposhta.ua/v2.0/json/', send).subscribe(res => {

     if (res.data.length > 0) {

       for (var i = 0; i < res.data.length; i++) {
         this.postmails.push(res.data[i].DescriptionRu);

       }
     }
   });

  }

  filter(val: string): string[] {
    this.getCities(val);
    this.getMails(val);
    if (this.cities)
      return this.cities;
    else return [];
  }
  filterMails(val: string): string[] {
    
    if (this.postmails)
      if (val === '') return this.postmails;
      else return this.postmails.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
    else return [];
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['',Validators.compose([Validators.required, Validators.pattern('^[А-Яа-яЁё\s]+$')]) ],
      surname: ['', Validators.compose([Validators.required, Validators.pattern('^[А-Яа-яЁё\s]+$')])],
      middlename: ['', Validators.pattern('^[А-Яа-яЁё\s]+$')],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{5,10}')]) ]
    });
    this.secondFormGroup = this._formBuilder.group({
      payVariant: ['', Validators.required],
      deliveryVariant: ['', Validators.required],
      takeVariant: ['', Validators.required],
      street: [''],
      house: [''],
      room: [''],
      cityCtrl: [''],
      postmail: [''],
      comment: ['']
    });

    this.getCities('');
    this.filteredOptions = this.secondFormGroup.controls.cityCtrl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
    this.filteredMails = this.secondFormGroup.controls.postmail.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterMails(val))
      );
    this.userItems = this.dataService.getData();
  }

  constructor(private http: HttpClient, private location: Location, private _formBuilder: FormBuilder, private dataService: DataService) {
   
    
    this.api = new ApiService(http);
    this.filter('');
    this.getMails('');
   
  }


}
