export class ClientUpdateRequest {
    nss: string;
    curp: string;
    phone: string;
    name: string;
    id: number;
    IdService: number;
    IdStatusService: number;
    IdSupplier: number;

    constructor(nss: string, curp: string, phone: string, name: string, id: number, IdService: number, IdStatusService: number, IdSupplier: number) {
        this.nss = nss;
        this.curp = curp;
        this.phone = phone;
        this.name = name;
        this.id = id;
        this.IdService = IdService;
        this.IdStatusService = IdStatusService;
        this.IdSupplier = IdSupplier;
    }
}