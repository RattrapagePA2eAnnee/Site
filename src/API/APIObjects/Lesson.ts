import { APIObject, APIAttribute } from "../../global/APIObject";

export class Lesson implements APIObject {
    public id: APIAttribute;
    public description: APIAttribute;
    public content: APIAttribute;

    constructor(id: string, description: string, content: string) {
        this.id = {
            value: id,
            detail: true
        };
        this.description = {
            value: description,
            detail: false
        };
        this.content = {
            value: content,
            detail: false
        };
    }
    [key: string]: APIAttribute;
}