import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AppUserService } from "../../../services/user.service";
import { AppModalService } from "../../../services/modal.service";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";



@Component({
    selector: "app-adduser",
    templateUrl: "./adduser.component.html"
})
export class AddUserComponent {
    form = this.formBuilder.group({
        email: ["", Validators.required],
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
    });
    signinform = this.formBuilder.group({
            password: ["", Validators.required]
    });


    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly appUserService: AppUserService,
        private readonly appModalService: AppModalService,
        private readonly router: Router) {
    }

    adduser() {
        var login = this.form.get("email")?.value;
        var password = this.signinform.get("password")?.value;
        var userModel = {
            auth: {
                login,
                password,
                'roles' : 1
            },
            ...this.form.value
        } as User
        console.log(userModel);
        this.appUserService.add(userModel).subscribe();   
        this.appModalService.alert("Utilizatorul a fost adaugat cu succes");
        this.router.navigate(["/main/home"]);
    }
}
