
import { CommonModule } from "@angular/common"; 
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreenComponent } from './screen/toolbar/screen.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatToolbarModule } from "@angular/material/toolbar"; 
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ScreenContentComponent } from './screen/screen-content/comparaison/comparaison.component';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideHttpClient , withFetch } from "@angular/common/http";
import { FusionComponent } from "./screen/screen-content/fusion/fusion.component";
// import { XmlComponent } from "./screen/screen-content/comparaison/xml.service-content";
import { HttpClientModule } from '@angular/common/http';
import { NgxTextDiffModule } from 'ngx-text-diff';








@NgModule({
  declarations: [
    AppComponent,
    ScreenComponent,
    ScreenContentComponent,
    FusionComponent,
    // XmlComponent

  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule, 
    MatToolbarModule, 
    MatIconModule, 
    BrowserModule,
    MatMenuModule, 
    MatButtonModule, 
    FormsModule, 
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    HttpClientModule,
    NgxTextDiffModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    // NgxTextDiffModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
