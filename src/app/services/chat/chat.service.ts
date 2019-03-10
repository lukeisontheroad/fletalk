import { Injectable } from '@angular/core'
import { ReplaySubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DappService, Message } from '../dapp/dapp.service'

export interface Chat {
  id: string
  logo: string
  name: string
  lastMessage: string
  lastMessageAt: string
  participants: string[]
  messages: Message[]
  unreadCount: number
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _chats: Chat[] = []
  public chats: ReplaySubject<Chat[]> = new ReplaySubject(1)
  private contacts: string[] = []
  private isInit = false

  constructor(private dappService: DappService) {
    var contacts = JSON.parse(localStorage.getItem('contacts'))
    if (!contacts) {
      contacts = []
    }
    this.contacts = contacts

    for (var i = 0; i < this.contacts.length; i++) {
      const address = this.contacts[i]

      this._chats.push({
        id: address,
        logo: 'https://randomuser.me/api/portraits/men/32.jpg',
        name: address,
        lastMessage: `Hey, what's up?`,
        lastMessageAt: new Date().toString(),
        participants: [],
        messages: [],
        unreadCount: 1
      })

      this.dappService.listenToMessages(address).subscribe(message => {
        this.pushMessage(address, message)
      })
    }

    this.chats.next(this._chats)

    this.init()
  }

  init() {
    if (localStorage.getItem('address') && !this.isInit) {
      this.isInit = true
      this.dappService.listenToMessages(localStorage.getItem('address')).subscribe(message => {
        this.pushMessage(localStorage.getItem('address'), message)
      })
    }
  }

  private pushMessage(address, message: Message) {
    console.log(address, message)
    const currentChat = this._chats.find(chat => chat.id === address || chat.id === message.from || chat.id === message.to)
    if (!currentChat) {
      console.error('no chat found for message', message)
      return
    }
    const hasMessage = currentChat.messages.some(myMessage => myMessage.uuid === message.uuid)
    if (!hasMessage) {
      currentChat.messages.push(message)
    }
    this.chats.next(this._chats)
  }

  public addChat(address: string) {
    this._chats.push({
      id: address,
      logo: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: address,
      lastMessage: `Hey, what's up?`,
      lastMessageAt: new Date().toString(),
      participants: [],
      messages: [],
      unreadCount: 1
    })
    this.contacts.push(address)
    localStorage.setItem('contacts', JSON.stringify(this.contacts))
    this.dappService.listenToMessages(address).subscribe(message => {
      this.pushMessage(address, message)
    })
    this.chats.next(this._chats)
  }

  public getChats(): Observable<Chat[]> {
    return this.chats.pipe(map(chats => chats.filter(chat => chat.participants.length <= 1)))
  }

  public getChannels(): Observable<Chat[]> {
    return this.chats.pipe(map(chats => chats.filter(chat => chat.participants.length > 1)))
  }

  public getChat(chatId: string): Observable<Chat> {
    return this.chats.pipe(map(chats => chats.find(chat => chat.id === chatId)))
  }

  public postMessageToChat(chatAddress: string, message: string) {}

  public postMessageToChannel(channelAddress: string, message: string) {}
}
