export interface BookingDetail {
    id?: number;
    customerName?: string;
    phoneNumber?: string;
    bookingDate?: string;
    fromTime?: string;
    toTime?: string;
    status?: number;
    note?: string;
    services?: Services[];
}

export interface Services {
    id?: number;
    name?: string;
}
