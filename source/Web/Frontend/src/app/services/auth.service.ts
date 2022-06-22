import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AppAuthService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router) { }

    authenticated = () => !!this.token();

    login(data: any): void {
        this.http
            .post("auths", data)
            .subscribe((result: any) => {
                if (!result || !result.token) { return; }
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", result.email);
                localStorage.setItem("userId", result.user?.id);
                localStorage.setItem("role", result.role);
                localStorage.setItem("avatarGuid", result.user?.avatarGuid);

                this.router.navigate(["/main/home"]);
            });
    }

    signin = () => this.router.navigate(["/login"]);

    signout() {
        localStorage.clear();
        this.signin();
    }

    token = () => localStorage.getItem("token");

    user = () => localStorage.getItem("user");

    avatarGuid = () => localStorage.getItem("avatarGuid");
    
    userId = () => localStorage.getItem("userId");

    role = () => localStorage.getItem("role");

    updateAvatarGuid(id : string){
        localStorage.setItem("avatarGuid", id);
    }
}
