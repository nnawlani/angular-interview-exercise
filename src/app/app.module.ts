import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import FormsModule to ensure ngModel directive can be recognized and processed
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherInformationService } from './weather-information.service';

// Registering new Weather Information Service in the providers array
@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule, FormsModule], providers: [provideHttpClient(withInterceptorsFromDi()), WeatherInformationService]
})
export class AppModule { }
