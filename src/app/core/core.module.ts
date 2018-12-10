import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { CategoryService } from '../pages/categories/shared/category.service';
import { EntryService } from '../pages/entries/shared/entry.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
  ],
  exports:[
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers:[
    CategoryService,
    EntryService
  ]
})
export class CoreModule { }
