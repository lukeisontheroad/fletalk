import { ChatService } from './../services/chat/chat.service';
import { DappService } from './../services/dapp/dapp.service';
import { Component } from '@angular/core'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private alertController: AlertController, private dappService: DappService, private chatService: ChatService) {
    if(!localStorage.getItem('user')){
      this.presentAlertPrompt()
    }else{
      this.chatService.init()
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Login',
      inputs: [
        {
          name: 'user',
          type: 'text',
          placeholder: 'User'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentAlertPrompt()
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if(!data.user || !data.password){
              this.presentAlertPrompt()
            }else{
              this.dappService.doLogin(data.user, data.password)
              .then(() =>  this.chatService.init())
              .catch(() => this.presentAlertPrompt())
            }
          }
        }
      ]
    })

    await alert.present()
  }
}