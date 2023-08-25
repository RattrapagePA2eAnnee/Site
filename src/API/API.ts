import { Course } from "./APIObjects/Course.js";
import { CourseParticipation } from "./APIObjects/CourseParticipation.js";
import { Plane } from "./APIObjects/Plane.js";
import { User } from "./APIObjects/User.js";
import { Invoice } from "./APIObjects/Invoice.js";
import { Parking } from "./APIObjects/Parking.js";
import { Reservation } from "./APIObjects/Reservation.js";
import { Service } from "./APIObjects/Service.js";
import { ParkingReservation } from "./APIObjects/ParkingReservation.js";
import { PlaneReservation } from "./APIObjects/PlaneReservation.js";
import { ServiceReservation } from "./APIObjects/ServiceReservation.js";
import { Plane } from "./APIObjects/Plane.js";

export class API {
        static address = "https://api.aen.best";

        static login(email: string, password: string){
            try{
                const loginRequest = new XMLHttpRequest();
                loginRequest.open("POST", `${API.address}/connection`);
                loginRequest.onreadystatechange = () => {
                    if(loginRequest.readyState === 4){
                        if(loginRequest.status === 200){
                            const userInfos = JSON.parse(loginRequest.responseText);
                            if(userInfos.success == true){
                                const userToken = userInfos.connection.connection.token;
                                document.cookie = `token=${userToken}`;
                                const userId = userInfos.connection.connection.id;
                                document.cookie = `id=${userId}`;
                                const win: Window = window;
                                win.location = './test.html';
                            }
                        }
                    }
            }
            // loginRequest.setRequestHeader("Accept", "application/json")
            loginRequest.setRequestHeader("Content-type", "application/json");
            loginRequest.send(JSON.stringify({
                email: email, 
                password: password,
                origin: "website"
            }));
        } catch(e) {
            console.log(e);
        }
        }


        static getUsers(body?: Object): Promise<Array<User>> {
                return new Promise((resolve, reject) => {
                    const getUsersRequest = new XMLHttpRequest();
                getUsersRequest.open("POST", `${API.address}/getusers`);
                getUsersRequest.onreadystatechange = () => {
                    if(getUsersRequest.readyState === 4){
                        if(getUsersRequest.status === 200){
                            const response = JSON.parse(getUsersRequest.responseText);
                            if(response.success == true){
                                const users: Array<User> = [];
                                response.users.forEach((user: any) => {
                                    users.push(new User(
                                        user.id,
                                        user.last_name,
                                        user.first_name,
                                        user.email,
                                        user.role,
                                        user.subscription_status,
                                        user.profile_picture,
                                        user.birth_date,
                                        user.address,
                                        user.postal_code,
                                        user.city
                                    ));
                                    resolve(users);
                                })
                            } else {
                                reject(new Error(response.error));
                            }
                        }
                    }
            }
            // loginRequest.setRequestHeader("Accept", "application/json")
            getUsersRequest.setRequestHeader("Content-type", "application/json");
            getUsersRequest.send(JSON.stringify(body));
                })
        }

        static getCourses(): Promise<Array<Course>> {
            return new Promise((resolve, reject) => {
                const getCoursesRequest = new XMLHttpRequest();
            getCoursesRequest.open("POST", `${API.address}/getcourses`);
            getCoursesRequest.onreadystatechange = () => {
                if(getCoursesRequest.readyState === 4){
                    if(getCoursesRequest.status === 200){
                        const response = JSON.parse(getCoursesRequest.responseText);
                        if(response.success == true){
                            const courses: Array<Course> = [];
                            response.courses.forEach((course: any) => {
                                courses.push(new Course(
                                    course.id,
                                    course.course_name,
                                    course.registration_price
                                ));
                                resolve(courses);
                            })
                        } else {
                            reject(new Error(response.error));
                        }
                    }
                }
        }
        // loginRequest.setRequestHeader("Accept", "application/json")
        getCoursesRequest.setRequestHeader("Content-type", "application/json");
        getCoursesRequest.send();
            })
    }

