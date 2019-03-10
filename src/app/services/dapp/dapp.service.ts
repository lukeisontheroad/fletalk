import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { UUID } from 'angular2-uuid'

declare var WebSocket: any
declare var window: any
declare var buf2hex: any
declare var Buffer: any
declare var SHA2: any

interface ApiResponse {
  height: number
  payload: string
}
export interface Message {
  uuid: string
  timestamp: number
  text: string
  from: string
  to: string
}

@Injectable({
  providedIn: 'root'
})
export class DappService {
  private baseUrl = 'http://130.82.239.102:8080/api/'
  private userid: string
  private password: string
  private ourAddress: string
  private utxos: any[]
  private key: any
  private pk: string

  private messageListener: Map<string, Subject<Message>> = new Map()

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('user')) {
      this.doLogin(localStorage.getItem('user'), localStorage.getItem('password'))
        .then(() => {
          console.log('init ' + this.ourAddress)
          this.init(this.ourAddress)
        })
        .catch(() => console.warn('init failed'))
    } else {
      console.log('user not found')
    }
  }

  public init(ourAddress: string) {
    this.ourAddress = ourAddress
    const listener = this.uncachedListenToMessages(this.ourAddress)
    this.messageListener.set(this.ourAddress, listener)
  }

  listenToMessages(address: string): Subject<Message> {
    if (this.messageListener.has(address)) {
      return this.messageListener.get(address)
    }
    const listener = this.uncachedListenToMessages(address)
    this.messageListener.set(address, listener)
    return listener
  }

  private uncachedListenToMessages(address: string): Subject<Message> {
    return Observable.create(async observer => {
      setInterval(() => {
        this.getLastMessage(address).then(message => {
          observer.next(message)
        })
      }, 2000)
    })
  }

  private getLastMessage(address: string): Promise<Message> {
    return new Promise(resolve => {
      this.httpClient
        .get<ApiResponse>(this.baseUrl + 'games/' + address)
        .toPromise()
        .then(apiResponse => {
          resolve(JSON.parse(apiResponse.payload))
        })
    })
  }

  public async doLogin(userid, password): Promise<{}> {
    console.log('dologin', userid, password)
    return new Promise((resolve, reject) => {
      this.key = this.getKeyPair(userid, password)
      this.pk = this.key.getPublic().encodeCompressed('hex')
      this.httpClient
        .get(this.baseUrl + 'accounts?pubkey=' + this.pk)
        .toPromise()
        .then((res: any) => {
          console.log('utxo', res)
          this.ourAddress = res.address
          this.utxos = res.utxos
          this.password = password
          this.userid = userid
          localStorage.setItem('user', userid)
          localStorage.setItem('password', password)
          localStorage.setItem('address', this.ourAddress)
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }

  async sendMessage(address: string, text: string): Promise<{}> {
    const message = {
      uuid: UUID.UUID(),
      from: this.ourAddress,
      to: address,
      timestamp: Date.now(),
      text: text
    }
    return new Promise(async resolve => {
      await this.doLogin(this.userid, this.password)
      const utxo = this.utxos[0]
      this.utxos.splice(0, 1)

      this.httpClient
        .post(this.baseUrl + 'games/' + this.ourAddress + '/commands/add_count', {
          utxo: utxo,
          payload: JSON.stringify(message)
        })
        .toPromise()
        .then((res: any) => {
          const data = res
          const msg = new Buffer(data.hash_hex, 'hex')
          const sig = this.key.sign(msg)
          const SIG_HEX =
            buf2hex(sig.r.toArrayLike(Buffer, 'be', 32)) + buf2hex(sig.s.toArrayLike(Buffer, 'be', 32)) + '0' + sig.recoveryParam
          this.httpClient
            .post(this.baseUrl + 'games/' + this.ourAddress + '/commands/commit', {
              type: data.type,
              tx_hex: data.tx_hex,
              sig_hex: SIG_HEX
            })
            .toPromise()
            .then(
              (res: any) => {
                console.log('Message sent')
                resolve()
              },
              err => {
                console.error(err)
              }
            )
        })
    })
  }

  getKeyPair(userid, userpw) {
    var userid = window.SHA2(userid)
    var userpw = window.SHA2(userpw)
    var salt = window.SHA2('this is fleta sandbox')
    var keyHex = window.SHA2(userid + '#' + userpw + '#' + salt)
    var key = window.ec.keyPair({
      priv: keyHex,
      privEnc: 'hex'
    })
    return key
  }
}
