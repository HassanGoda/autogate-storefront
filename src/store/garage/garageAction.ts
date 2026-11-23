// application
import { IVehicle } from '~/interfaces/vehicle';
import { vehicleApi } from '~/api';
import {
    GARAGE_SET_CURRENT,
    GARAGE_SET_ITEMS,
    GarageSetCurrentAction,
    GarageSetItemsAction,
    GarageThunkAction,
} from '~/store/garage/garageActionTypes';

export function garageSetItems(items: IVehicle[]): GarageSetItemsAction {
    return {
        type: GARAGE_SET_ITEMS,
        payload: items,
    };
}

export function garageSetCurrent(vehicle: number | IVehicle | null): GarageSetCurrentAction {
    return {
        type: GARAGE_SET_CURRENT,
        payload: vehicle,
    };
}

export function loadUserVehicles(): GarageThunkAction<Promise<void>> {
    return (dispatch) => (
        vehicleApi.getUserVehicles().then((items) => {
            dispatch(garageSetItems(items));
        })
    );
}

export function garageAddItem(vehicleId: number): GarageThunkAction<Promise<void>> {
    return async (dispatch) => {
        await vehicleApi.addUserVehicle(vehicleId);

        return dispatch(loadUserVehicles());
    };
}

export function garageRemoveItem(vehicleId: number): GarageThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        await vehicleApi.removeUserVehicle(vehicleId);
        if (getState().garage.current?.id === vehicleId) {
            dispatch(garageSetCurrent(null));
        }

        return dispatch(loadUserVehicles());
    };
}
