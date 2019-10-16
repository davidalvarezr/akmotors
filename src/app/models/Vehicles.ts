// One of car, twoWheelers and bike must not be null
export interface Ad {
  id?: string,
  title: string,
  description: string,
  priceCHF: number,
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
