
// application
import { IMainMenuLink } from '~/interfaces/main-menu-link';

const dataHeaderMainMenu: IMainMenuLink[] = [
    { title: 'Home', url: '/' },
    { title: 'Shop', url: '/catalog/products' /*, submenu: { type: 'menu', links: [
        { title: 'Categories', url: '/catalog' },
        { title: 'Vehicle Catalog', url: '/vehicle-catalog' },
        { title: 'Brakes', url: '/catalog/products?filter_query=Brake' },
        { title: 'Filters', url: '/catalog/products?filter_query=Filter' },
        { title: 'Lighting', url: '/catalog/products?filter_query=Headlight' },
        { title: 'Motor Oil', url: '/catalog/products?filter_query=Motor%20Oil' },
    ] } */ },
     { title: 'Company updates', url: '/#company-updates' },
     { title: 'Account', url: '/account/login', submenu: { type: 'menu', links: [
        { title: 'Login', url: '/account/login' },
        { title: 'Track Order', url: '/track-order' },
       { title: 'Wishlist', url: '/wishlist' },
     ] } },
    { title: 'Pages', url: '/about-us', submenu: { type: 'menu', links: [
        { title: 'About Us', url: '/about-us' },
        { title: 'Contact Us', url: '/contact-us' },
        { title: 'Terms And Conditions', url: '/terms' },
        { title: 'FAQ', url: '/faq' },
    ] } },
];

export default dataHeaderMainMenu;
