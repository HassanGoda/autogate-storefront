// react
import React, { useState } from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
// application
import Decor from '~/components/shared/Decor';
import url from '~/services/url';
import VehicleSelect from '~/components/shared/VehicleSelect';
import { baseUrl } from '~/services/utils';
import { hrefToRouterArgs } from '~/services/router';
import { IVehicle } from '~/interfaces/vehicle';
import { useGarageSetCurrent } from '~/store/garage/garageHooks';
import SelectedVehicleIdentity from '~/components/shared/SelectedVehicleIdentity';

function BlockFinder() {
    const router = useRouter();
    const setCurrentVehicle = useGarageSetCurrent();
    const [vehicle, setVehicle] = useState<IVehicle | null>(null);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!vehicle) {
            return;
        }

        setCurrentVehicle(vehicle);
        router.push(
            ...hrefToRouterArgs(url.products({
                filters: vehicle.fitmentUnverified ? {} : { filter_vehicle: vehicle.id.toString() },
            })),
        ).then();
    };

    return (
        <div className="block block-finder">
            <Decor className="block-finder__decor" type="bottom" />
            <div
                className="block-finder__image"
                style={{ backgroundImage: `url(${baseUrl('/images/finder.jpg')})` }}
            />
            <div className="block-finder__body container container--max--xl">
                <div className="block-finder__title">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_TITLE" />
                </div>
                <div className="block-finder__subtitle">
                    <FormattedMessage id="TEXT_BLOCK_FINDER_SUBTITLE" />
                </div>
                <form className="block-finder__form" onSubmit={onSubmit}>
                    <VehicleSelect className="block-finder__select" onVehicleChange={setVehicle} />

                    <button className="block-finder__button" type="submit">
                        <FormattedMessage id="BUTTON_BLOCK_FINDER_SEARCH" />
                    </button>
                </form>
                {vehicle && (
                    <div className="mt-2"><SelectedVehicleIdentity vehicle={vehicle} /></div>
                )}
                {vehicle?.fitmentUnverified && (
                    <p className="mt-2">
                        <FormattedMessage id="TEXT_VEHICLE_GENERIC_RESULTS" />
                    </p>
                )}
            </div>
        </div>
    );
}

export default React.memo(BlockFinder);
