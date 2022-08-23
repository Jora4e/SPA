import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {IdentityComponent} from "./identity/identity.component";
import {StepOneGuard} from "../core/helpers/guards/stepOne.guard";
import {CreatedClientComponent} from "./created-client/created-client.component";
import {StepTwoGuard} from "../core/helpers/guards/stepTwo.guard";
import {StepThreeGuard} from "../core/helpers/guards/stepThree.guard";

const routes: Routes = [

  {
    path: 'client-form/client',
    component: ClientComponent,
  },
  {
    path: 'client-form/address',
    canActivate: [StepOneGuard],
    component: AddressComponent,
  },
  {
    path: 'client-form/identity',
    canActivate: [StepTwoGuard],
    component: IdentityComponent,
  },
  {
    path: 'created-client',
    canActivate: [StepThreeGuard],
    component: CreatedClientComponent,
  },
  {
    path: '',
    redirectTo:'/client-form/client',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
