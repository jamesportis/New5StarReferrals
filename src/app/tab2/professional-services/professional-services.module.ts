import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionalServicesPageRoutingModule } from './professional-services-routing.module';

import { ProfessionalServicesPage } from './professional-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionalServicesPageRoutingModule
  ],
  declarations: [ProfessionalServicesPage]
})
export class ProfessionalServicesPageModule {}
