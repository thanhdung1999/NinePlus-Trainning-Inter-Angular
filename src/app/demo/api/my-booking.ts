export interface MyBooking {
    bookingId?: number;
    bookingDate?: string;
    bookingStatus?: number;
    totalMoney?: number;
    lastModifiedOn?: string;
    bookingDetailResponses: BookingDetailResponses[];
}
export interface BookingDetailResponses {
    bookingDetailId: number;
    serviceId: number;
    serviceName: string;
    serviceDescription: string;
    servicePrice: number;
    serviceImages: ServiceImages[];
}
export interface ServiceImages {
    id: number;
    serviceId: number;
    nameFile: string;
    nameFileLink: string;
}
