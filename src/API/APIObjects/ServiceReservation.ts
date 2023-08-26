import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class ServiceReservation implements APIObject {
    public id: APIAttribute;
    public reservation_id: APIAttribute;
    public service_id: APIAttribute;
    public status: APIAttribute;

    constructor(id: string, reservation_id: string, service_id: string, status: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.reservation_id = {
            value: reservation_id,
            detail: true
        };
        this.service_id = {
            value: service_id,
            detail: false
        };
        this.status = {
            value: status,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}