import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// third-party
import { FormattedMessage } from 'react-intl';
// application
import { IProductAttributeGroup } from '~/interfaces/product';

interface Props {
    groups: IProductAttributeGroup[];
}

function Specification(props: Props) {
    const l10n = useLocalize();

    const { groups } = props;

    return (
        <div className="spec">
            {l10n(groups.map((group, groupIndex) => (
                <div key={groupIndex} className="spec__section">
                    <h4 className="spec__section-title">{l10n(group.name)}</h4>
                    {l10n(group.attributes.map((attribute, attributeIndex) => (
                        <div key={attributeIndex} className="spec__row">
                            <div className="spec__name">{l10n(attribute.name)}</div>
                            <div className="spec__value">
                                {l10n(attribute.values.map((x) => l10n(x.name)).join(', '))}
                            </div>
                        </div>
                    )))}
                </div>
            )))}
            <div className="spec__disclaimer">
                <FormattedMessage id="TEXT_PRODUCT_DISCLAIMER" />
            </div>
        </div>
    );
}

export default Specification;
