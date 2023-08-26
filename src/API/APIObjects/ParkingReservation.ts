import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class ParkingReservation implements APIObject {
    public id: APIAttribute;
    public reservation_id: APIAttribute;
    public parking_id: APIAttribute;
    public start_time: APIAttribute;
    public end_time: APIAttribute;
    public price: APIAttribute;
    public status: APIAttribute;

    constructor(id: string, reservation_id: string, parking_id: string, start_time: string, end_time: string, price: string, status: string) {
        this.id = {
            value: id,
            detail: false
        };
        this.reservation_id = {
            value: reservation_id,
            detail: false
        };
        this.parking_id = {
            value: parking_id,
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
        this.status = {
            value: status,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}