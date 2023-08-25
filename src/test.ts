import { LayoutSwitchMenu } from "./global/LayoutSwitchMenu.js";
import { API } from "./API/API.js";
import { MenuOption } from "./components/menu/MenuOption.js";
import { MenuSection } from "./components/menu/MenuSection.js";
import { GestionList } from "./global/GestionList.js";
import { Layout } from "./global/Layout.js";
import { htmlBookPlaneLayout } from "./global/pureHtmlLayouts.js";
import { runScript } from "./global/bookPlane.js";

const img = "/global/img/facebook.svg"
let userListContent: HTMLElement;
let courseListContent: HTMLElement;

const setListContent = async () => {
    userListContent = await gestionList(API.getUsers, "users");
    courseListContent = await gestionList(API.getCourses, "courses");
}

setListContent().then(() => {
    const layoutContainer = document.getElementById("layout-container");

    let userListLayout: Layout;
    let courseListLayout: Layout;

    if(layoutContainer) {
        userListLayout = new Layout("Users", ["Administration", "Management"], userListContent, layoutContainer);
        courseListLayout = new Layout("Courses", ["Administration", "Management"], courseListContent, layoutContainer);
        const parkingLayout = new Layout("Parking", ["Reservation", "Prestations"], document.createElement("div"), layoutContainer);
        const newCourseLayout = new Layout("Start Course", ["Courses"], document.createElement("div"), layoutContainer);
        const reservationPlane = new Layout("Book Plane", ["Reservation"], htmlBookPlaneLayout ,layoutContainer, runScript);
        userListLayout.generate();
        courseListLayout.generate();
        parkingLayout.generate();
        newCourseLayout.generate();
        reservationPlane.generate();
        
        const menuContainer = document.getElementsByTagName("aside")[0];
    
    const menu = new LayoutSwitchMenu([
        new MenuSection(img, "Administration", [
            new MenuOption("Users", userListLayout),
            new MenuOption("Courses", courseListLayout)
        ]),
        new MenuOption("Parking", parkingLayout),
        new MenuSection(img, "Courses", [
            new MenuOption("Start course", newCourseLayout)
        ]),
        new MenuSection(img, "Reservation", [
            new MenuOption("Plane", reservationPlane)
        ])

    ], menuContainer);
    
    menu.generate();
    }
})

async function gestionList(APICall: Function, route: string): Promise<HTMLElement> {
        const apiObjects = await APICall();
        return new Promise(resolve => {
            const objectList = new GestionList(apiObjects, route);
            objectList.generate();
            resolve(objectList.getHtml());
        })
}