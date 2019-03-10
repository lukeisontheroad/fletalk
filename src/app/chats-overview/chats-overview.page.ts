import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core'
import { ChatService, Chat } from '../services/chat/chat.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-chats-overview',
  templateUrl: './chats-overview.page.html',
  styleUrls: ['./chats-overview.page.scss']
})
export class ChatsOverviewPage implements OnInit {
  public chats: Observable<Chat[]>

  constructor(private chatService: ChatService, private alertController: AlertController) {
    this.chats = this.chatService.getChats()
  }

  ngOnInit() {}

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Login',
      inputs: [
        {
          name: 'pk',
          type: 'text',
          placeholder: 'Public Key'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if(!data.pk){
              this.presentAlertPrompt()
            }else{
              this.chatService.addChat(data.pk)
            }
          }
        }
      ]
    })

    await alert.present()
  }
}
