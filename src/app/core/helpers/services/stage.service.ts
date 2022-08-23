import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StageInterface} from "../interface/stage.interface";
import {UserDataInterface} from "../interface/userData.interface";

@Injectable({
  providedIn: "root",
})
export class StageService {

  stageObj:StageInterface = {
    stageOne: false,
    stageTwo: false,
    stageThree: false
  }

  stageDataObj:UserDataInterface = {
    lastName: undefined,
    name: undefined,
    middleName: undefined,
    dateBirth: undefined,
    phoneNumber: undefined,
    gender: undefined,
    clientGroup: undefined,
    coordinator: undefined,
    index: undefined,
    country: undefined,
    area: undefined,
    city: undefined,
    house: undefined,
    docImg: undefined,
  }
  stageDataArr:UserDataInterface[]= []
  private _stageData = new BehaviorSubject<any>(null);
  private _stageStatus = new BehaviorSubject<any>(this.stageObj);
  public $stageStatus = this._stageStatus.asObservable();
  public $stageData = this._stageData.asObservable();

  constructor() {
  }

  changeStatus(option: any){
    this.stageObj = {...this.stageObj, ...option};
    this._stageStatus.next(this.stageObj);
  }
  changeData(option: any){
    this.stageDataObj = {...this.stageDataObj,...option};
    this.stageDataArr = [this.stageDataObj]
    this._stageData.next(this.stageDataArr);
  }
}
