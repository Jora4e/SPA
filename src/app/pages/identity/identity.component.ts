import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationsService} from "../../core/helpers/services/notifications.service";
import {StageService} from "../../core/helpers/services/stage.service";
import {CustomValidators} from "../../core/helpers/validators/validators.helper";

import {FileValidator} from 'ngx-material-file-input';
import {UserDataInterface} from "../../core/helpers/interface/userData.interface";

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {
  documentTypes = [
    {name: 'Passport'},
    {name: 'Birth Certificate'},
    {name: 'Driving license'}
  ];
  // @ts-ignore
  myForm: FormGroup;
  hide: boolean = true;
  isChecked: boolean = false;
  isSubmitted: boolean = false;
  passwordLengthIndicator: number = 0;
  imgSrc: string | undefined;
  readonly maxSize = 104857600;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificator: NotificationsService,
    private stageService: StageService,
  ) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      series: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      issued: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      docNumber: [null, [Validators.required,
        CustomValidators.OnlyNumbers,
        Validators.minLength(6),]],
      date: [null, Validators.required],
      document: [null, Validators.required],
      file: [undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)
        ]],
    })
    ;
  }

  onSubmit() {
    if (this.myForm.invalid) {
      // notification service
      this.notificator.sayError("The form is invalid. Please make sure that all fields are correct.");
      return;
    }
    this.isSubmitted = true;
    const payload: UserDataInterface = {
      docImg: this.imgSrc
    };
    this.stageService.changeStatus({stageThree: true});
    this.stageService.changeData(payload)
    this.router.navigate(['created-client']);
    this.notificator.saySuccess("Form was submitted successfully");
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

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgSrc = reader.result as string;
      };
    }
  }
}
