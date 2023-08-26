import { API } from "../API/API.js";


export const course = () => {
    const joinCourse = <HTMLButtonElement> document.getElementById("joinCourse");
    const courseSelector = <HTMLSelectElement> document.getElementById("courseSelector");
    
    const dateToApiFormat = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if the month is less than 10
        const day = date.getDate().toString().padStart(2, '0'); // Adding a leading zero if the day is less than 10
        return `${year}-${month}-${day} 00:00:00`;
    }
    
    joinCourse.onclick = () => {
        const course = courseSelector.value;
        const now = new Date();
        API.add("courseparticipations", JSON.stringify({
            user_id: API.getCookie("id"),
            course_id: course,
            participation_date_time: dateToApiFormat(now)
        }))
        const win = new Window;
        win.location = "/test.html";
        
    }
    
    API.getCourses().then(courses => {
        courseSelector.innerHTML = "";
        for(const course of courses) {
            const option = document.createElement("option");
            option.innerText = course.course_name.value;
            option.value = course.id.value;
            courseSelector.appendChild(option);
        }
    })
}