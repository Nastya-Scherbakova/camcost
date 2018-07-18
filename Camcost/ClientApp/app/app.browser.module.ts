import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
      HttpModule,
        BrowserModule,
      AppModuleShared

        
        
    ],
    providers: [HttpClientModule, 
        { provide: 'BASE_URL', useFactory: getBaseUrl },
      DataService
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
