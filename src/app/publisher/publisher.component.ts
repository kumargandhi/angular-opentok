import {
    Component,
    ElementRef,
    AfterViewInit,
    ViewChild,
    Input,
} from '@angular/core';
import { OpentokService } from '../opentok.service';

const publish = () => {};

@Component({
    selector: 'app-publisher',
    templateUrl: './publisher.component.html',
    styleUrls: ['./publisher.component.scss'],
})
export class PublisherComponent implements AfterViewInit {
    @ViewChild('publisherDiv') publisherDiv: ElementRef;
    @Input() session: OT.Session;
    publisher: OT.Publisher;
    publishing: boolean;

    constructor(private opentokService: OpentokService) {
        this.publishing = false;
    }

    ngAfterViewInit() {
        const OT = this.opentokService.getOT();
        this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
            insertMode: 'append',
            width: '500px',
            height: '450px',
        });

        if (this.session) {
            //@ts-ignore
            if (this.session['isConnected']()) {
                this.publish();
            }
            this.session.on('sessionConnected', () => this.publish());
        }
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
}
