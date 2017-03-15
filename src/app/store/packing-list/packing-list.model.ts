import {Item} from "../item/item.model";
export class PackingList {
    $key: string;
    name: string;
    items: Item[] = [];
}