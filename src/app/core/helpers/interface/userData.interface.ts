import {NgIterable} from "@angular/core";

export interface UserDataInterface {
  lastName?: string;
  name?: string;
  middleName?: string;
  email?: string;
  dateBirth?: string;
  password?: string;
  phoneNumber?: number;
  gender?: string;
  clientGroup?: NgIterable<any>;
  coordinator?: string;
  index?: string;
  country?: string;
  area?: string;
  city?: string;
  house?: string;
  docImg?: string;
}
