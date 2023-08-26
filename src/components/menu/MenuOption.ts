import { Layout } from "../../global/Layout.js";
import { LayoutSwitchMenu } from "../../global/LayoutSwitchMenu.js";
import { MenuComponent } from "./MenuComponent.js";

export class MenuOption extends MenuComponent {
    img: string;
    title: string;
    component: HTMLDivElement;
    menu: LayoutSwitchMenu;
    layout: Layout;

    constructor(title: string, layout: Layout, img?:string) {
        super();
        this.title = title;
        this.layout = layout;
        this.menu = new LayoutSwitchMenu([]);
        this.component = document.createElement("div");
        if(img) {
            this.img = img;
        } else {
            this.img = "/global/img/circle-dot.svg";
            this.component.classList.add("stb-menu-suboption");
        }
    }

    public generate(): void {
        this.component.classList.add("stb-menu-option");
        const img = document.createElement("img");
        img.src = this.img;
        this.component.appendChild(img);
        const title = document.createElement("h3");
        title.innerText = this.title;
        this.component.appendChild(title);
        this.component.onclick = () => {
            const scripts = document.getElementsByTagName("script");
            for(const script of scripts) {
                if(script.src != "http://aen.local/test.js"){
                    document.body.removeChild(script);
                }
            }
            const options = document.getElementsByClassName("stb-menu-option");
            for(const option of options) {
                if(option.classList.contains("current")) {
                    option.classList.remove("current");
                }
            }
            this.component.classList.add("current");
            this.layout.show();
        }
    }
}