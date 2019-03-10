import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { IonicModule } from '@ionic/angular'

import { ChannelsOverviewPage } from './channels-overview.page'

const routes: Routes = [
  {
    path: '',
    component: ChannelsOverviewPage
  }
]

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [ChannelsOverviewPage]
})
export class ChannelsOverviewPageModule {}
