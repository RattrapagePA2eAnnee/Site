import { TextInput } from "../../global/form/TextInput.js";

export class BirthDateInput extends TextInput {
    value: any;
    placeholder: string;
    input: HTMLInputElement;
    mandatory: boolean;

    constructor(mandatory: boolean, placeholder: string, value?: string) {
        super();
        this.mandatory = mandatory;
        this.placeholder = placeholder;
        this.input = document.createElement("input");
        this.input.type = "date";
        if (value) {
            this.value = value;
        }
    }

    generate(): HTMLInputElement {
        this.input.placeholder = this.placeholder;
        if (this.value) {
            this.input.value = this.value;
        }
        return this.input;
    }

    validate(): boolean {
        this.value = this.input.value;
        return true;
    }
}