import {Component, OnInit} from '@angular/core';
import {
  Ad,
  FuelType,
  GearBoxType,
  getDispFromVal,
  getVehicle,
  getVehicleType,
  Vehicle,
  VehicleState,
  VehicleType
} from '../../models/Vehicles';
import {AdService} from '../../services/ad.service';
import {routes} from '../../../environments/environment.prod';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {forkJoin} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-manage-ads',
  templateUrl: './admin-manage-ads.component.html',
  styleUrls: ['./admin-manage-ads.component.scss']
})
export class AdminManageAdsComponent implements OnInit {

  get endpoint(): string {
    return routes.getOneAd;
  }

  get retrieveImage(): string {
    return routes.retrieveImage;
  }

  set idToBeDeleted(id: string) {
    this._idToBeDeleted = id;
  }

  closeResult: string;
  ads: Ad[];


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
    return getVehicle(ad);
  }

  getVehicleType(ad: Ad): VehicleType {
    return getVehicleType(ad);
  }

  translate(val: VehicleType | VehicleState | FuelType | GearBoxType): string {
    return getDispFromVal(val);
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

  deleteVehicle() {
    forkJoin(
      this.adService.deleteAd(this._idToBeDeleted),
      this.adService.deleteImages(this._idToBeDeleted)
    ).subscribe(
      (responseList: HttpResponse<any>[]) => {
        console.log(`status: ${responseList.map((response) => response.status)}`);
        this.refresh();
      },
      error => {
        alert('Une erreur est survenue pendant la suppression, regarder les logs');
        console.error(error);
      })
  }

  softDeleteVehicle() {
    forkJoin(
      this.adService.softDeleteAd(this._idToBeDeleted),
    ).subscribe(
      (responseList: HttpResponse<any>[]) => {
        console.log(`status: ${responseList.map((response) => response.status)}`);
        this.refresh();
      },
      error => {
        alert('Une erreur est survenue pendant la mise dans la corbeille, regarder les logs');
        console.error(error);
      })
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
    window.location.reload();
  }
}
