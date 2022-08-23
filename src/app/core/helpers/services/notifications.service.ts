import { NotifierService } from "angular-notifier";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  constructor(private notifier: NotifierService) {}

  saySuccess(successMessage: string): void {
    this.notifier.notify("success", successMessage);
  }

  sayError(error: string): void {
    this.notifier.notify("error", error);
  }
}
