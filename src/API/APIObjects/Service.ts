import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class Service implements APIObject {
    public id: APIAttribute;
    public service_name: APIAttribute;
    public description: APIAttribute;
    public price: APIAttribute;

    constructor(id: string, service_name: string, description: string, price: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.service_name = {
            value: service_name,
            detail: false
        };
        this.description = {
            value: description,
            detail: false
        };
        this.price = {
            value: price,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}