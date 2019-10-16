import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() type: AlertType;
  @Input() strong?: string;
  @Input() message: string;
  @Input() icon?: string;

  @Input() isVisible?: boolean;

  ngOnInit(): void {
  }

  public closeAlert() {
    this.isVisible = false;
  }

}


export interface IAlert {
  type: AlertType;
  strong?: string;
  message: string;
  icon?: string;
}

type AlertType = 'success' | 'info' | 'warning' | 'danger';
