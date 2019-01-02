import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {DataService} from "../../services/data.service";
import {Item, BuyItem} from "../../models/item.model";
import { ItemsService } from '../../services/items.service';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';



@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent{

  public data:number;
  private subscribeItems: Subscription;
  public searchString: string;
  constructor(private dataService: DataService, private http: HttpClient, private itemsService: ItemsService) {
     this.data = this.dataService.itemCount;
    this.subscribeItems = this.dataService.getCount().subscribe(next => {this.data = next;});
    
  }
  ngOnInit() {
    this.http.get("/files/cathegories.json").subscribe((data:any) => {
      this.smallerNav = data.cathegories;
    });
 
  }
  fillerNav = [{
    id: 1, name:
      'Главная'
  },
  {
    id: 2, name:
      'О нас'
  },
  { id: 3, name: 'Статьи' },
  { id: 4, name: 'Доставка и оплата' },
  { id: 5, name: 'Акции' }

  ];

  public smallerNav = [];
  public currentId: number;
    public mainEl: boolean = false;
    public aboutEl: boolean = false;
    public payEl: boolean = false;
    public actionsEl: boolean = false;
    public postsEl: boolean = false;
    public hold: boolean = false;

    public show(el: string) {
      if (el === "main") {
        this.mainEl = true;
        this.currentId = 1;
      }
      if (el === "about") {
        this.aboutEl = true;
        this.currentId = 2;
      }
      if (el === "pay") {
        this.payEl = true;
        this.currentId = 4;
      }
      if (el === "actions") {
        this.actionsEl = true;
        this.currentId = 5;
      }
      if (el === "posts") {
        this.postsEl = true;
        this.currentId = 3;
      }
    }
    public hide(el: string) {
        var those = this;
        setTimeout(function (){
            if (el === "main") if(!those.hold) those.mainEl = false;
            if (el === "about") if (!those.hold) those.aboutEl = false;
            if (el === "pay") if (!those.hold) those.payEl = false;
            if (el === "actions") if (!those.hold) those.actionsEl = false;
            if (el === "posts") if (!those.hold) those.postsEl = false;
    }, 200);
    }
    public searchItems() {
      this.itemsService.search(this.searchString);

    }

}
