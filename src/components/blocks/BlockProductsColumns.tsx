import { useLocalize } from '~/services/i18n/localize';
// react
import React from 'react';
// application
import ProductCard from '~/components/shared/ProductCard';
import { IProduct } from '~/interfaces/product';

export interface IBlockProductsColumnsItem {
    title: string;
    products: IProduct[];
}

interface Props {
    columns: IBlockProductsColumnsItem[];
}

function BlockProductsColumns(props: Props) {
    const l10n = useLocalize();

    const { columns } = props;

    return (
        <div className="block block-products-columns">
            <div className="container">
                <div className="row">
                    {l10n(columns.map((column, columnIdx) => (
                        <div key={columnIdx} className="col-4">
                            <div className="block-products-columns__title">{l10n(column.title)}</div>
                            <div className="block-products-columns__list">
                                {l10n(column.products.map((product) => (
                                    <div key={product.id} className="block-products-columns__list-item">
                                        <ProductCard
                                            product={product}
                                            exclude={['actions', 'status-badge', 'features', 'buttons', 'meta']}
                                        />
                                    </div>
                                )))}
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(BlockProductsColumns);
