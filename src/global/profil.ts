import { API } from "../API/API.js";



export const profil = () => {
    const profilInfos = <HTMLDivElement> document.getElementById("user-infos");
    API.getUsers({id: API.getCookie("user_id")}).then(user => {
        const myUser = user[0];
        const name = <HTMLElement> profilInfos.getElementsByTagName("h2")[0];
        const role = <HTMLElement> profilInfos.getElementsByTagName("h4")[0];
        name.innerText = `${myUser.first_name.value} ${myUser.last_name.value}`;
        role.innerText = `${myUser.role.value}`; 
    })
}