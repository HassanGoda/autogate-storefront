import carBrands from '~/data/autogate-car-brands.json';
import { vehicles } from '~/fake-server/database/vehicles';
import { translateText } from '~/services/i18n/localize';
// application
import { AbstractFilterBuilder } from '~/fake-server/filters/abstract-filter-builder';
import { CategoryFilterBuilder } from '~/fake-server/filters/category-filter-builder';
import { getNextReviewId, reviews } from '~/fake-server/database/reviews';
import { IProductsList, IProduct } from '~/interfaces/product';
import { IReview } from '~/interfaces/review';
import { prepareCategory } from '~/fake-server/endpoints/categories';
import { products as dbProducts } from '~/fake-server/database/products';
import { shopCategoriesList } from '~/fake-server/database/categories';
import { VehicleFilterBuilder } from '~/fake-server/filters/vehicle-filter-builder';
import {
    clone,
    delayResponse,
    error,
    makeCursorBasedNavigation,
    makePageBasedNavigation,
} from '~/fake-server/utils';
import {
    IFilterValues,
    IListOptions,
    INavigation,
    IReviewsList,
} from '~/interfaces/list';
import {
    IAddProductReviewData,
    IGetSearchSuggestionsOptions,
    IGetSearchSuggestionsResult,
} from '~/api/base';

function getProducts(shift: number, categorySlug: string | null = null): IProduct[] {
    const list = categorySlug
        ? dbProducts.filter((product) => product.categories?.some((category) => category.slug === categorySlug))
        : dbProducts;
    const offset = list.length ? shift % list.length : 0;

    return [...list.slice(offset), ...list.slice(0, offset)];
}

function normalizeSearch(value: string): string {
    return value.normalize('NFKC').toLowerCase().trim()
        .replace(/[أإآٱ]/g, 'ا')
        .replace(/[ً-ْـ]/g, '')
        .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
        .replace(/ى/g, 'ي').replace(/ة/g, 'ه');
}

function matchesSearch(value: string, query: string): boolean {
    const needle = normalizeSearch(query);
    return [value, translateText(value, 'ar')].some((text) => normalizeSearch(text).includes(needle));
}

function matchesProduct(product: IProduct, query: string): boolean {
    const compact = (value: string) => normalizeSearch(value).replace(/[\s._/-]+/g, '');
    const code = compact(query);
    const numbers = [product.sku, product.partNumber];
    return matchesSearch(product.name, query) || (!!code && numbers.some(
        (number) => !!number && compact(number).includes(code),
    ));
}

export function getProductsList(
    options: IListOptions = {},
    filterValues: IFilterValues = {},
): Promise<IProductsList> {
    const filters: AbstractFilterBuilder[] = [
        new CategoryFilterBuilder('category', 'Categories'),
        new VehicleFilterBuilder('vehicle', 'Vehicle'),
    ];

    let products = filterValues.query ? dbProducts.filter((product) => matchesProduct(product, filterValues.query)) : dbProducts.slice(0);

    if (filterValues.make) {
        const make = carBrands.find((brand) => brand.key === filterValues.make);
        const vehicleIds = new Set(vehicles
            .filter((vehicle) => make && !vehicle.fitmentUnverified
                && normalizeSearch(vehicle.make) === normalizeSearch(make.name))
            .map((vehicle) => vehicle.id));

        products = products.filter((product) => Array.isArray(product.compatibility)
            && product.compatibility.some((id) => vehicleIds.has(id)));
    }

    filters.forEach((filter) => filter.makeItems(products, filterValues[filter.slug]));

    // Calculate items count for filter values.
    filters.forEach((filter) => filter.calc(filters));

    // Apply filters to products list.
    products = products.filter((product) => filters.reduce<boolean>((mr, filter) => mr && filter.test(product), true));

    const sort = options?.sort || 'default';

    // Sort items array.
    products = products.sort((a, b) => {
        if (['name_asc', 'name_desc'].includes(sort)) {
            if (a.name === b.name) {
                return 0;
            }

            return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1);
        }

        return 0;
    });

    // General
    const limit = options?.limit || 16;
    let result: [IProduct[], INavigation];

    if (filterValues.category === 'interior-parts') {
        // Cursor based navigation
        result = makeCursorBasedNavigation(
            products,
            limit,
            options?.after,
            options?.before,
            (product) => product.id.toString(),
        );
    } else {
        // Page based navigation
        result = makePageBasedNavigation(products, limit, options?.page || 1);
    }

    const [items, navigation] = result;

    return delayResponse(Promise.resolve({
        items,
        sort,
        navigation,
        filters: filters.map((x) => x.build()),
    }), 350);
}

