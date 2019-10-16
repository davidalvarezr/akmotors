import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {IndexComponent} from './components/index/index.component';
import {LandingComponent} from './examples/landing/landing.component';
import {LoginComponent} from './examples/login/login.component';
import {ProfileComponent} from './examples/profile/profile.component';
import {NucleoiconsComponent} from './components/_nucleoicons/nucleoicons.component';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {AdminControlPanelComponent} from './components/admin-control-panel/admin-control-panel.component';
import {AdminAddAdComponent} from './components/admin-add-ad/admin-add-ad.component';
import {AdminManageAdsComponent} from './components/admin-manage-ads/admin-manage-ads.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: '_nucleoicons', component: NucleoiconsComponent},
  {path: 'examples/landing', component: LandingComponent},
  {path: 'examples/login', component: LoginComponent},
  {path: 'examples/profile', component: ProfileComponent},
  {path: 'admin/login', component: AdminLoginComponent},
  {path: 'admin/control-panel', component: AdminControlPanelComponent},
  {path: 'admin/add-ad', component: AdminAddAdComponent},
  {path: 'admin/manage-ads', component: AdminManageAdsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [],
})
export class AppRoutingModule {
}
