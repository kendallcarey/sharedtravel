import {PackingList} from "./packing-list";

export class User {
    uid: string;
    displayName: string;
    photoURL: string;
    packingLists: PackingList[] = [];
}