export function getProductBySlug(slug: string): Promise<IProduct> {
    const product = dbProducts.find((x) => x.slug === slug);

    if (!product) {
        return error('Page Not Found');
    }

    return Promise.resolve(clone(product));
}

export function getProductReviews(productId: number, options?: IListOptions): Promise<IReviewsList> {
    let items = reviews.slice(0);

    items.sort((a, b) => {
        if (a.date > b.date) {
            return -1;
        }
        if (a.date < b.date) {
            return 1;
        }

        return 0;
    });

    const limit = options?.limit || 8;
    const sort = options?.sort || 'default';

    // Cursor based navigation
    // const [chunk, navigation] = makeCursorBasedNavigation(
    //     items,
    //     limit,
    //     options?.after,
    //     options?.before,
    //     (review) => review.id.toString(),
    // );
    // Page based navigation
    const [chunk, navigation] = makePageBasedNavigation(items, limit, options?.page || 1);

    items = chunk;

    return Promise.resolve({
        items,
        sort,
        navigation,
    });
}

export function addProductReview(productId: number, data: IAddProductReviewData): Promise<IReview> {
    const review: IReview = {
        id: getNextReviewId(),
        date: (new Date()).toISOString().substr(0, 10),
        author: data.author,
        avatar: '/images/avatars/avatar-2.webp',
        rating: data.rating,
        content: data.content,
    };

    reviews.push(review);

    return delayResponse(Promise.resolve(review));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getProductAnalogs(productId: number): Promise<IProduct[]> {
    const slugs: string[] = [
        'sunset-brake-kit',
        'specter-brake-kit',
        'brake-kit',
    ];
    const analogs: IProduct[] = dbProducts.filter((x) => slugs.includes(x.slug));

    return Promise.resolve(clone(analogs));
}

export function getRelatedProducts(productId: number, limit: number): Promise<IProduct[]> {
    return Promise.resolve(clone(dbProducts.slice(0, limit)));
}

export function getFeaturedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    return delayResponse(Promise.resolve(clone(getProducts(0, categorySlug).sort((a, b) => {
        const score = (product: IProduct) => product.slug.startsWith('ag-') ? (product.badges?.includes('featured') ? 2 : 1) : 0;
        return score(b) - score(a);
    }).slice(0, limit))), 1000);
}

export function getPopularProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    return delayResponse(Promise.resolve(clone(getProducts(6, categorySlug).slice(0, limit))), 1000);
}

export function getTopRatedProducts(categorySlug: string | null, limit: number): Promise<IProduct[]> {
    return delayResponse(Promise.resolve(clone(getProducts(12, categorySlug).slice(0, limit))), 1000);
}

export function getSpecialOffers(limit: number): Promise<IProduct[]> {
    return delayResponse(Promise.resolve(clone(getProducts(0).filter((item) => item.compareAtPrice && item.slug.startsWith('ag-')).slice(0, limit))), 1000);
}

export function getLatestProducts(limit: number): Promise<IProduct[]> {
    return Promise.resolve(clone(dbProducts.slice(0, limit)));
}

export function getSearchSuggestions(
    query: string,
    options?: IGetSearchSuggestionsOptions,
): Promise<IGetSearchSuggestionsResult> {
    const optionsVal = {
        limitProducts: 4,
        limitCategories: 4,
        ...options,
    };

    const resultProducts = dbProducts.filter((x) => matchesProduct(x, query));
    const resultCategories = shopCategoriesList.filter((x) => matchesSearch(x.name, query));

    return Promise.resolve({
        products: resultProducts.slice(0, optionsVal.limitProducts),
        categories: resultCategories.slice(0, optionsVal.limitCategories).map((x) => prepareCategory(x)),
    });
}
