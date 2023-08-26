import { API } from "../API/API.js";
import { Plane } from "../API/APIObjects/Plane.js";
import { User } from "../API/APIObjects/User.js";



let planes: Array<Plane>;
let instructors: Array<User>;
let availablePlanes: Array<Plane>;
let availableInstructors: Array<User>;

const getInfos = async () => {
    planes = await API.getPlanes()
    instructors = await API.getUsers({
        role: "instructor"
    });
    return;
}

const getPlaneDisponibility = async (plane: Plane, startDate: string, endDate: string) => {
    const dispo = await API.getPlaneDisponibility({
        plane_id: plane.id.value,
        start_time: startDate,
        end_time: endDate
    });
    if(dispo) {
        availablePlanes.push(plane)
    }
}

const getInstructorDisponibility = async (instructor: User, startDate: string, endDate: string) => {
    if(await API.getInstructorDisponibility({
        instructor_id: instructor.id.value,
        start_time: startDate,
        end_time: endDate
    })) {
        availableInstructors.push(instructor);
    }
}

export const runScript = () => {
    getInfos().then(() => {
        const planeSelector = <HTMLSelectElement> document.getElementById("selectPlane");
        const instructorSelector = <HTMLSelectElement> document.getElementById("selectInstructor");

        const checkbox = <HTMLInputElement> document.getElementById("withInstructor");
        const startDate = <HTMLInputElement> document.getElementById("startDate");
        const startHour = <HTMLInputElement> document.getElementById("startHour");
        const endDate = <HTMLInputElement> document.getElementById("endDate");
        const endHour = <HTMLInputElement> document.getElementById("endHour");

        let fullStartTime: string;
        let fullEndTime: string;

        const checkDatesSet = () => {
            if(startDate.value === "" || startHour.value === "" || endDate.value === "" || endHour.value === "") {
                checkbox.hidden = true;
                    planeSelector.hidden = true;
                    instructorSelector.hidden = true;
                
            } else {
                fullStartTime = `${startDate.value} ${startHour.value}:00`;
                fullEndTime = `${endDate.value} ${endHour.value}:00`;
                checkbox.hidden = false;
                    planeSelector.hidden = false
                    planeSelector.innerHTML = "";
                    setSelectorForAvailablePlanes();
                if(checkbox.checked) {
                    instructorSelector.hidden = false;
                    instructorSelector.innerHTML = "";
                }
            }
        }

        startDate.addEventListener("input", checkDatesSet);
        startHour.addEventListener("input", checkDatesSet);
        endDate.addEventListener("input", checkDatesSet);
        endHour.addEventListener("input", checkDatesSet);


        checkbox.onclick = () => {
            if(instructorSelector) {
                if(checkbox.checked) {
                        instructorSelector.hidden = false;
                        setSelectorForAvailableInstructors();
                        
                } else {
                    instructorSelector.hidden = true;
                } 
            }
        }
        const setSelectorForAvailablePlanes = () => {
            availablePlanes = [];
            const updateAvailablePlanes = async () => {
                for(const plane of planes) {
                    await getPlaneDisponibility(plane, fullStartTime , fullEndTime);
                }
            }
        
            updateAvailablePlanes().then(() => {
                for(const plane of availablePlanes) {
                    const option = document.createElement("option");
                    option.innerText = plane.plane_name.value;
                    option.value = plane.id.value;
                    planeSelector?.appendChild(option);
                }
            })
        }

        const setSelectorForAvailableInstructors = () => {
            availableInstructors = [];
            const updateAvailableInstructors = async () => {
                for(const instructor of instructors) {
                    await getInstructorDisponibility(instructor, fullStartTime, fullEndTime);
                }
            }

            updateAvailableInstructors().then(() => {
                for(const instructor of availableInstructors) {
                    const option = document.createElement("option");
                    option.innerText = `${instructor.first_name.value} ${instructor.last_name.value}`;
                    option.value = instructor.id.value;
                    instructorSelector?.appendChild(option);
                }
            })
        }
        const sendButton = <HTMLButtonElement> document.getElementById("bookPlane");
        if(sendButton) {
            sendButton.onclick = () => {
                const maxFlyTime = ((new Date(Date.parse(fullEndTime)).getTime() - new Date(Date.parse(fullStartTime)).getTime())) / (60 * 60 * 1000);
                let price: number = 0;
                for(const plane of planes) {
                    if(plane.id.value = planeSelector.value) {
                        price = parseFloat(plane.hourly_price.value) * maxFlyTime;
                    }
                }

                let body = {
                    reservation_id: 10,
                    plane_id: planeSelector.value,
                    start_time: fullStartTime,
                    end_time: fullEndTime,
                    price: price,
                    instructor_id: checkbox.checked ? instructorSelector.value : null,
                    type: ""
                };

                if(checkbox.checked) {
                    body.type = "school";
                } else {
                    body.type = "private";
                }
                API.createPlaneReservation(body);
            }
        }
    })
}