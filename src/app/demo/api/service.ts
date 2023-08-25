export interface Service {
    id: number,
    name: string,
    time: number,
    price: number,
    description: number,
    image: string,
    createdOn: string,
    review: number,
}

export interface Image {
    id: number,
    serviceId: number,
    nameFile: string,
}
