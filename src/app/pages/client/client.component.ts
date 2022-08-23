import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../core/helpers/validators/validators.helper";
import {NotificationsService} from "../../core/helpers/services/notifications.service";
import {StageService} from "../../core/helpers/services/stage.service";
import {Router} from "@angular/router";
import {UserDataInterface} from "../../core/helpers/interface/userData.interface";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  gender = [
    {gender: 'Male'},
    {gender: 'Female'},
    {gender: 'Unknown'}
  ];
  coordinator = [
    {coordinator: 'Jhones'},
    {coordinator: 'Colinwood'},
    {coordinator: 'Jamson'}
  ];
  clientArr = [
    {name: 'VIP Clients'},
    {name: 'Loyal Clients'},
    {name: 'New Clients'}
  ];
  // @ts-ignore
  myForm: FormGroup;
  hide: boolean = true;
  isChecked: boolean = false;
  isSubmitted: boolean = false;
  passwordLengthIndicator: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificator: NotificationsService,
    private stageService: StageService,
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      middleName: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, CustomValidators.Email]],
      phone: [null, [Validators.required,
        CustomValidators.OnlyNumbers,
        Validators.minLength(11),
        Validators.maxLength(11)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      date: [null, Validators.required],
      gender: [null, Validators.required],
      client: [null, Validators.required],
      coordinator: [null, Validators.required],
      termsCheckbox: [this.isChecked, Validators.required],
    });

  }
  get f() {
    return this.myForm.controls;
  }

  onSubmit() {

    this.isSubmitted = true;
    const payload: UserDataInterface = {
      name: this.myForm.value.name,
      lastName: this.myForm.value.lastName,
      middleName: this.myForm.value.middleName,
      email: this.myForm.value.email,
      phoneNumber: this.myForm.value.phone,
      password: this.myForm.value.password,
      dateBirth: formatDate(this.myForm.value.date , 'MM-dd-YYYY', 'en'),
      gender: this.myForm.value.gender,
      clientGroup: this.myForm.value.client,
      coordinator: this.myForm.value.coordinator,
    };

    if (this.myForm.invalid) {
      this.notificator.sayError("The form is invalid. Please make sure that all fields are correct.");
      return;
    }
    this.stageService.changeStatus({stageOne: true});
    this.stageService.changeData(payload)
    this.router.navigate(['client-form/address']);
    this.notificator.saySuccess("Form was submitted successfully");
  }

  Strengths() {
    const password = this.myForm.value.password;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = /[$-/:-?{-~!"^_@`\[\]]/g.test(password);
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    flags.map(item => {
      passedMatches += item ? 1 : 0;
    });
    this.passwordLengthIndicator = passedMatches * (password && password.length < 8 ? 15 : 25);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
