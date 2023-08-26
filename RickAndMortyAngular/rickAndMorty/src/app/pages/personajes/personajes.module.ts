import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonajesRoutingModule } from './personajes-routing.module';
import { PersonajesComponent } from './personajes.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [PersonajesComponent],
  imports: [CommonModule, MaterialModule, PersonajesRoutingModule],
})
export class PersonajesModule {}
