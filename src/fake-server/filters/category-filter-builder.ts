/* eslint-disable import/prefer-default-export,class-methods-use-this */

// application
import { AbstractFilterBuilder } from '~/fake-server/filters/abstract-filter-builder';
import { ICategoryFilter } from '~/interfaces/filter';
import { IProduct } from '~/interfaces/product';
import { IShopCategory } from '~/interfaces/category';
import { prepareCategory } from '~/fake-server/endpoints/categories';
import { shopCategoriesList, shopCategoriesTree } from '~/fake-server/database/categories';

export class CategoryFilterBuilder extends AbstractFilterBuilder {
    private value: string | null = null;

    private items: IShopCategory[] = [];

    test(product: IProduct): boolean {
        const slug = this.value;
        if (!slug) return true;

        return product.categories?.some((category) => {
            let item: IShopCategory | null = category;
            while (item) {
                if (item.slug === slug) return true;
                item = item.parent || null;
            }
            return false;
        }) || false;
    }

    makeItems(products: IProduct[], value: string): void {
        this.value = value === undefined ? null : value;

        const category = shopCategoriesList.find((x) => x.slug === value);

        if (category) {
            this.items = [prepareCategory(category, 1)];
        } else {
            this.items = shopCategoriesTree.map((x) => prepareCategory(x));
        }
    }

    calc(): void {}

    build(): ICategoryFilter {
        return {
            type: 'category',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value,
        };
    }
}
