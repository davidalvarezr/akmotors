// One of car, twoWheelers and bike must not be null
export interface Ad {
  id: string,
  title: string,
  description: string,
  priceCHF: number,
  imageNb: number;
  car?: Car,
  twoWheelers?: TwoWheelers,
  bike?: Bike,
};

export type Vehicle = Car | TwoWheelers | Bike ;

export interface Car {
  vehicleType: VehicleType,
  brand: string,
  model: string,
  year: number,
  vehicleState: VehicleState,
  isElectric: boolean,
  kms: number,
  gearBoxType: GearBoxType,
  fuelType: FuelType,
  powerCV: number,
  cylinderL: number,
}

export interface TwoWheelers {
  vehicleType: VehicleType,
  brand: string,
  model: string,
  year: number,
  vehicleState: VehicleState,
  isElectric: boolean,
  kms: number,
  gearBoxType: GearBoxType,
  fuelType: FuelType,
  powerCV: number,
  cylinderCM3: number,
}

export interface Bike {
  vehicleType: VehicleType,
  brand: string,
  model: string,
  year: number,
  vehicleState: VehicleState,
  isElectric: boolean,
  gearsNumber: number,
  traysNumber: number,
}


export type VehicleType = CarType | TwoWheelersType | BikeType;
export type TwoWheelersType = 'MOTORBIKE' | 'SCOOTER';
export type CarType = 'CAR' | 'E_CAR';
export type BikeType = 'BIKE' | 'E_BIKE';
export type VehicleState = 'NEW' | 'USED';
export type GearBoxType = 'MANUAL' | 'AUTO';
export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC';


// Vehicle type SELECT
export const vehicleTypeOptions = [
  {val: 'CAR', disp: 'Voiture'},
  {val: 'MOTORBIKE', disp: 'Moto'},
  {val: 'SCOOTER', disp: 'Scooter'},
  {val: 'BIKE', disp: 'Vélo'},
];

// Vehicle state SELECT
export const vehicleStateOptions = [
  {val: 'NEW', disp: 'Neuf'},
  {val: 'USED', disp: 'Occasion'},
]

// Fuel Type SELECT
export const fuelTypeOptions = [
  {val: 'PETROL', disp: 'Essence'},
  {val: 'DIESEL', disp: 'Diesel'},
  {val: 'ELECTRIC', disp: 'Électrique'},
]

// Gear box Type SELECT
export const gearBoxTypeOptions = [
  {val: 'MANUAL', disp: 'Manuelle'},
  {val: 'AUTO', disp: 'Automatique'},
]

export function getDispFromVal(val: VehicleType | VehicleState | FuelType | GearBoxType): string {
  const allArrays: any[] = [vehicleTypeOptions, vehicleStateOptions, fuelTypeOptions, gearBoxTypeOptions];
  for (const option of allArrays) {
    for (const entry of option) {
      if (entry.val === val) {
        return entry.disp;
      }
    }
  }
  return '';
}

export function getVehicleType(ad: Ad): VehicleType {
  if (ad.car) {
    return ad.car.vehicleType;
  }
  if (ad.twoWheelers) {
    return ad.twoWheelers.vehicleType;
  }
  if (ad.bike) {
    return ad.bike.vehicleType;
  }
}

export function getVehicle(ad: Ad): Vehicle {
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
