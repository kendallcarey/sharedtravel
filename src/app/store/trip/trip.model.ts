import { User } from '../user/user.model';
import { Location } from '../location/location.model';

export class Trip {
    $key: string;
    name: string;
    locations: Location[] = [];
    packingListKey: string;
    users: User[] = [];
    startDate: string;
    endDate: string;
    organizer: User;
    description: string;
}
