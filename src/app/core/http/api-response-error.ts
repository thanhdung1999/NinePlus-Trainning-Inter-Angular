export class ApiResponseError {
    messageCode?: string;
    messageText?: string;
}
export class ResponMessage {
    messageCode?: string;
    messageText?: string;
}

export class ApiResponMessage {
    messages?: ResponMessage[];
    succeeded?: boolean;
}

export class ApiCheckError {
    MessageCode?: string;
    MessageText?: string;
}
