import { Component, OnInit } from '@angular/core'
import { Chat, ChatService } from '../services/chat/chat.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-channels-overview',
  templateUrl: './channels-overview.page.html',
  styleUrls: ['./channels-overview.page.scss']
})
export class ChannelsOverviewPage implements OnInit {
  public chats: Observable<Chat[]>

  constructor(private chatService: ChatService) {
    this.chats = this.chatService.getChannels()
  }

  ngOnInit() {}
}
