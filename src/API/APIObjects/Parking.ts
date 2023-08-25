import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class Parking implements APIObject {
    public id: APIAttribute;
    public parking_number: APIAttribute;
    public type: APIAttribute;
    public length: APIAttribute;
    public wingspan: APIAttribute;

    constructor(id: string, parking_number: string, type: string, length: string, wingspan: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.parking_number = {
            value: parking_number,
            detail: false
        };
        this.type = {
            value: type,
            detail: false
        };
        this.length = {
            value: length,
            detail: false
        };
        this.wingspan = {
            value: wingspan,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}