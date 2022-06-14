import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AppUserService } from "../../../services/user.service";
import { AppModalService } from "../../../services/modal.service";
import { Router } from "@angular/router";



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
        var login = this.form.get("email");
        var password = this.signinform.get("password");
        var userModel = {
            signin: {
                login,
                password
            },
            ...this.form.value
        }
        console.log(userModel);
        this.appUserService.add(userModel);
        this.appModalService.alert("User added succesfully");
        this.router.navigate(["/main/home"]);

    }
}
