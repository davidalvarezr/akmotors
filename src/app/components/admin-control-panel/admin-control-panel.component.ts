import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.scss']
})
export class AdminControlPanelComponent implements OnInit {

  ngOnInit() {
  }

  notImplemented() {
    alert('Pas encore implémenté');
  }
}
