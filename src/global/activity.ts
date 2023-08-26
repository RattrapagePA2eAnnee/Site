import { API } from "../API/API.js";
import { Plane } from "../API/APIObjects/Plane.js";
import { User } from "../API/APIObjects/User.js";
import { Popup } from "./Popup.js";

export const activity = () => {
    const activityInput = <HTMLSelectElement> document.getElementById("activitySelector");
    const dateInput = <HTMLInputElement> document.getElementById("date");
    const timeInput = <HTMLInputElement> document.getElementById("hour");
    const send = <HTMLButtonElement> document.getElementById("joinActivity");
    
    const dateToApiFormat = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if the month is less than 10
        const day = date.getDate().toString().padStart(2, '0'); // Adding a leading zero if the day is less than 10
        return `${year}-${month}-${day} 00:00:00`;
    }
    
    
    
    
    send.onclick = () => {
        const activity = activityInput.value;
        const time = new Date(Date.parse(`${dateInput.value} ${timeInput.value}:00`));
        const nextHour = time.getHours() + 1;
        const end_time = new Date(time);
        end_time.setHours(nextHour);
    
        API.getPlanes().then(planes => {
            API.getUsers({role: "instructor"}).then(instructors => {
                getAvailablePlanes(planes).then(availablePlanes => {
                    getAvailableInstructors(instructors).then(availableInstructors => {
                        if(availableInstructors.length > 0 && availablePlanes.length > 0) {
                            let price = 0;
                            let service_id = 0;
                            if(activity === "jump") {
                                price = 300;
                                service_id = 4;
                            } else {
                                price = 200;
                                service_id = 5;
                            }
    
                            API.addReservation(JSON.stringify({
                                total_price: 0,
                                user_id: API.getCookie("id")
                            })).then(reservation_id => {
                               API.add("servicereservations", 
                                    JSON.stringify({
                                    price: price,
                                    reservation_id: reservation_id,
                                    datetime: dateToApiFormat(time),
                                    service_id: service_id
                                }));
                                document.cookie = `prixTotal=${price};path=/`;
                                const iframe = document.createElement("iframe");
                                iframe.src = "/pay.html";
                                iframe.style.width = "100%";
                                iframe.style.height = "100%";
                                iframe.style.border = "none";
                                const paymentPopup = new Popup(iframe, "Payment");
                                paymentPopup.generate();
                            })
    
    
                        }
                    })
                })
            })
        })
    
        const getAvailablePlanes = async (planes: Array<Plane>): Promise<Array<Plane>> => {
            const available: Array<Plane> = [];
            for(const plane of planes) {
                if(await API.getPlaneDisponibility({
                    plane_id: plane.id.value,
                    start_time: dateToApiFormat(time),
                    end_time: dateToApiFormat(end_time)
                })) {
                    available.push(plane);
                }
            }
            return new Promise(resolve => {
                resolve(available);
            })
        }
    
        const getAvailableInstructors = async (instructors: Array<User>): Promise<Array<User>> => {
            const available: Array<User> = [];
            for(const instructor of instructors) {
                if(await API.getInstructorDisponibility({
                    instructor_id: instructor.id.value,
                    start_time: dateToApiFormat(time),
                    end_time: dateToApiFormat(end_time)
                })) {
                    available.push(instructor);
                }
            }
            return new Promise(resolve => {
                resolve(available);
            })
        }
    }
    
    
}