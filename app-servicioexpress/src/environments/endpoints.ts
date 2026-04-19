import { environment } from "./environment";

export const EndPoints = {
    customer : {
        getByConsultant: `${environment.apiBaseUrl}/Customer/byconsultant`,
        create : `${environment.apiBaseUrl}/Customer`,
        getResume : `${environment.apiBaseUrl}/Customer/resume`,
        getAll : `${environment.apiBaseUrl}/Customer`,
        getById : `${environment.apiBaseUrl}/Customer/only`,
        getFile : `${environment.apiBaseUrl}/Customer/SetSuscribe`,
        idse : `${environment.apiBaseUrl}/Customer/idse`,
        ticketPagoAlta : `${environment.apiBaseUrl}/Customer/ticketpagoalta`
    },
    user: {
        login: `${environment.apiBaseUrl}/User/login`,
        ping: `${environment.apiBaseUrl}/User/ping`
    },
    service: {
        getById : `${environment.apiBaseUrl}/Service/historical`,
        activate : `${environment.apiBaseUrl}/Service/Activate`,
        inactivate : `${environment.apiBaseUrl}/Service/inactivate`,
        confirmCancelation : `${environment.apiBaseUrl}/Service/confirmCancelation`,
    },
    status: {
        getAll: `${environment.apiBaseUrl}/StatusService`,
    }
};