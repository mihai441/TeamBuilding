import { Component, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { AppBaseComponent } from "src/app/components/base/base.component";
import { User } from "src/app/models/user";
import { AppAuthService } from "src/app/services/auth.service";
import { AppUserService } from "src/app/services/user.service";
import { AppFileService } from "./file.service";
import { FileInfo } from "./fileinfo";
import { Upload } from "./upload";

@Component({
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: AppFileComponent, multi: true }],
    selector: "app-file",
    templateUrl: "./file.component.html"
})
export class AppFileComponent extends AppBaseComponent<FileInfo[]> {
    @Input() class!: string;
    @Input() disabled = false;
    @Input() formControlName!: string;
    @Input() text!: string;

    uploads = new Array<Upload>();

    constructor(private readonly appFileService: AppFileService,
                private readonly appAuthService: AppAuthService,
                private readonly appUserService: AppUserService,
                ) 
    {
        super();
    }

    change(files: FileList | null) {
        if (!files) { return; }

        for (let index = 0; index < files.length; index++) {
            const file = files.item(index) as File;
            const upload = new Upload(file.name, 0);
            this.uploads.push(upload);

            this.appFileService.upload(file).subscribe((result: Upload) => {
                upload.progress = result.progress;

                if (result.id) {
                    this.value.push(new FileInfo(result.id, file.name));
                    this.uploads = this.uploads.filter((x) => x.progress < 100);
                    var id = Number(this.appAuthService.userId() ?? "");
                        var userModel = {
                            id: id,
                            avatarGuid : result.id
                        } as User
                        this.appUserService.update(userModel).subscribe(() => this.appAuthService.updateAvatarGuid(result.id));
                        alert("Avatar schimbat cu success");
                }
            });
        }
    }
}
