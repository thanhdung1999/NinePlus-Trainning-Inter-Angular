import { Services } from "./booking-detail";

export interface BookingUpdate{
    id?: number;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    note?: string;
    serviceId?: number[];
}