import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {

  @Input() props: { type: string; message: string };
	constructor() {
		this.props = {
			type: '',
			message: ''
		};
	}

}
