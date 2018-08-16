import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClickOutsideModule } from 'ng-click-outside';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { SlickModule } from 'ngx-slick';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';



//services
import { ApiService } from './services/api.service';

//components
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ItemsComponent } from './components/items/items.component';
import { FooterComponent } from './components/footer/footer.component';

//models
import { Item } from './models/item.model';

import { PageViewModel } from './models/page-view.model';

//pages
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { SalesComponent } from './pages/sales/sales.component';
import { MainComponent } from './pages/main/main.component';
import { SearchComponent } from './pages/search/search.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ShopComponent } from './pages/shop/shop.component';
import {DataService} from "./services/data.service";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ItemsComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    DeliveryComponent,
    SalesComponent,
    MainComponent,
    SearchComponent,
    AdminComponent,
    ShopComponent
  ],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    HttpClientModule,
    MatTooltipModule,
    ClickOutsideModule,
    MatFormFieldModule,
    MatTabsModule,
    HttpModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSidenavModule,
    SlickModule.forRoot(),
    MatRadioModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatListModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/main', pathMatch: 'full' },

      { path: 'main', component: MainComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'search/:cathegory', component: SearchComponent },
      { path: 'admin/:cathegory', component: AdminComponent },
       { path: 'admin', component: AdminComponent },
        { path: 'shop', component: ShopComponent }
    ])
   
  ],
  providers: [DataService]
})
export class AppModuleShared {
}
