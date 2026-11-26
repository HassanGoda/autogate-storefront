import { IMobileMenuLink } from '~/interfaces/mobile-menu-link';
import mainMenu from './headerMainMenu';

const dataMobileMenuLinks: IMobileMenuLink[] = mainMenu.map(({ title, url, submenu }) => ({
    title,
    url,
    submenu: submenu?.type === 'menu' ? submenu.links : undefined,
}));

export default dataMobileMenuLinks;
