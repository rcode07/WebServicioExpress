import { EnrollmentStatus } from "./types/EnrollmentStatusType";

export interface Client {
  id: string;
  name: string;
  initials: string;
  serviceType: string;
  folio: string;
  status: EnrollmentStatus;
  date: string;
  nss: string;
  curp: string;
  phone: string;
  policyType?: string;
}
