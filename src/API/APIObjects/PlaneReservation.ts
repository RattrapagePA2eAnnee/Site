import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class PlaneReservation implements APIObject {
    public id: APIAttribute;
    public reservation_id: APIAttribute;
    public plane_id: APIAttribute;
    public start_time: APIAttribute;
    public end_time: APIAttribute;
    public price: APIAttribute;
    public instructor_id: APIAttribute;
    public status: APIAttribute;
    public type: APIAttribute;

    constructor(id: string, reservation_id: string, plane_id: string, start_time: string, end_time: string, price: string, instructor_id: string, status: string, type: string) {
        this.id = {
            value: id,
            detail: false
        }
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
        this.instructor_id = {
            value: instructor_id,
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