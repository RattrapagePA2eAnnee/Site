import { APIObject, APIAttribute } from "../../global/APIObject.js";

export class Invoice implements APIObject {
    public id: APIAttribute;
    public total_price: APIAttribute;
    public invoice_date_time: APIAttribute;
    public invoice_link: APIAttribute;
    public user_id: APIAttribute;

    constructor(id: string, total_price: string, invoice_date_time: string, invoice_link: string, user_id: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.total_price = {
            value: total_price,
            detail: false
        };
        this.invoice_date_time = {
            value: invoice_date_time,
            detail: false
        };
        this.invoice_link = {
            value: invoice_link,
            detail: false
        };
        this.user_id = {
            value: user_id,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}