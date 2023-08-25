export interface FeedBack {
    rating: number;
    bookingDetailId: number;
    staffContent: string;
    serviceContent: string;
    feedbackImageRequests: ImageFeedBack[];
}
export interface ImageFeedBack {
    nameFile: string;
    typeFile: string;
}