import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item, BuyItem } from '../../models/item.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'details-component',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  id: number;
  item: BuyItem = new BuyItem();
  api: ApiService;

  ngOnInit(){
        this.route.params.subscribe(params => {
      this.id = params['id'];
      this.api.get('api/Items/' + this.id).subscribe(el => {
        this.item.item = el;
        this.item.itemId = el.id;
        this.item.count = 1;
        console.log(this.item);
      })
       
    }
    );
  
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.api = new ApiService(http);
    window.scroll(0, 0);


  }

}
