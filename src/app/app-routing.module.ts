import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicVideoChatComponent } from './basic-video-chat/basic-video-chat.component';
import { ArchivingComponent } from './archiving/archiving.component';

const routes: Routes = [
    { path: '', redirectTo: 'basic-video-chat', pathMatch: 'full' },
    { path: 'basic-video-chat', component: BasicVideoChatComponent },
    { path: 'archiving', component: ArchivingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
