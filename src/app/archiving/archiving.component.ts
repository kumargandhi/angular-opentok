import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { OpentokService } from '../opentok.service';
import * as OT from '@opentok/client';

@Component({
    selector: 'app-archiving',
    templateUrl: './archiving.component.html',
    styleUrls: ['./archiving.component.scss'],
    providers: [OpentokService],
})
export class ArchivingComponent implements OnInit {
    session: OT.Session;
    streams: Array<OT.Stream> = [];
    changeDetectorRef: ChangeDetectorRef;
    @ViewChild('publisherDiv') publisherDiv: ElementRef;
    publisher: OT.Publisher;
    publishing: boolean;

    archiveID: any;

    archiveStarted = false;

    archiveStopped = false;

    constructor(
        private ref: ChangeDetectorRef,
        private opentokService: OpentokService
    ) {
        this.changeDetectorRef = ref;
    }

    ngOnInit(): void {
        this.opentokService
            .initSession()
            .then((session: OT.Session) => {
                this.session = session;
                this.session.on('streamCreated', (event) => {
                    this.streams.push(event.stream);
                    this.changeDetectorRef.detectChanges();
                });
                this.session.on('streamDestroyed', (event) => {
                    const idx = this.streams.indexOf(event.stream);
                    if (idx > -1) {
                        this.streams.splice(idx, 1);
                        this.changeDetectorRef.detectChanges();
                    }
                });
                this.session.on('archiveStarted', (event) => {
                    this.archiveID = event.id;
                    console.log('Archive started ' + this.archiveID);
                    this.archiveStarted = true;
                });
                this.session.on('archiveStopped', (event) => {
                    this.archiveID = event.id;
                    console.log('Archive stopped ' + this.archiveID);
                });
            })
            .then(() => {
                this.opentokService
                    .connect()
                    .then(() => {
                        const OT = this.opentokService.getOT();
                        this.publisher = OT.initPublisher(
                            this.publisherDiv.nativeElement,
                            {
                                insertMode: 'append',
                                width: '500px',
                                height: '450px',
                            }
                        );

                        if (this.session) {
                            //@ts-ignore
                            if (this.session['isConnected']()) {
                                this.publish();
                            }
                            this.session.on('sessionConnected', () =>
                                this.publish()
                            );
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        alert(
                            'Connection failed. Make sure you have updated the config.ts file with your OpenTok details.'
                        );
                    });
            })
            .catch((err) => {
                console.error(err);
                alert(
                    'Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.'
                );
            });
    }

    publish() {
        this.session.publish(this.publisher, (err) => {
            if (err) {
                alert(err.message);
            } else {
                this.publishing = true;
            }
        });
    }

    OnStart() {}

    onStop() {}

    onView() {}
}
