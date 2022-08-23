import { ValidationErrors } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static OnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^[0-9]+$");

      if (!regex.test(control.value)) {
        return { onlyNumbers: true };
      }
    }
    return null;
  }

  static PhoneNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^5[0-9].*$");

      if (!regex.test(control.value)) {
        return { PhoneNumber: true };
      }
    }

    return null;
  }

  static Email(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

      if (!regex.test(control.value)) {
        return { email: true };
      }
    }

    return null;
  }
}
