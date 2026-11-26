// application
import { clone, delayResponse, error } from '~/fake-server/utils';
import { IVehicle } from '~/interfaces/vehicle';
import { userVehicles, vehicles } from '~/fake-server/database/vehicles';

export function getYears(): Promise<number[]> {
    return Promise.resolve(Array.from({ length: 20 }, (_, index) => 2027 - index));
}

export function getMakes(year: number): Promise<string[]> {
    const result: string[] = [];

    vehicles.filter((x) => x.year === year).forEach((vehicle) => {
        if (result.indexOf(vehicle.make) === -1) {
            result.push(vehicle.make);
        }
    });

    return Promise.resolve(result.sort((a, b) => a.localeCompare(b)));
}

export function getModels(year: number, make: string): Promise<string[]> {
    const result: string[] = [];

    vehicles.filter((x) => x.year === year && x.make === make).forEach((vehicle) => {
        if (result.indexOf(vehicle.model) === -1) {
            result.push(vehicle.model);
        }
    });

    return Promise.resolve(result.sort((a, b) => a.localeCompare(b)));
}

export function getVehicles(year: number, make: string, model: string): Promise<IVehicle[]> {
    const result = vehicles.filter((x) => x.year === year && x.make === make && x.model === model);

    return Promise.resolve(result.sort((a, b) => a.engine.localeCompare(b.engine, undefined, { numeric: true })));
}

export function getVehicleByVin(_vin: string): Promise<IVehicle> {
    return error('Page Not Found');
}

export function getUserVehicles(): Promise<IVehicle[]> {
    return Promise.resolve(clone(userVehicles));
}

export function addUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);
    const vehicle = vehicles.find((x) => x.id === vehicleId);

    if (vehicle && index === -1) {
        userVehicles.push(vehicle);
    }

    return delayResponse(Promise.resolve());
}

export function removeUserVehicles(vehicleId: number): Promise<void> {
    const index = userVehicles.findIndex((x) => x.id === vehicleId);

    if (index !== -1) {
        userVehicles.splice(index, 1);
    }

    return delayResponse(Promise.resolve());
}
