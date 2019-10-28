import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {
  Ad,
  FuelType,
  fuelTypeOptions,
  GearBoxType,
  gearBoxTypeOptions,
  getVehicleType,
  VehicleState,
  vehicleStateOptions,
  VehicleType,
  vehicleTypeOptions
} from '../../models/Vehicles';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {routes} from '../../../environments/environment.prod';


@Component({
  selector: 'app-admin-add-ad',
  templateUrl: './admin-add-ad.component.html',
  styleUrls: ['./admin-add-ad.component.scss']
})
export class AdminAddAdComponent implements OnInit, OnDestroy {

  edit: Edit = {
    obs: null,
    updatePhotos: false,
    confirmUpdatePhotos: false,
  }

  isLoading: boolean;
  ad: Ad;

  id: string;
  title: string;
  description: string;
  vehicleType: VehicleType;
  vehicleState: VehicleState;
  fuelType: FuelType;
  gearBoxType: GearBoxType;
  brand: string;
  model: string;
  year: number;
  kms: number;
  powerCV: number;
  cylinderCM3: number;
  cylinderL: number;
  isElectric: boolean;
  gearsNumber: number;
  traysNumber: number;
  priceCHF: number;

  files: File[] = [];
  fileUploadProgress: string;
  previewUrls: any[] = [];

  car = 'CAR';
  motorBike = 'MOTORBIKE';
  scooter = 'SCOOTER';
  bike = 'BIKE';

  constructor(private adService: AdService, private router: Router, private activtatedRoute: ActivatedRoute) {
  }

  get fuelTypeOptions() {
    return fuelTypeOptions;
  }

  get gearBoxTypeOptions() {
    return gearBoxTypeOptions;
  }

  get vehicleStateOptions() {
    return vehicleStateOptions
  }

  get vehicleTypeOptions() {
    return vehicleTypeOptions;
  }

  get imageRoute() {
    return routes.retrieveImage;
  }

  ngOnInit() {
    this.isLoading = true;
    this.edit.obs = this.activtatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        return;
      }

