import { environment } from "./environment";

export const EndPoints = {
    customer : {
        getByConsultant: `${environment.apiBaseUrl}/Customer/byconsultant`,
        create : `${environment.apiBaseUrl}/Customer`
    },
    user: {
        login: `${environment.apiBaseUrl}/User/login`,
        }
};