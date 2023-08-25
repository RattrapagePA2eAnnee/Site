import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class PlaneReservation implements APIObject {
    public reservation_id: APIAttribute;
    public plane_id: APIAttribute;
    public start_time: APIAttribute;
    public end_time: APIAttribute;
    public price: APIAttribute;
    public intstructor_id: APIAttribute;
    public status: APIAttribute;
    public type: APIAttribute;

    constructor(reservation_id: string, plane_id: string, start_time: string, end_time: string, price: string, intstructor_id: string, status: string, type: string) {
        this.reservation_id = {
            value: reservation_id,
            detail: false
        };
        this.plane_id = {
            value: plane_id,
            detail: false
        };
        this.start_time = {
            value: start_time,
            detail: false
        };
        this.end_time = {
            value: end_time,
            detail: false
        };
        this.price = {
            value: price,
            detail: false
        };
        this.intstructor_id = {
            value: intstructor_id,
            detail: false
        };
        this.status = {
            value: status,
            detail: false
        };
        this.type = {
            value: type,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}