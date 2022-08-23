import { Component, OnInit } from '@angular/core';
import {StageService} from "../../core/helpers/services/stage.service";
import {take} from "rxjs";
import {UserDataInterface} from "../../core/helpers/interface/userData.interface";

@Component({
  selector: 'app-created-client',
  templateUrl: './created-client.component.html',
  styleUrls: ['./created-client.component.scss']
})
export class CreatedClientComponent implements OnInit {
  userData: UserDataInterface[] | undefined;

  constructor(private stageService: StageService) { }

  ngOnInit(): void {
    this.stageService.$stageData.pipe(take(1)).subscribe((data)=> {
      if(data){
        this.userData = data;
      }
    })

  }

}
