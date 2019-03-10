import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'chats-overview', loadChildren: './chats-overview/chats-overview.module#ChatsOverviewPageModule' },
  { path: 'channels-overview', loadChildren: './channels-overview/channels-overview.module#ChannelsOverviewPageModule' },
  { path: 'chat-detail/:chatId', loadChildren: './chat-detail/chat-detail.module#ChatDetailPageModule' },
  { path: 'qr', loadChildren: './qr/qr.module#QrPageModule' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
