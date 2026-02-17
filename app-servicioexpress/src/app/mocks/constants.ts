import { Client } from "../models/ClientModel";
import { EnrollmentStep } from "../models/EnrollmentStepModel";
import { Document } from "../models/DocumentModel";


export const MOCK_CLIENTS: Client[] = [
  {
    id: '7',
    name: 'Ricardo Ramirez',
    initials: 'RR',
    serviceType: 'Semanas SISEC',
    folio: '#4496',
    status: 'COMPLETADO',
    date: 'Hoy, 10:24 AM',
    nss: '1234-56-7890',
    curp: 'RAMR800101HDFRRN01',
    phone: '449 123 4567',
    policyType: 'GMM Familiar Plus'
  },
  {
    id: '6',
    name: 'Maria Alcaraz',
    initials: 'MA',
    serviceType: 'Servicios SAT',
    folio: '#4497',
    status: 'EN PROCESO',
    date: 'Ayer, 4:15 PM',
    nss: '2345-67-8901',
    curp: 'ALCM820505HDFLLN02',
    phone: '449 234 5678',
    policyType: 'Plan Médico Platino'
  },
  {
    id: '5',
    name: 'Juan Sanchez',
    initials: 'JS',
    serviceType: 'Trámite SINDOS',
    folio: '#4498',
    status: 'PENDIENTE',
    date: '02 Nov, 2023',
    nss: '3456-78-9012',
    curp: 'SANJ850101HDFRRA03',
    phone: '449 345 6789'
  },
  {
    id: '4',
    name: 'Lucia Gomez',
    initials: 'LG',
    serviceType: 'Actas Nacimiento',
    folio: '#4499',
    status: 'COMPLETADO',
    date: '31 Oct, 2023',
    nss: '4567-89-0123',
    curp: 'GOML900101HDFRRN04',
    phone: '449 456 7890'
  }
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'd1',
    name: 'Semanas Cotizadas.pdf',
    date: '12 Oct',
    size: '1.2 MB',
    type: 'pdf'
  },
  {
    id: 'd2',
    name: 'Vigencia de Derechos.pdf',
    date: '12 Oct',
    size: '0.8 MB',
    type: 'pdf'
  }
];

export const MOCK_STEPS: EnrollmentStep[] = [
  {
    id: 's1',
    title: 'Información Recibida',
    description: 'Completado el 12 Oct',
    status: 'completed',
    date: '12 Oct'
  },
  {
    id: 's2',
    title: 'Validación de Documentos',
    description: 'En progreso - Revisando archivos',
    status: 'current'
  },
  {
    id: 's3',
    title: 'Revisión Médica',
    description: 'Pendiente',
    status: 'pending'
  },
  {
    id: 's4',
    title: 'Alta Completa',
    description: 'Pendiente',
    status: 'pending'
  }
];
