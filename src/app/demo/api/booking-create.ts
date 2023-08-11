import { Services } from "./booking-detail";

export interface BookingCreate{
    customerId?: number;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    note?: string;
    servicesId?: number[];
}
