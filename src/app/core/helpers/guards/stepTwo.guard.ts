import {Injectable} from '@angular/core';
import {Router, CanLoad, CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {StageService} from "../services/stage.service";

@Injectable({
  providedIn: 'root'
})
export class StepTwoGuard implements CanActivate {

  constructor(
    private router: Router,
    private stageService: StageService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.stageService.$stageStatus.pipe(map( stage=> {
      if(stage.stageTwo && stage.stageOne){
        return true;
      } else{
        this.router.navigate(['']);
        return false;
      }
    }))
  }


}
