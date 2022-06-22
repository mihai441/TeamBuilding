import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppFooterComponent } from "./footer/footer.component";
import { AppHeaderComponent } from "./header/header.component";
import { AppLayoutMainComponent } from "./layout-main/layout-main.component";
import { AppLayoutComponent } from "./layout/layout.component";
import { AppNavComponent } from "./nav/nav.component";

@NgModule({
    declarations: [
        AppFooterComponent,
        AppHeaderComponent,
        AppLayoutComponent,
        AppLayoutMainComponent,
        AppNavComponent
    ],
    imports: [RouterModule,
    BrowserModule,
    CommonModule]
})
export class AppLayoutsModule { }
