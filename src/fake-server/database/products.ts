import catalog from '~/data/autogate-catalog.json';
import { IProduct } from '~/interfaces/product';
import { IShopCategory } from '~/interfaces/category';
import { prepareCategory } from '~/fake-server/endpoints/categories';
import { shopCategoriesList } from '~/fake-server/database/categories';

export const products: IProduct[] = catalog.products.map((part, index) => ({
    id: index + 1,
    name: part.name,
    excerpt: part.description,
    description: `<p>${part.description}</p>`,
    slug: part.slug,
    sku: part.sku,
    partNumber: '',
    stock: 'out-of-stock',
    price: part.price,
    compareAtPrice: null,
    images: part.images,
    badges: part.badges,
    rating: 0,
    reviews: 0,
    availability: 'out-of-stock',
    compatibility: 'unknown',
    brand: null,
    type: { slug: 'default', name: 'Default', attributeGroups: [] },
    attributes: [],
    options: [],
    tags: [],
    categories: part.categories
        .map((slug) => shopCategoriesList.find((category) => category.slug === slug))
        .filter((category): category is IShopCategory => !!category)
        .map((category) => prepareCategory(category)),
    customFields: {},
}));
