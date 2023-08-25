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
let courseParticipationListContent: HTMLElement;
//let invoiceListContent: HTMLElement;
let parkingListContent: HTMLElement;
let parkingReservationListContent: HTMLElement;
let planeListContent: HTMLElement;
let planeReservationListContent: HTMLElement;
//let reservationListContent: HTMLElement;
let serviceListContent: HTMLElement;
let serviceReservationListContent: HTMLElement;

const setListContent = async () => {
    userListContent = await gestionList(API.getUsers, "users");
    courseListContent = await gestionList(API.getCourses, "courses");
    courseParticipationListContent = await gestionList(API.getCourseParticipation, "coursesparticipations");
    //invoiceListContent = await gestionList(API.getInvoices, "invoice");
    parkingListContent = await gestionList(API.getParkings, "parkings");
    parkingReservationListContent = await gestionList(API.getParkingReservation, "parkingreservations");
    planeListContent = await gestionList(API.getPlanes, "planes");
    planeReservationListContent = await gestionList(API.getPlaneReservation, "planereservations");
    //reservationListContent = await gestionList(API.getReservations, "reservations");
    serviceListContent = await gestionList(API.getServices, "services");
    serviceReservationListContent = await gestionList(API.getServiceReservation, "servicereservations");
}

setListContent().then(() => {
    const layoutContainer = document.getElementById("layout-container");

    let userListLayout: Layout;
    let courseListLayout: Layout;
    let courseParticipationListLayout : Layout;
    //let invoiceListLayout : Layout;
    let parkingListLayout : Layout;
    let parkingReservationListLayout : Layout;
    let planeListLayout : Layout;
    let planeReservationListLayout : Layout;
    //let reservationListLayout : Layout;
    let serviceListLayout : Layout;
    let serviceReservationListLayout : Layout;


    if(layoutContainer) {
        userListLayout = new Layout("Users", ["Administration", "Management"], userListContent, layoutContainer);
        courseListLayout = new Layout("Courses", ["Administration", "Management"], courseListContent, layoutContainer);
        courseParticipationListLayout = new Layout("Course Participations", ["Administration", "Management"], courseParticipationListContent, layoutContainer);
        //invoiceListLayout = new Layout("Invoices", ["Administration", "Management"], invoiceListContent, layoutContainer);
        parkingListLayout = new Layout("Parkings", ["Administration", "Management"], parkingListContent, layoutContainer);
        parkingReservationListLayout = new Layout("Parking Reservations", ["Administration", "Management"], parkingReservationListContent, layoutContainer);
        planeListLayout = new Layout("Planes", ["Administration", "Management"], planeListContent, layoutContainer);
        planeReservationListLayout = new Layout("Plane Reservations", ["Administration", "Management"], planeReservationListContent, layoutContainer);
        //reservationListLayout = new Layout("Reservations", ["Administration", "Management"], reservationListContent, layoutContainer);
        serviceListLayout = new Layout("Services", ["Administration", "Management"], serviceListContent, layoutContainer);
        serviceReservationListLayout = new Layout("Service Reservations", ["Administration", "Management"], serviceReservationListContent, layoutContainer);

        const parkingLayout = new Layout("Parking", ["Reservation", "Prestations"], document.createElement("div"), layoutContainer);
        const newCourseLayout = new Layout("Start Course", ["Courses"], document.createElement("div"), layoutContainer);
        const reservationPlane = new Layout("Book Plane", ["Reservation"], htmlBookPlaneLayout ,layoutContainer, runScript);
        userListLayout.generate();
        courseListLayout.generate();
        courseParticipationListLayout.generate();
        //invoiceListLayout.generate();
        parkingListLayout.generate();
        parkingReservationListLayout.generate();
        planeListLayout.generate();
        planeReservationListLayout.generate();
        //reservationListLayout.generate();
        serviceListLayout.generate();
        serviceReservationListLayout.generate();
        parkingLayout.generate();
        newCourseLayout.generate();
        reservationPlane.generate();
        
        const menuContainer = document.getElementsByTagName("aside")[0];
    
    const menu = new LayoutSwitchMenu([
        new MenuSection(img, "Administration", [
            new MenuOption("Courses", courseListLayout),
            new MenuOption("Courses Participations", courseParticipationListLayout),
            //new MenuOption("Invoices", invoiceListLayout),
            new MenuOption("Parking", parkingListLayout),
            new MenuOption("Parking Reservations", parkingReservationListLayout),
            new MenuOption("Planes", planeListLayout),
            new MenuOption("Plane Reservations", planeReservationListLayout),
            //new MenuOption("Reservations", reservationListLayout),
            new MenuOption("Services", serviceListLayout),
            new MenuOption("Service Reservation", serviceReservationListLayout),
            new MenuOption("Users", userListLayout)
        ]),
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