import { Component } from "@angular/core";
import { CometChatService } from "src/app/services/chat.service";
import { environment } from '../../../../environments/environment';




@Component({
    selector: "app-chat",
    templateUrl: "./chat.component.html",
    styleUrls: ['chat.css']

})
export class ChatComponent {
    constructor(
        private readonly chatService : CometChatService 
        ) {
    }
    messages :any;
    listenerId = 'Web_App_Listener_Group_ID';

ngOnInit(){
    this.getMessages().then(_ => this.listenForMessages());
    this.chatService.init();
    this.chatService.createUser();
    this.listenForMessages();
    this.messages = [];
}    
get currentUser() {
    return this.chatService.currentUser;
}

sendMessage(message: string) {
    const date = new Date().toLocaleString();

this.messages.push({
    text: message,
    sender: { uid: this.currentUser?.getUid()},
    sentAt: date.split(",")[1]
});
console.log(this.messages);
this.chatService.sendMessage(environment.cometChat.groupId, message);
}

myMessage(uid : string){
    return this.currentUser?.getUid() == uid;
}

getMessages() {
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
