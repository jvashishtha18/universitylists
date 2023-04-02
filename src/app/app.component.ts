import { Component } from '@angular/core';
import { SubscriberService } from './services/subscriber.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ventriks-task';
  loader=false;
  toast_props:any;
  show_toast=false;

  constructor(
    private subscriber: SubscriberService
  ) {
    this.subscriber.get_loader().subscribe((flag) => {
      this.loader = flag;
    });
    this.subscriber.get_toaster().subscribe((data:any) => {
			this.toast_props = data;
			this.show_toast = true;
			setTimeout(() => {
				this.show_toast = false;
			}, 5000);
		});
  }
}
