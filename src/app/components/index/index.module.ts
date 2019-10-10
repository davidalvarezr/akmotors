import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';

import {BasicelementsComponent} from '../_basicelements/basicelements.component';
import {NavigationComponent} from '../_navigation/navigation.component';
import {TypographyComponent} from '../_typography/typography.component';
import {NucleoiconsComponent} from '../_nucleoicons/nucleoicons.component';
import {IndexComponent} from './index.component';
import {NotificationComponent} from '../_notification/notification.component';
import {NgbdModalBasic} from '../_modal/modal.component';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {AdsComponent} from '../ads/ads.component';
import {AppModule} from '../../app.module';
import {LoginComponent} from '../../examples/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    JwBootstrapSwitchNg2Module,
  ],
  declarations: [
    IndexComponent,
    BasicelementsComponent,
    NavigationComponent,
    TypographyComponent,
    NucleoiconsComponent,
    NotificationComponent,
    NgbdModalBasic,
    MenuBarComponent,
    AdsComponent,
  ],
  exports: [IndexComponent]
})
export class IndexModule {
}
