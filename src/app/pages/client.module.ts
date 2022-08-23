import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {IdentityComponent} from "./identity/identity.component";
import {ClientRoutingModule} from "./client-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatSelectCountryModule} from "@angular-material-extensions/select-country";
import {HttpClientModule} from "@angular/common/http";
import { CreatedClientComponent } from './created-client/created-client.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MaterialFileInputModule} from "ngx-material-file-input";


@NgModule({
  declarations: [ClientComponent,
    AddressComponent,
    IdentityComponent,
    CreatedClientComponent,

  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatSelectCountryModule,
    MatSlideToggleModule,
    MaterialFileInputModule
  ]
})
export class ClientModule {
}
