import { Component } from "@angular/core";
import { AppAuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html"
})

export class AppNavComponent {

    isAuthorized : boolean;
    constructor(private readonly appAuthService: AppAuthService) {
        this.isAuthorized = (appAuthService.role() ?? 1) == '2'
     }
    
    signout() {
        this.appAuthService.signout();
    }
}
