import { DappService } from './../services/dapp/dapp.service'
import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Chat, ChatService } from '../services/chat/chat.service'
import { ActivatedRoute } from '@angular/router'
import { take } from 'rxjs/operators'
import { IonContent } from '@ionic/angular'

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss']
})
export class ChatDetailPage implements AfterViewInit {
  @ViewChild(IonContent) private ionContent: IonContent

  public ourAddress = localStorage.getItem('address')

  public chat: Observable<Chat>
  public text: string

  constructor(private route: ActivatedRoute, private chatService: ChatService, private dappService: DappService) {
    this.chat = this.chatService.getChat(this.route.snapshot.params['chatId'])
    this.chatService.init()
  }

  ngAfterViewInit() {
    /*
    this.chatService.chatChanged.subscribe(_ => {
      this.ionContent.scrollToBottom(500)
    })
    */
  }

  public async send() {
    if (this.text != '') {
      const chat = await this.chat.pipe(take(1)).toPromise()
      this.dappService.sendMessage(chat.id, this.text)
      this.text = ''
    }
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.send()
    }
  }
}
