import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../core/helpers/validators/validators.helper";
import {CountryService} from "../../core/helpers/services/country.service";
import {Country} from "../../core/helpers/interface/country.interface";
import {UserDataInterface} from "../../core/helpers/interface/userData.interface";
import {StageService} from "../../core/helpers/services/stage.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/helpers/services/notifications.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  countries: Country[] = [];
  states = [];
  cities = [];
  // @ts-ignore
  myForm: FormGroup;
  hide: boolean = true;
  isChecked: boolean = false;
  isSubmitted: boolean = false;
  passwordLengthIndicator: number = 0;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private stageService: StageService,
    private router: Router,
    private notificator: NotificationsService
  ) { }

  ngOnInit(): void {

    this.countries = this.countryService.getCountries();

    this.myForm = this.fb.group({
      index: [null, [Validators.required,
        CustomValidators.OnlyNumbers] ],
      country: [null, Validators.required],
      state: [{value:null , disabled: true},  Validators.required],
      city: [{value:null , disabled: true}, Validators.required],
      street: [null, Validators.required, ],
      house: [null, Validators.required,  ],
    });

    this.myForm.get('country')?.valueChanges.subscribe((country) => {
      this.myForm.get('state')?.reset();
      this.myForm.get('state')?.disable();
      if (country) {
        this.states = this.countryService.getStatesByCountry(country);
        this.myForm.get('state')?.enable();
      }
    });

    this.myForm.get('state')?.valueChanges.subscribe((state) => {
      this.myForm.get('city')?.reset();
      this.myForm.get('city')?.disable();
      if (state) {
        this.cities = this.countryService.getCitiesByState(this.myForm.get('country')?.value, state);
        this.myForm.get('city')?.enable();
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    const payload: UserDataInterface = {
      index: this.myForm.value.index,
      country: this.myForm.value.country,
      area: this.myForm.value.street,
      city: this.myForm.value.city,
      house: this.myForm.value.house,
    };
    if (this.myForm.invalid) {
      // notification service
      this.notificator.sayError("The form is invalid. Please make sure that all fields are correct.");
      return;
    }
    this.stageService.changeStatus({stageTwo: true});
    this.stageService.changeData(payload)
    this.router.navigate(['client-form/identity']);
    this.notificator.saySuccess("Form was submitted successfully");
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
