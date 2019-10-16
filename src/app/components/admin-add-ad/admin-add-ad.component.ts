import { Component, OnInit } from '@angular/core';
import {AdService} from '../../services/ad.service';
import {Ad, FuelType, GearBoxType, VehicleState, VehicleType} from '../../models/Vehicles';

@Component({
  selector: 'app-admin-add-ad',
  templateUrl: './admin-add-ad.component.html',
  styleUrls: ['./admin-add-ad.component.scss']
})
export class AdminAddAdComponent implements OnInit {

  title: string;
  description: string;
  vehicleType: string;
  vehicleState: string;
  fuelType: string;
  gearBoxType: string;
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

  // Vehicle type SELECT
  car = 'Voiture';
  motorBike = 'Moto';
  scooter = 'Scooter';
  bike = 'Vélo';
  vehicleTypeStrings = [this.car, this.motorBike, this.scooter, this.bike]
  mappedVehicleTypes = {
    [this.car]: 'CAR' as VehicleType,
    [this.motorBike]: 'MOTORBIKE' as VehicleType,
    [this.scooter]: 'SCOOTER' as VehicleType,
    [this.bike]: 'BIKE' as VehicleType,
  };

  // Vehicle state SELECT
  new = 'Neuf';
  used = 'Occasion';
  vehicleStateStrings = [this.new, this.used];
  mappedVehicleStates = {
    [this.new]: 'NEW' as VehicleState,
    [this.used]: 'USED'as VehicleState,
  }

  // Fuel Type SELECT
  petrol = 'Essence';
  diesel = 'Diesel';
  electric = 'Électrique';
  fuelTypeStrings = [this.petrol, this.diesel, this.electric];
  mappedFuelTypes = {
    [this.petrol]: 'PETROL' as FuelType,
    [this.diesel]: 'DIESEL' as FuelType,
    [this.electric]: 'ELECTRIC' as FuelType,
  }

  // Gear box Type SELECT
  manual = 'Manuelle';
  auto = 'Automatique';
  gearBoxTypeStrings = [this.manual, this.auto];
  mappedGearBoxTypes = {
    [this.manual]: 'MANUAL' as GearBoxType,
    [this.auto]: 'AUTO' as GearBoxType,
  }

  constructor(private adService: AdService) {}

  ngOnInit() {
  }

  createAd() {
    const ad: Ad = {
      title: this.title,
      description: this.description,
      priceCHF: this.priceCHF,
      car: this.vehicleType === this.car ? {
        vehicleType: this.mappedVehicleTypes[this.vehicleType],
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.mappedVehicleStates[this.vehicleState],
        isElectric: this.isElectric,
        kms: this.kms,
        gearBoxType: this.mappedGearBoxTypes[this.gearBoxType],
        fuelType: this.mappedFuelTypes[this.fuelType],
        powerCV: this.powerCV,
        cylinderL: this.cylinderL,
      } : null,
      twoWheelers: this.vehicleType === this.scooter || this.vehicleType === this.motorBike ? {
        vehicleType: this.mappedVehicleTypes[this.vehicleType],
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.mappedVehicleStates[this.vehicleState],
        isElectric: this.isElectric,
        kms: this.kms,
        gearBoxType: this.mappedGearBoxTypes[this.gearBoxType],
        fuelType: this.mappedFuelTypes[this.fuelType],
        powerCV: this.powerCV,
        cylinderCM3: this.cylinderCM3,
      } : null,
      bike: this.vehicleType === this.bike ? {
        vehicleType: this.mappedVehicleTypes[this.vehicleType],
        brand: this.brand,
        model: this.model,
        year: this.year,
        vehicleState: this.mappedVehicleStates[this.vehicleState],
        isElectric: this.isElectric,
        gearsNumber: this.gearsNumber,
        traysNumber: this.traysNumber,
      } : null,
    }

    if (this.isAdConsistent(ad)) {
      this.adService.addAd(ad)
        .subscribe(
          _ => {
            alert('Annonce ajoutée avec succès');
          },
          error => {
            // TODO: log error
            console.error(error);
            // TODO: redirect to login page if unauthorized (401)
          }
        );
    } else {
      alert('Error, there should be exactly one vehicle');
    }
  }


  private isAdConsistent(ad: Ad): boolean {
    let counter = 0;
    if (ad.car !== null) { ++counter; }
    if (ad.twoWheelers !== null) { ++counter; }
    if (ad.bike !== null) { ++counter; }
    return counter === 1;
  }
}