    static getInvoices(): Promise<Array<Invoice>> {
        return new Promise((resolve, reject) => {
            const getInvoicesRequest = new XMLHttpRequest();
        getInvoicesRequest.open("POST", `${API.address}/getinvoices`);
        getInvoicesRequest.onreadystatechange = () => {
            if(getInvoicesRequest.readyState === 4){
                if(getInvoicesRequest.status === 200){
                    const response = JSON.parse(getInvoicesRequest.responseText);
                    if(response.success == true){
                        const invoices: Array<Invoice> = [];
                        response.invoices.forEach((invoice: any) => {
                            invoices.push(new Invoice(
                                invoice.id,
                                invoice.total_price,
                                invoice.invoice_date_time,
                                invoice.invoice_link,
                                invoice.user_id
                            ));
                            resolve(invoices);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getInvoicesRequest.setRequestHeader("Content-type", "application/json");
    getInvoicesRequest.send();
        })
}
    static getParkings(): Promise<Array<Parking>> {
        return new Promise((resolve, reject) => {
            const getParkingsRequest = new XMLHttpRequest();
        getParkingsRequest.open("POST", `${API.address}/getparkings`);
        getParkingsRequest.onreadystatechange = () => {
            if(getParkingsRequest.readyState === 4){
                if(getParkingsRequest.status === 200){
                    const response = JSON.parse(getParkingsRequest.responseText);
                    if(response.success == true){
                        const parkings: Array<Parking> = [];
                        response.parkings.forEach((parking: any) => {
                            parkings.push(new Parking(
                                parking.id,
                                parking.parking_number,
                                parking.type,
                                parking.length,
                                parking.wingspan
                            ));
                            resolve(parkings);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getParkingsRequest.setRequestHeader("Content-type", "application/json");
    getParkingsRequest.send();
        })
}

    static getReservations(): Promise<Array<Reservation>> {
        return new Promise((resolve, reject) => {
            const getReservationsRequest = new XMLHttpRequest();
        getReservationsRequest.open("POST", `${API.address}/getreservations`);
        getReservationsRequest.onreadystatechange = () => {
            if(getReservationsRequest.readyState === 4){
                if(getReservationsRequest.status === 200){
                    const response = JSON.parse(getReservationsRequest.responseText);
                    if(response.success == true){
                        const reservations: Array<Reservation> = [];
                        response.reservations.forEach((reservation: any) => {
                            reservations.push(new Reservation(
                                reservation.id,
                                reservation.reservation_date,
                                reservation.total_price,
                                reservation.user_id,
                                reservation.status
                            ));
                            resolve(reservations);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getReservationsRequest.setRequestHeader("Content-type", "application/json");
    getReservationsRequest.send();
        })
    }

    static getServices(): Promise<Array<Service>> {
        return new Promise((resolve, reject) => {
            const getServicesRequest = new XMLHttpRequest();
        getServicesRequest.open("POST", `${API.address}/getservices`);
        getServicesRequest.onreadystatechange = () => {
            if(getServicesRequest.readyState === 4){
                if(getServicesRequest.status === 200){
                    const response = JSON.parse(getServicesRequest.responseText);
                    if(response.success == true){
                        const services: Array<Service> = [];
                        response.services.forEach((service: any) => {
                            services.push(new Service(
                                service.id,
                                service.service_name,
                                service.description,
                                service.price
                            ));
                            resolve(services);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getServicesRequest.setRequestHeader("Content-type", "application/json");
    getServicesRequest.send();
        })
    }

    static getParkingReservation(): Promise<Array<ParkingReservation>> {
        return new Promise((resolve, reject) => {
            const getParkingReservationsRequest = new XMLHttpRequest();
        getParkingReservationsRequest.open("POST", `${API.address}/getparkingreservations`);
        getParkingReservationsRequest.onreadystatechange = () => {
            if(getParkingReservationsRequest.readyState === 4){
                if(getParkingReservationsRequest.status === 200){
                    const response = JSON.parse(getParkingReservationsRequest.responseText);
                    if(response.success == true){
                        const parkingReservations: Array<ParkingReservation> = [];
                        response.parkingreservations.forEach((parkingReservation: any) => {
                            parkingReservations.push(new ParkingReservation(
                                parkingReservation.reservation_id,
                                parkingReservation.parking_id,
                                parkingReservation.start_time,
                                parkingReservation.end_time,
                                parkingReservation.price,
                                parkingReservation.status
                            ));
                            resolve(parkingReservations);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getParkingReservationsRequest.setRequestHeader("Content-type", "application/json");
    getParkingReservationsRequest.send();
        })
    }

    static getPlaneReservation(): Promise<Array<PlaneReservation>> {
        return new Promise((resolve, reject) => {
            const getPlaneReservationRequest = new XMLHttpRequest();
        getPlaneReservationRequest.open("POST", `${API.address}/getplanereservations`);
        getPlaneReservationRequest.onreadystatechange = () => {
            if(getPlaneReservationRequest.readyState === 4){
                if(getPlaneReservationRequest.status === 200){
                    const response = JSON.parse(getPlaneReservationRequest.responseText);
                    if(response.success == true){
                        const planeReservations: Array<PlaneReservation> = [];
                        response.planereservations.forEach((planeReservation: any) => {
                            planeReservations.push(new PlaneReservation(
                                planeReservation.reservation_id,
                                planeReservation.parking_id,
                                planeReservation.start_time,
                                planeReservation.end_time,
                                planeReservation.price,
                                planeReservation.intstructor_id,
                                planeReservation.status,
                                planeReservation.type
                            ));
                            resolve(planeReservations);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getPlaneReservationRequest.setRequestHeader("Content-type", "application/json");
    getPlaneReservationRequest.send();
        })
    }

    static getServiceReservation(): Promise<Array<ServiceReservation>> {
        return new Promise((resolve, reject) => {
            const getServiceReservationRequest = new XMLHttpRequest();
        getServiceReservationRequest.open("POST", `${API.address}/getservicereservations`);
        getServiceReservationRequest.onreadystatechange = () => {
            if(getServiceReservationRequest.readyState === 4){
                if(getServiceReservationRequest.status === 200){
                    const response = JSON.parse(getServiceReservationRequest.responseText);
                    if(response.success == true){
                        const serviceReservations: Array<ServiceReservation> = [];
                        response.servicereservations.forEach((serviceReservation: any) => {
                            serviceReservations.push(new ServiceReservation(
                                serviceReservation.reservation_id,
                                serviceReservation.service_id,
                                serviceReservation.status
                            ));
                            resolve(serviceReservations);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }
    // loginRequest.setRequestHeader("Accept", "application/json")
    getServiceReservationRequest.setRequestHeader("Content-type", "application/json");
    getServiceReservationRequest.send();
        })
    }


    static getCourseParticipation(): Promise<Array<CourseParticipation>> {
        return new Promise((resolve, reject) => {
            const getCourseParticipationRequest = new XMLHttpRequest();
        getCourseParticipationRequest.open("POST", `${API.address}/getcourseparticipations`);
        getCourseParticipationRequest.onreadystatechange = () => {
            if(getCourseParticipationRequest.readyState === 4){
                if(getCourseParticipationRequest.status === 200){
                    const response = JSON.parse(getCourseParticipationRequest.responseText);
                    if(response.success == true){
                        const coursesParticipations: Array<CourseParticipation> = [];
                        response.courseparticipations.forEach((courseParticipation: any) => {
                            coursesParticipations.push(new CourseParticipation(
                                courseParticipation.user_id,
                                courseParticipation.course_id,
                                courseParticipation.participation_date_time,
                                courseParticipation.status
                            ));
                            resolve(coursesParticipations);
                        })
                    } else {
                        reject(new Error(response.error));
                    }
                }
            }
    }

    
    // loginRequest.setRequestHeader("Accept", "application/json")
    getCourseParticipationRequest.setRequestHeader("Content-type", "application/json");
    getCourseParticipationRequest.send();
        })
}

static getPlanes(): Promise<Array<Plane>> {
    return new Promise((resolve, reject) => {
        const getPlanesRequest = new XMLHttpRequest();
    getPlanesRequest.open("POST", `${API.address}/getplanes`);
    getPlanesRequest.onreadystatechange = () => {
        if(getPlanesRequest.readyState === 4){
            if(getPlanesRequest.status === 200){
                const response = JSON.parse(getPlanesRequest.responseText);
                if(response.success == true){
                    const planes: Array<Plane> = [];
                    response.planes.forEach((plane: any) => {
                        planes.push(new Plane(
                            plane.id,
                            plane.picture,
                            plane.horometer,
                            plane.plane_name,
                            plane.plane_type,
                            plane.hourly_price
                        ));
                        resolve(planes);
                    });
                } else {
                    reject(new Error(response.error));
                }
            }
        }
        getPlanesRequest.setRequestHeader("Content-type", "application/json");
        getPlanesRequest.send();
    });
    }

    static edit(route: string, id: any, body: string) {
            try{
                const editRequest = new XMLHttpRequest();
                editRequest.open("PATCH", `${API.address}/${route}/${id}`);
                editRequest.onreadystatechange = () => {
                    if(editRequest.readyState === 4){
                        if(editRequest.status === 200){
                            const userInfos = JSON.parse(editRequest.responseText);
                            if(userInfos.success == true){
                                return true;
                            }
                        }
                    }
            }
            // loginRequest.setRequestHeader("Accept", "application/json")
            editRequest.setRequestHeader("Content-type", "application/json");
            editRequest.send(body);
        } catch(e) {
            console.log(e);
        }
    }

    static add(route: string, body: string) {
            try{
                const addRequest = new XMLHttpRequest();
                addRequest.open("POST", `${API.address}/${route}`);
                addRequest.onreadystatechange = () => {
                    if(addRequest.readyState === 4){
                        if(addRequest.status === 200){
                            const userInfos = JSON.parse(addRequest.responseText);
                            if(userInfos.success == true){
                                return true;
                            }
                        }
                    }
            }
            // loginRequest.setRequestHeader("Accept", "application/json")
            addRequest.setRequestHeader("Content-type", "application/json");
            addRequest.send(body);
        } catch(e) {
            console.log(e);
        }
    }

    static delete(route: string, id: any) {
        try{
            const deleteRequest = new XMLHttpRequest();
            deleteRequest.open("DELETE", `${API.address}/${route}/${id}`);
            deleteRequest.onreadystatechange = () => {
                if(deleteRequest.readyState === 4){
                    if(deleteRequest.status === 200){
                        const userInfos = JSON.parse(deleteRequest.responseText);
                        if(userInfos.success == true){
                            return true;
                        }
                    }
                }
        }
        // loginRequest.setRequestHeader("Accept", "application/json")
        deleteRequest.setRequestHeader("Content-type", "application/json");
        deleteRequest.send();
    } catch(e) {
        console.log(e);
    }
    }

    static getPlaneDisponibility(body: Object): Promise<boolean> {

            const planeDispoRequest = new XMLHttpRequest();
            return new Promise((resolve) => {
                planeDispoRequest.open("POST", `${API.address}/planedisponibility`);
                planeDispoRequest.onreadystatechange = () => {
                    if(planeDispoRequest.readyState === 4){
                        if(planeDispoRequest.status === 200){
                            const planeInfos = JSON.parse(planeDispoRequest.responseText);
                            if(planeInfos.success == true){
                                    resolve(true);
                            } else {
                                resolve(false);
                            }
                        }
                    }
                }
                planeDispoRequest.setRequestHeader("Content-type", "application/json");
                planeDispoRequest.send(JSON.stringify(body));
            });
    }

    static getInstructorDisponibility(body: Object): Promise<boolean> {

        const planeDispoRequest = new XMLHttpRequest();
        return new Promise((resolve) => {
            planeDispoRequest.open("POST", `${API.address}/instructordisponibility`);
            planeDispoRequest.onreadystatechange = () => {
                if(planeDispoRequest.readyState === 4){
                    if(planeDispoRequest.status === 200){
                        const planeInfos = JSON.parse(planeDispoRequest.responseText);
                        if(planeInfos.success == true){
                                resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
            }
            planeDispoRequest.setRequestHeader("Content-type", "application/json");
            planeDispoRequest.send(JSON.stringify(body));
        });
}

    static createPlaneReservation(body: Object) {
        const planeReservationRequest = new XMLHttpRequest();
        return new Promise(resolve => {
            planeReservationRequest.open("POST", `${API.address}/planereservations`);
            planeReservationRequest.onreadystatechange = () => {
                if(planeReservationRequest.readyState === 4) {
                    if(planeReservationRequest.status === 200) {
                        const planeReservations = JSON.parse(planeReservationRequest.responseText);
                        if(planeReservations.success == true){
                                resolve(true);
                        } else {
                            resolve(false);
                        }
                    }
                }
            }
            planeReservationRequest.setRequestHeader("Content-type", "application/json");
            planeReservationRequest.send(JSON.stringify(body));
        })
    }
}
