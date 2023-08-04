import { Services } from "./booking-detail";

export interface BookingUpdate{
    id?: number;
    customerId?: number;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    note?: string;
    servicesId?: Services[];
}