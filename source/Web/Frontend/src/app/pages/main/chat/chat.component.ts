import { Component } from "@angular/core";
import { CometChatService } from "src/app/services/chat.service";
import { AppUserService } from "src/app/services/user.service";
import { environment } from '../../../../environments/environment';
//import settings from '../../../../assets/settings.json';




@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ['chat.css']

})
export class ChatComponent {
    constructor(
        private readonly chatService : CometChatService,
        private readonly appUserService  :AppUserService
        ) {
    }
    messages :any;
    listenerId = 'Web_App_Listener_Group_ID';
    avatar: any;
    avatarUtilizatori : any;
    lastAvatarUpdate: any;


async ngOnInit(){
    this.chatService.init();
    this.chatService.createUser();
    this.getMessages().then(_ => this.listenForMessages());
    this.messages = [];
    this.avatarUtilizatori = {};
    this.lastAvatarUpdate = new Date();
}    

NoAvatarForUser(id :string){

    var diff = new Date().getTime() - this.lastAvatarUpdate.getTime();
    var secondsPassed = Math.floor(diff/1000);
    if(this.avatarUtilizatori[id] != null && this.avatarUtilizatori[id] != undefined){
        return false;
    }
    else if(secondsPassed > 0.1){ //daca au trecut mai mult de .1 secunde de la ultimul request
            this.appUserService.get(Number(id)).subscribe(x=> x.avatarGuid != null ? this.getUserAvatar(id,x.avatarGuid) :  {});
            this.lastAvatarUpdate = new Date();
            return true;
    }
    else{
        return true;
    }
}

getUserAvatar(id:string, guid:string){
          this.avatarUtilizatori[id] = "/Fisiere/"+ guid +".jpg";
}

get currentUser() {
    return this.chatService.currentUser;
}
getFormatedDate(timestamp : any){
    var date =  new Date(timestamp * 1000).toLocaleString();
    return date.split(`,`)[1];
}

sendMessage(message: string) {
    const date = Math.floor(new Date().getTime() / 1000)

this.messages.push({
    text: message,
    sender: { uid: this.currentUser?.getUid()},
    sentAt: date
});
console.log(this.messages);
this.chatService.sendMessage(environment.cometChat.groupId, message);
}

myMessage(message : any){
    return this.currentUser?.getUid() == message.sender.uid;
}

async getMessages() {
    console.log("intrare");
    console.log("asteptare");
return this.chatService
    .getPreviousMessages(environment.cometChat.groupId)
    .then(messages => (this.messages = messages))
    .then(console.log, console.error);
}

listenForMessages() {
console.log('registering messages listner');
this.chatService.listenForMessages(this.listenerId, msg => {
    console.log('new message received: ', msg);
    this.messages.push(msg);
});
}

ngOnDestroy(): void {
this.chatService.removeListener(this.listenerId);
}
}
// function delay(ms: number) {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// }
