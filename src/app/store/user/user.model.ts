import { Trip } from '../trip/trip.model';

export class User {
    uid: string;
    displayName: string;
    photoURL: string;
    trips: Trip[] = [];
}
