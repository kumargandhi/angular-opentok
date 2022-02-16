import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpentokService } from './opentok.service';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { ArchivingComponent } from './archiving/archiving.component';
import { BasicVideoChatComponent } from './basic-video-chat/basic-video-chat.component';

@NgModule({
    declarations: [
        AppComponent,
        PublisherComponent,
        SubscriberComponent,
        ArchivingComponent,
        BasicVideoChatComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [OpentokService],
    bootstrap: [AppComponent],
})
export class AppModule {}
