import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ChatsOverviewPage } from './chats-overview.page'
import { MomentModule } from 'ngx-moment'

const routes: Routes = [
  {
    path: '',
    component: ChatsOverviewPage
  }
]

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes), MomentModule],
  declarations: [ChatsOverviewPage]
})
export class ChatsOverviewPageModule {}
