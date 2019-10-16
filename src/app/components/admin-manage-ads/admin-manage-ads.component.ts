import {Component, OnInit} from '@angular/core';
import {Ad, Vehicle, VehicleType} from '../../models/Vehicles';
import {AdService} from '../../services/ad.service';
import {routes} from '../../../environments/environment.prod';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-manage-ads',
  templateUrl: './admin-manage-ads.component.html',
  styleUrls: ['./admin-manage-ads.component.scss']
})
export class AdminManageAdsComponent implements OnInit {

  get endpoint(): string {
    return this._endpoint;
  }

  set idToBeDeleted(id: string) {
    this._idToBeDeleted = id;
  }

  closeResult: string;
  ads: Ad[];

  private _endpoint = routes.getOneAd;

  private _idToBeDeleted: string;

  constructor(private adService: AdService, private modalService: NgbModal, private router: Router) {
    this.adService.getAll()
      .subscribe(
        ads => {
          this.ads = ads;
        },
        error => {
          // TODO: log error
          console.error(error);
        }
      );
  }

  getVehicle(ad: Ad): Vehicle {
    if (ad.car) {
      return ad.car;
    }
    if (ad.twoWheelers) {
      return ad.twoWheelers;
    }
    if (ad.bike) {
      return ad.bike;
    }
  }

  ngOnInit() {
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, {windowClass: '_modal-mini _modal-primary', size: 'sm'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else if (modalDimension == undefined && type === 'Login') {
      this.modalService.open(content, {windowClass: '_modal-login _modal-primary'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

  }

  // TODO: refresh page and log error
  deleteVehicle() {
    this.adService.deleteAd(this._idToBeDeleted)
      .subscribe(
        _ => {
          alert('Supprimé avec succès');
          this.refresh();
        },
        error => {
          alert('Une erreur est survenue pendans la suppression, voir logs');
          console.error(error);
        }
      )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private refresh() {
    this.router.navigate(['admin/manage-ads']);
  }
}
