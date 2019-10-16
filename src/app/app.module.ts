import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {IndexModule} from './components/index/index.module';
import {ExamplesModule} from './examples/examples.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {HttpClientModule} from '@angular/common/http';
import {NotificationComponent} from './components/notification/notification.component';
import { AdminControlPanelComponent } from './components/admin-control-panel/admin-control-panel.component';
import { AdminAddAdComponent } from './components/admin-add-ad/admin-add-ad.component';
import { AdminManageAdsComponent } from './components/admin-manage-ads/admin-manage-ads.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminLoginComponent,
    NotificationComponent,
    AdminControlPanelComponent,
    AdminAddAdComponent,
    AdminManageAdsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    RouterModule,
    AppRoutingModule,
    IndexModule,
    ExamplesModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
