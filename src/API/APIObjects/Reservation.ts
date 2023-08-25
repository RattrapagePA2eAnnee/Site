import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class Reservation implements APIObject {
    public id: APIAttribute;
    public reservation_date: APIAttribute;
    public total_price: APIAttribute;
    public user_id: APIAttribute;
    public status: APIAttribute;

    constructor(id: string, reservation_date: string, total_price: string, user_id: string, status: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.reservation_date = {
            value: reservation_date,
            detail: false
        };
        this.total_price = {
            value: total_price,
            detail: false
        };
        this.user_id = {
            value: user_id,
            detail: false
        };
        this.status = {
            value: status,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}