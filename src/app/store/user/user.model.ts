import {PackingList} from "../packing-list/packing-list.model";

export class User {
    uid: string;
    displayName: string;
    photoURL: string;
    packingLists: PackingList[] = [];
}