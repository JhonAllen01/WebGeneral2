import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

const lista = [MatCardModule, BrowserAnimationsModule, BrowserModule];

@NgModule({
  exports: [...lista],
  imports: [...lista],
})
export class MaterialModule {}
