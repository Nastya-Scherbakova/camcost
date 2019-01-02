import { Component, Input, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import { SearchForm, Checkbox } from '../../models/search-form.model';
import { ActivatedRoute } from "@angular/router";
import { Firm } from '../../models/firm.model';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { ItemsComponent } from '../../components/items/items.component';
import { ItemsService } from '../../services/items.service';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  public firms: Array<Firm>;
  public cathegory: string;
  public parametres: Array<string> = this.itemsService.parametres;
  api: ApiService;
  public cathegories = [];

  @ViewChild(ItemsComponent)
  private itemsComponent: ItemsComponent;

  public search: SearchForm = new SearchForm([]);

  constructor(private route: ActivatedRoute, private http: HttpClient, private itemsService: ItemsService) {
    this.route.params.subscribe(params => {
      this.cathegory = params['cathegory'];
      this.http.get("/files/subCathegories.json").subscribe((data: any) => {
        this.search = new SearchForm(data.subCathegories);
        this.changeParams();
      });

    }
    );
    this.http.get("/files/cathegories.json").subscribe((data: any) => {
      this.cathegories = data.cathegories;
    });

    this.api = new ApiService(http);
  }
  public changeParams() {
    this.parametres.splice(0);
    this.parametres.splice(0);
    this.cathegories.forEach((el: any) => {
      if (el.link == '/search/' + this.cathegory) this.parametres[1] = el.name;
    })

    if (this.search.men) this.parametres[0] = '1';
    if (this.search.women) this.parametres[0] = '2';
    if ((this.search.men && this.search.women) || (!this.search.men && !this.search.women)) this.parametres[0] = '3';
    this.search.checkboxes.forEach(el => {
      if (el.checked) this.parametres.push(el.title);

    })


    this.itemsService.filter();


  }
  public GetFirms() {
    this.api.get('api/Firms').subscribe(res => {
      this.firms = res;
    })
  }


}