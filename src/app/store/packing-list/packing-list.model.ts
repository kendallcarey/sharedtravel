import {Item} from "../item/item.model";
export class PackingList {
    id: string;
    name: string;
    items: Item[] = [];
}