export class ConsultantModel {
    userName: string;
    password: string;
    phone: string;
    name: string;
    priceService: number;

    constructor(userName: string, password: string, phone: string, name: string, priceService: number) {
        this.userName = userName;
        this.password = password;
        this.phone = phone;
        this.name = name;
        this.priceService = priceService;
    }
}