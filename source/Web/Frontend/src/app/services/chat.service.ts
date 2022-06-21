import { Injectable } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../environments/environment';
import { AppAuthService } from "src/app/services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  constructor(
    private readonly appAuthService :AppAuthService
  ){};
  
  public currentUser : CometChat.User | null | undefined
  
  appSetting: any;

  init() {
        this.appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(environment.cometChat.region)
        .build();
    CometChat.init(environment.cometChat.appId, this.appSetting).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  createUser(){
    var email = this.appAuthService.user() ?? "";

    var token = this.appAuthService?.userId() ?? "";
    var user = new CometChat.User(token);
    user.setName(email);
    CometChat.createUser(user, environment.cometChat.apiKey).then(
        user => {
            console.log("user created", user);
            this.login(user.getUid(),environment.cometChat.apiKey);
            this.currentUser = user;
        },error => {
            console.log("user Already existent")
            console.log("error", error);
            this.login(token,environment.cometChat.apiKey);
        })
    return ;
  }

  addUserToGroup(){
    CometChat.joinGroup(environment.cometChat.groupId, CometChat.GroupType?.Public);
    console.log("member added to group");
  }

  login(userId: string, apiKey: string = environment.cometChat.apiKey) {
    return CometChat.login(userId, apiKey)
      .then(usr => {this.currentUser = usr; this.addUserToGroup(); }, (this.currentUser = null))
      .then(_ => console.log('User logged in'), console.error);
  }

  sendMessage(receiverId: string, text: string) {
    const message = new CometChat.TextMessage(
      receiverId,
      text,
      CometChat.RECEIVER_TYPE.USER
    );
    return CometChat.sendGroupMessage(message);
  }

  listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
    CometChat.addMessageListener(
      listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: onMessageReceived,
        onMediaMessageReceived: (_ : any) => undefined
      })
    );
  }

  removeListener(listenerId: string) {
    CometChat.removeMessageListener(listenerId);
  }

  joinGroup(groupId: string) {
    return CometChat.joinGroup(groupId, CometChat.GroupType.Public, '');
  }

  getPreviousMessages(groupId: string) {
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(groupId)
      .setLimit(100)
      .build();

    return messageRequest.fetchPrevious();
  }
}
