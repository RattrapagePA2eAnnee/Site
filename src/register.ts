import { Form } from "./global/form/Form.js";
import { EmailInput } from "./components/inputs/EmailInput.js";
import { BirthDateInput } from "./components/inputs/BirthdateInput.js";
import { PostalCodeInput } from "./components/inputs/PostalCodeInput.js";
import { PasswordInput } from "./components/inputs/PasswordInput.js";
import { API } from "./API/API.js";
import { NameInput } from "./components/inputs/NameInput.js";

const registerContainer = <HTMLElement> document.getElementById("registerContainer");

const registerForm = new Form([
    {name: "lastname", input: new NameInput("lastname", true)},
    {name: "firstname", input: new NameInput("firstname", true)},
    {name: "password", input: new PasswordInput("password", true)},
    {name: "email", input: new EmailInput(true, "email")},
    {name: "birth_date", input: new BirthDateInput(true, "birth_date")},
    {name: "address", input: new NameInput("address", true)},
    {name: "postal_code", input: new PostalCodeInput(true, "postal_code")},
    {name: "city", input: new NameInput("city", true)}
], "Inscription");

registerForm.setSendFunction(() => {
    const lastname = registerForm.getInput("lastname");
    const firstname = registerForm.getInput("firstname");
    const password = registerForm.getInput("password");
    const email = registerForm.getInput("email");
    const birth_date = registerForm.getInput("birth_date");
    const address = registerForm.getInput("address");
    const postal_code = registerForm.getInput("postal_code");
    const city = registerForm.getInput("city");

    if (email && password && lastname && firstname && birth_date && address && postal_code && city) {
        const emailValue = <string> email.getValue();
        const passwordValue = <string> password.getValue();
        const lastNameValue = <string> lastname.getValue();
        const firstnameValue = <string> firstname.getValue();
        const birth_dateValue = <string> birth_date.getValue();
        const addressValue = <string> address.getValue();
        const postal_codeValue = <string> postal_code.getValue();
        const cityValue = <string> city.getValue();
        
        API.register(emailValue, passwordValue, lastNameValue, firstnameValue, birth_dateValue, addressValue, postal_codeValue, cityValue);
    }
});

registerContainer.appendChild(registerForm.getForm());



