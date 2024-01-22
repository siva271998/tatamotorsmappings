export interface ApiResponse<T>{
    status:ApiResponseStatus,
    data?:T | T[],
    error?:ErrorMessage | ErrorMessage[],    
}

export enum ApiResponseStatus{
    SUCCESS="Ok",
    ERROR="Error"
}

export enum ErrorMessageType{
    INFO="info",
    WARN="warning",
    ERROR="error"
}

export interface ErrorMessage{
    type:ErrorMessageType,
    message:string
}