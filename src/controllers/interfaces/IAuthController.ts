import { IRouteHandlerConfig } from 'hapi';
export interface IAuthController {
    getToken: any;
    register: any;
    login: any;
    ping: any;
    tokenValidation:any;
}