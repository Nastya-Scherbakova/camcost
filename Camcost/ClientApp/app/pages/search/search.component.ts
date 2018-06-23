import { Component, Input, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import {  SearchForm, Checkbox } from '../../models/search-form.model';
import { ActivatedRoute } from "@angular/router";
import { Firm } from '../../models/firm.model';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ItemsComponent } from '../../components/items/items.component';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public firms: Array<Firm>;
  public cathegory: string;
  public parametres: Array<string> = new Array<string>();
   api: ApiService;

  @ViewChild(ItemsComponent)
  private itemsComponent: ItemsComponent;

  public search: SearchForm = new SearchForm(
    [
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


      ]
    );

      

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(params => {
      if (params['cathegory'] === 'parfumes') {
        this.search.parfume = true;
        this.search.cosmetics = false;
        this.search.hair = false;
        this.search.bodycare = false;
        this.search.wash = false;
      }
      if (params['cathegory'] === 'cosmetics') {
        this.search.parfume = false;
        this.search.cosmetics = true;
        this.search.hair = false;
        this.search.bodycare = false;
        this.search.wash = false;      }
      if (params['cathegory'] === 'hair') {
        this.search.parfume = false;
        this.search.cosmetics = false;
        this.search.hair = true;
        this.search.bodycare = false;
        this.search.wash = false;      }
      if (params['cathegory'] === 'bodycare') {
        this.search.parfume = false;
        this.search.cosmetics = false;
        this.search.hair = false;
        this.search.bodycare = true;
        this.search.wash = false;      }
      if (params['cathegory'] === 'wash') {
        this.search.parfume = false;
        this.search.cosmetics = false;
        this.search.hair = false;
        this.search.bodycare = false;
        this.search.wash = true;      }
       this.changeParams();
    }
    );
    
    this.api = new ApiService(http);
  }
  public changeParams() {
    this.parametres.splice(0);
    if (this.search.parfume) this.parametres[1] = 'Парфюмерия';
     if (this.search.cosmetics) this.parametres[1] = 'Косметика';
     if (this.search.hair) this.parametres[1] = 'Профессиональная техника для парикмахерских';
     if (this.search.bodycare) this.parametres[1] = 'Уход за телом';
     if (this.search.wash) this.parametres[1] = 'Средства для стирки';
    if(this.search.men) this.parametres[0] = '1';
     if(this.search.women) this.parametres[0] = '2';
     if((this.search.men && this.search.women) || (!this.search.men && !this.search.women)) this.parametres[0] = '3';
     this.search.checkboxes.forEach(el => {
       if (el.checked) this.parametres.push(el.title);
       console.log(el.title + " "+el.checked);
     }
      )
    console.log(this.parametres);
    var those=this;
   if(this.itemsComponent) this.itemsComponent.filter();
    
   else setTimeout(function () {those.itemsComponent.filter()}, 10);
  }
  public GetFirms() {
    this.api.get('api/Firms').subscribe(res => {
      this.firms=res;
    })
  }


}