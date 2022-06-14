import { Routes } from "@angular/router";
import { AppGuard } from "./app.guard";
import { AppLayoutMainComponent } from "./layouts/layout-main/layout-main.component";
import { AppLayoutComponent } from "./layouts/layout/layout.component";

export const ROUTES: Routes = [
    {
        path: "",
        component: AppLayoutComponent,
        children: [
            { path: "", loadChildren: () => import("./pages/signin/signin.module").then((module) => module.AppSigninModule) }
        ]
    },
    {
        path: "main",
        component: AppLayoutMainComponent,
        canActivate: [AppGuard],
        children: [
            { path: "files", loadChildren: () => import("./pages/main/files/files.module").then((module) => module.AppFilesModule) },
            { path: "form", loadChildren: () => import("./pages/main/form/form.module").then((module) => module.AppFormModule) },
            { path: "home", loadChildren: () => import("./pages/main/home/home.module").then((module) => module.AppHomeModule) },
            { path: "list", loadChildren: () => import("./pages/main/list/list.module").then((module) => module.AppListModule) },
            { path: "adduser", loadChildren: () => import("./pages/main/add-user/adduser.module").then((module) => module.AddUserModule) },
            { path: "chat", loadChildren: () => import("./pages/main/chat/chat.module").then((module) => module.ChatModule) },
            { path: "coop", loadChildren: () => import("./pages/main/coop/coop.module").then((module) => module.CoopModule) }


        ]
    },
    {
        path: "**",
        redirectTo: ""
    }
];
