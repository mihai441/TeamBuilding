import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AppButtonModule } from "../../../components/button/button.module";
import { AppInputPasswordModule } from "../../../components/input/password/password.module";
import { AppInputTextModule } from "../../../components/input/text/text.module";
import { AppLabelModule } from "../../../components/label/label.module";
import { AddUserComponent } from "./adduser.component";

const ROUTES: Routes = [
    { path: "", component: AddUserComponent }
];

@NgModule({
    declarations: [AddUserComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        AppButtonModule,
        AppInputPasswordModule,
        AppInputTextModule,
        AppLabelModule
    ]
})
export class AddUserModule { }
