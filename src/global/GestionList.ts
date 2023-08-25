import { API } from "../API/API.js";
import { EmailInput } from "../components/inputs/EmailInput.js";
import { NameInput } from "../components/inputs/NameInput.js";
import { APIObject } from "./APIObject.js";
import { Popup } from "./Popup.js";
import { Input, Form } from "./form/Form.js";

export class GestionList<T extends APIObject> {
    elements: Array<T>;
    html: HTMLDivElement;
    route: string;
    filteredElements: Array<T> | null;

    constructor(elements: Array<T>, route: string) {
        this.elements = elements;
        this.route = route;
        this.html = document.createElement("div");
        this.filteredElements = null;
    }

    generate(): void {

        const cssScript = document.createElement("link");
        cssScript.rel="stylesheet";
        cssScript.href="/global/css/list.css";
        document.getElementsByTagName("head")[0].appendChild(cssScript);

        this.html.classList.add("stb-list");
        const table = document.createElement("table");
        const head = document.createElement("thead");
        const body = document.createElement("tbody");

        if(this.elements.length > 0) {
            for(const category of Object.keys(this.elements[0])){
                if(!this.elements[0][category].detail) {
                    const th = document.createElement("th");
                    th.innerText = category;
                    head.appendChild(th);
                }
            }
            const actionHead = document.createElement("th");
                actionHead.innerText = "Action";
                head.appendChild(actionHead);
        }

        const showedElements = this.filteredElements === null ? this.elements : this.filteredElements;

        if(showedElements.length === 0) {
            const td = document.createElement("td");
            td.colSpan = Object.keys.length + 1;
            td.innerText = "No elements to show";
            body.appendChild(td);
            table.appendChild(head);
            table.appendChild(body);
            this.html.appendChild(table); 
            return;
        }
            for(const element of showedElements) {
                const tr = document.createElement("tr");
                for(const category of Object.keys(element)) {
                    if(!element[category].detail){
                        const td = document.createElement("td");
                        td.innerText = element[category].value;
                        tr.appendChild(td);
                    }
                }
                tr.appendChild(this.setActions(element));
                body.appendChild(tr);
            }

        

        table.appendChild(head);
        table.appendChild(body);

        const addButton = document.createElement("button");
        addButton.innerText = "Add";
        addButton.onclick = () => {
            const addFormInputs: Array<Input> = [];
            for(const category of Object.keys(this.elements[0])) {
                if(category !== "id"){
                    if(category === "email") {
                    addFormInputs.push({
                        name: category,
                        input: new EmailInput(true, category)
                    });
                } else {
                    addFormInputs.push({
                        name: category,
                        input: new NameInput(category, true)
                    });
                }}
            }

            const addForm = new Form(addFormInputs, "Add");
            addForm.setSendFunction(() => {
                const values = addForm.export();
                console.log(values)
                API.add(this.route, values.body);
            })

            const addPopup = new Popup(addForm.getForm(), "Add");
            addPopup.generate();
        }

        this.html.appendChild(addButton);
        this.html.appendChild(table); 
    }

    getHtml(): HTMLDivElement {
        return this.html;
    }

    setActions(element: T): HTMLTableCellElement {
        const td = document.createElement("td")
        const actionDiv = document.createElement("div");
        const viewImage = document.createElement("img");
        viewImage.src = "/global/img/visible.svg";
        viewImage.onclick = () => {
            const viewDiv = document.createElement("div");
            for(const category of Object.keys(element)) {
                const p = document.createElement("p");
                p.innerText = `${category}: ${element[category].value}`;
                viewDiv.appendChild(p);
            }
            const viewPopup = new Popup(viewDiv, "View");
            viewPopup.generate();
        }
        actionDiv.appendChild(viewImage);
        const editImage = document.createElement("img");
        editImage.src = "/global/img/edit.svg";
        editImage.onclick = () => {
            const editFormInputs: Array<Input> = [];
            for(const category of Object.keys(element)) {
                if(category !== "id"){
                    if(category === "email") {
                    editFormInputs.push({
                        name: category,
                        input: new EmailInput(true, category, element[category].value)
                    });
                } else {
                    editFormInputs.push({
                        name: category,
                        input: new NameInput(category, true, element[category].value)
                    });
                }}
            }

            const editForm = new Form(editFormInputs, "Edit");
            editForm.setSendFunction(() => {
                const values = editForm.export();
                console.log(values)
                API.edit(this.route, values.id ,values.body);
            })

            const editPopup = new Popup(editForm.getForm(), "Edit");
            editPopup.generate();
        }
        actionDiv.appendChild(editImage);
        const deleteImage = document.createElement("img");
        deleteImage.src = "/global/img/delete.svg";
        deleteImage.onclick = () => {
            let deletionPopup: Popup;
            const yesNoContent = document.createElement("div");
            const msg = document.createElement("p");
            msg.innerText = "Are you sure you want to delete this content";
            yesNoContent.appendChild(msg);
            const yesnoButtons = document.createElement("div");
            yesnoButtons.style.display = "flex";
            const yesButton = document.createElement("button");
            const noButton = document.createElement("button");
            yesButton.innerText = "Yes";
            noButton.innerText = "No";
            noButton.onclick = () => () => {
                deletionPopup.destroy();
            }
            yesButton.onclick = () => {
                API.delete(this.route, element.id.value);
            }

            yesnoButtons.appendChild(yesButton);
            yesnoButtons.appendChild(noButton);

            yesNoContent.appendChild(yesnoButtons);

            deletionPopup = new Popup(yesNoContent, "Delete");
            deletionPopup.generate();
        }
        actionDiv.appendChild(deleteImage);
        td.appendChild(actionDiv);
        return td;
    }
}