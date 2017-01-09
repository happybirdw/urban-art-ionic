import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { AroundPage } from '../pages/around/around';
import { WorksPage } from '../pages/works/works';
import { FavoritePage } from '../pages/favorite/favorite';
import { AddPage } from '../pages/add/add';
import { WorkPage } from '../pages/work/work';


export class Routes {
    static HOME: string = "home";
    static LOGIN: string = "login";
    static SIGNUP: string = "signup";
    static TABS: string = "tabs";
    static AROUND: string = "around";
    static WORKS: string = "works";
    static FAVORITE: string = "favorite";
    static ADD: string = "add";
    static WORK: string = "work";

    static pages = {
        [Routes.HOME]: HomePage,
        [Routes.LOGIN]: LoginPage,
        [Routes.SIGNUP]: SignupPage,
        [Routes.TABS]: TabsPage,
        [Routes.AROUND]: AroundPage,
        [Routes.WORKS]: WorksPage,
        [Routes.FAVORITE]: FavoritePage,
        [Routes.ADD]: AddPage,
        [Routes.WORK]: WorkPage,
    };

    static getPage(id) {
        const route = Routes.pages[id];
        return route;
    }

    static getRootPage(autenticated) {
        let root = (autenticated) ? Routes.getPage(Routes.TABS) : Routes.getPage(Routes.HOME);
        return root;
    }

    static getPages () {
        const pages = [];
        for (var id in Routes.pages) {
            pages.push(Routes.pages[id]);
        }
        return pages;
    }

    static getDeepLinkerConfig () {
        const config = { links: [] };
        for (var id in Routes.pages) {
            config.links.push({ component: Routes.pages[id], name: id});
        }
        return config;
    }    

}