      this.adService.getOne(this.id)
        .subscribe(
          (ad: Ad) => {
            this.isLoading = false;
            this.ad = ad;
            this.fillAllFields();
          },
          error => {
            this.isLoading = false;
            console.error(error);
          }
        )
    })
  }

  ngOnDestroy() {
    this.edit.obs.unsubscribe();
  }

  /**
   * Process all fields end send two HTTP requests to server:
   * 1. Ad
   * 2. Pictures
   */
  createAd(): void {
    const ad: Ad = this.createAdObject();

    if (!this.isAdConsistent(ad)) {
      alert('Error, there should be exactly one vehicle');
      return;
    }

    // Insert Ad with the number of images, then get the id of the inserted ad, then add photos with this id
    this.adService.addAd(ad)
      .pipe(
        switchMap((AdId: string) => {
          if (!this.id || this.edit.confirmUpdatePhotos) {
            const formData = this.makeUpFormData(AdId);
            return this.adService.addImages(formData);
          }
          return of([0])
        })
      )
      .subscribe(
        (uploadedImages: any[]) => {
          if (!(!this.id || this.edit.confirmUpdatePhotos)) { this.onSuccess(); return; }
          if (uploadedImages.length === this.files.length) {
            this.onSuccess();
          } else {
            this.onError('Le nombre d\'images uploadées n\'est pas le même que le nombre d\'images sélectionnées');
          }
        },
        error => {
          console.error(error);
          this.onError(error);
        }
      );

  }

  /**
   * Takes the files selected in the explorer by the user and saves it in the model
   * @param fileInput files selected by the user
   */
  fileProgress(fileInput: any) {
    if (this.edit.updatePhotos) {
      this.edit.confirmUpdatePhotos = true;
    }

    this.files = <File[]>fileInput.target.files;
    this.previews();
  }

  // Show previews of pictures
  previews() {
    this.previewUrls = [];

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        continue;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.previewUrls.push(reader.result);
      }
    }
  }

  arrayFromXToYBothInlcuded(x: number, y: number) {
    const array = [];
    for (let i = x; i <= y; i++) { array.push(i); }
    return array;
  }

  private isAdConsistent(ad: Ad): boolean {
    let counter = 0;
    if (ad.car !== null) {
      ++counter;
    }
    if (ad.twoWheelers !== null) {
      ++counter;
    }
    if (ad.bike !== null) {
      ++counter;
    }
    return counter === 1;
  }

  /**
   * Programatically create the FormData object, because all fields in HTML are not encapsulated in a form
   * @param AdId the id of the ad
   * @return The FormData containing the files (pictures) and the id of the add which was added (ad is first added then files are uploaded).
   */
  private makeUpFormData(AdId: string): FormData {
    const formData = new FormData();
    const files: Array<File> = this.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i]['name']);
    }
    formData.append('AdId', AdId);
    return formData;
  }

  // Called when everything went well
  private onSuccess() {
    alert(`L'annonce a été ${this.id ? 'modifiée' : 'ajoutée'} avec succès`);
    this.router.navigate(['admin/manage-ads'])
  }

  // Called when something bad happened
  private onError(error: any) {
    alert('Une erreur est survenue pendans la suppression, voir logs');
    console.error(error);
    this.router.navigate(['admin/manage-ads'])
  }


  /**
   * Creates an ad from fileds that will be send to server
   */
  private createAdObject(): Ad {
    const imageNb = this.previewUrls.length > 0 ? this.previewUrls.length : (this.ad ? this.ad.imageNb : 0);

    const ad: Ad = {
      id: this.id,
      title: this.title,
      description: this.description,
      priceCHF: this.priceCHF,
      imageNb,
      car: this.vehicleType === this.car ? {
        vehicleType: this.vehicleType,
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.vehicleState,
        isElectric: this.isElectric,
        kms: this.kms,
        gearBoxType: this.gearBoxType,
        fuelType: this.fuelType,
        powerCV: this.powerCV,
        cylinderL: this.cylinderL,
      } : null,
      twoWheelers: this.vehicleType === this.scooter || this.vehicleType === this.motorBike ? {
        vehicleType: this.vehicleType,
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.vehicleState,
        isElectric: this.isElectric,
        kms: this.kms,
        gearBoxType: this.gearBoxType,
        fuelType: this.fuelType,
        powerCV: this.powerCV,
        cylinderCM3: this.cylinderCM3,
      } : null,
      bike: this.vehicleType === this.bike ? {
        vehicleType: this.vehicleType,
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.vehicleState,
        isElectric: this.isElectric,
        gearsNumber: this.gearsNumber,
        traysNumber: this.traysNumber,
      } : null,
    };

    return ad;
  }

  /**
   * In update mode, retrieves all the fields from the ad and fill the fields.
   * It is like the inverse of {@link createAdObject}
   */
  private fillAllFields = () => {
    const a = this.ad;

    console.log(JSON.stringify(a));

    this.title = a.title;
    this.description = a.description;
    this.vehicleType = getVehicleType(a);
    this.priceCHF = a.priceCHF
    switch (this.vehicleType) {
      case 'BIKE':
      case 'E_BIKE':
        const b = a.bike;
        this.brand = b.brand;
        this.model = b.model;
        this.year = b.year;
        this.vehicleState = b.vehicleState;
        this.isElectric = b.isElectric;
        this.traysNumber = b.traysNumber;
        this.gearsNumber = b.gearsNumber;
        break;
      case 'E_CAR':
      case 'CAR':
        const c = a.car;
        this.brand = c.brand;
        this.model = c.model;
        this.year = c.year;
        this.kms = c.kms;
        this.fuelType = c.fuelType;
        this.powerCV = c.powerCV;
        this.cylinderL = c.cylinderL;
        this.vehicleState = c.vehicleState;
        this.isElectric = c.isElectric;
        this.gearBoxType = c.gearBoxType;
        break;
      case 'MOTORBIKE':
      case 'SCOOTER':
        const t = a.twoWheelers;
        this.brand = t.brand;
        this.model = t.model;
        this.year = t.year;
        this.kms = t.kms;
        this.fuelType = t.fuelType;
        this.powerCV = t.powerCV;
        this.cylinderCM3 = t.cylinderCM3;
        this.vehicleState = t.vehicleState;
        this.isElectric = t.isElectric;
        this.gearBoxType = t.gearBoxType;
        break;
    }
  }

}


interface Edit  {
  obs: Subscription,
  updatePhotos: boolean,
  confirmUpdatePhotos: boolean,
}
