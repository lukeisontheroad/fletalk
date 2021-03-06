import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ChatDetailPage } from './chat-detail.page'
import { MomentModule } from 'ngx-moment'

const routes: Routes = [
  {
    path: '',
    component: ChatDetailPage
  }
]

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), MomentModule],
  declarations: [ChatDetailPage]
})
export class ChatDetailPageModule {}
