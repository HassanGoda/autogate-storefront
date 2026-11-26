import catalog from '~/data/saudi-vehicle-catalog.json';
import { IVehicle } from '~/interfaces/vehicle';

const usedIds = new Set<number>();

function vehicleId(key: string): number {
    let hash = 2166136261;
    for (let i = 0; i < key.length; i += 1) {
        hash = Math.imul(hash ^ key.charCodeAt(i), 16777619);
    }

    let id = (hash >>> 0) || 1;
    while (usedIds.has(id)) id += 1;
    usedIds.add(id);
    return id;
}

export const vehicles: IVehicle[] = catalog.flatMap((entry) => {
    const engineOptions = entry.engines.length ? entry.engines : ['Engine not listed'];

    return engineOptions.map((engine) => ({
        id: vehicleId(JSON.stringify([entry.year, entry.make, entry.model, engine])),
        year: entry.year,
        make: entry.make,
        model: entry.model,
        engine,
        fitmentUnverified: true,
    }));
});

export const userVehicles: IVehicle[] = [];
