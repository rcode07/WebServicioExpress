import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { CustomerServiceModel } from '../../models/ClientServiceModel';
import { StatusserviceService } from '../../core/services/statusservice.service';
import { ClientUpdateRequest } from '../../models/ClientUpdateRequest';
import { FormBuilder, ɵInternalFormsSharedModule } from "@angular/forms";
import { ServiceService } from '../../core/services/service.service';

@Component({
  selector: 'app-client-edit',
  imports: [CommonModule, RouterLink, ɵInternalFormsSharedModule],
  template: `
    <div class="bg-[#f6f6f8] min-h-screen pb-24">
      <header class="flex items-center bg-white p-4 border-b border-slate-200 sticky top-0 z-10">
        <a routerLink="/dashboard-admin" class="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <span class="material-symbols-outlined text-slate-900">arrow_back</span>
        </a>
        <h2 class="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 ml-2">Detalles del Cliente</h2>
      </header>

      <div class="p-4 space-y-6">
        <div class="flex flex-col items-center gap-4 py-4">
          <div class="relative">
            <div class="size-24 rounded-full bg-[#135bec1a] flex items-center justify-center border-2 border-[#135bec33]">
              <span class="material-symbols-outlined text-4xl text-[#135bec]">person</span>
            </div>
            <button class="absolute bottom-0 right-0 size-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-[#135bec]">
              <span class="material-symbols-outlined text-sm">photo_camera</span>
            </button>
          </div>
          <div class="text-center">
            <h3 class="text-xl font-extrabold text-slate-900">{{ customer()?.name }}</h3>
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Folio: #{{ customer()?.idService }}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex gap-2 border-b border-slate-200">
            <button class="px-4 py-2 border-b-2 border-[#135bec] text-[#135bec] text-xs font-bold uppercase tracking-wider">Información</button>
          </div>

          <div class="grid grid-cols-1 gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">NOMBRE</label>
              <input 
                class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#135bec33] focus:border-[#135bec] outline-none text-sm font-medium transition-all"
                value="{{ customer()?.name }}"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">NSS</label>
                <input
                  maxlength="11"
                  id="nss"
                  class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#135bec33] focus:border-[#135bec] outline-none text-sm font-medium transition-all"
                  value="{{ customer()?.nss }}"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">CURP</label>
                <input 
                  class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#135bec33] focus:border-[#135bec] outline-none text-sm font-medium transition-all uppercase"
                  value="{{ customer()?.curp }}"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">TELEFONO</label>
              <input 
                class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#135bec33] focus:border-[#135bec] outline-none text-sm font-medium transition-all"
                value="{{ customer()?.phone }}"
                type="tel"
              />
            </div>

            <div class="flex flex-col gap-3">
              <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">ARCHIVOS ADJUNTOS</label>
              <div class="grid grid-cols-1 gap-2">
                <a href="{{ customer()?.urlSemanasCotizadas }}" target="_blank" class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <span class="material-symbols-outlined text-red-500">description</span>
                  <div class="flex-1">
                    <p class="text-xs font-bold text-slate-900 uppercase">Semanas cotizadas</p>
                    <p class="text-[10px] text-slate-400">SemanasCotizadas.pdf</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
                </a>
                <a href="{{ customer()?.urlVigenciaDerechos }}" target="_blank" class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  <span class="material-symbols-outlined text-blue-500">description</span>
                  <div class="flex-1">
                    <p class="text-xs font-bold text-slate-900 uppercase">Vigencia de Derechos</p>
                    <p class="text-[10px] text-slate-400">VigenciaDerechos.pdf</p>
                  </div>
                  <span class="material-symbols-outlined text-slate-400 text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            @if(customer()?.asesor && customer()?.statusService == "PENDIENTE") {
              <button (click)="saveToInProcess()" class="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-emerald-500/20">
                <span class="material-symbols-outlined">person</span>
                <span>Preparar para enviar a proveedor</span>
              </button>
            }

            @if (customer()?.asesor && customer()?.statusService == "EN PROCESO CON PROVEEDOR") {
              <!-- Documentation Section -->
              <div class="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
                <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-2">Documentación Requerida (PDF)</p>
                
                <div class="grid grid-cols-1 gap-4">
                  <!-- File Input 1 -->
                  <div class="relative">
                    <input accept=".pdf" class="hidden" id="idse" type="file" (change)="onFileSelected($event, 'idse')">
                    <label for="idse" class="flex items-center justify-between p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 active:scale-[0.98] transition-all cursor-pointer group">
                      <div class="flex items-center space-x-3">
                        <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl text-red-500">
                          <span class="material-symbols-outlined text-2xl" [class.fill-1]="files().idse">picture_as_pdf</span>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
                            {{ files().idse ? files().idse : 'Subir IDSE' }}
                          </span>
                          <span class="text-[9px] text-slate-400 uppercase font-black">Formato PDF Máx. 5MB</span>
                        </div>
                      </div>
                      <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
                        [ngClass]="files().idse ? 'bg-green-500 text-white' : 'bg-primary text-white'">
                        <span class="material-symbols-outlined text-lg">{{ files().idse ? 'check' : 'add' }}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              
              <div class="flex flex-col gap-1.5">
                <label class="text-[10px] text-slate-400 uppercase font-bold tracking-widest px-1">Fecha alta IMSS</label>
                <input type="date" id="dateAltaIMSS"
                  class="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#135bec33] focus:border-[#135bec] outline-none text-sm font-medium transition-all uppercase"/>
              </div>

              <button (click)="saveIdse()" class="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-emerald-500/20">
                <span class="material-symbols-outlined">inbox_text_person</span>
                <span>Enviar comprobante IDSE a asesor</span>
              </button>
            }

            @if (customer()?.asesor && customer()?.statusService == "PENDIENTE REVISIÓN PAGO ALTA") {
              <!-- TODO: Add content for pending review status -->
              <div class="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 active:scale-[0.98] transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                    <span class="material-symbols-outlined text-2xl fill-1">local_atm</span>
                  </div>
                  <div>
                    <p class="text-slate-900 dark:text-white text-sm font-black leading-tight">Ticket Pago</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Subido</p>
                  </div>
                </div>
                <a 
                  [href]="customer()?.urlTicketPago" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-slate-300 hover:text-blue-500 transition-colors flex items-center">
                  <span class="material-symbols-outlined">open_in_new</span>
                </a>
              </div>

              <button (click)="saveActive()" class="bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-emerald-500/20">
                <span class="material-symbols-outlined">inbox_text_person</span>
                <span>Activar cliente</span>
              </button>

              <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <span class="material-symbols-outlined text-[#135bec]">info</span>
                <p class="text-[11px] text-blue-700 leading-relaxed font-medium">
                  <!-- Este cliente fue registrado por el asesor <span class="font-bold">{{ customer()?.asesor }}</span> el día <span class="font-bold">{{ customer()?.fechaAlta }}</span>. -->
                  El Asesor ha subido el comprobante de pago de alta y está pendiente de revisión por parte de Administración para su activación.
                </p>
              </div>
            }

            @if (customer()?.asesor && customer()?.statusService == "PENDIENTE PAGO ALTA") {
              <button (click)="saveCancelation()" class="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-red-500/20">
                <span class="material-symbols-outlined">inbox_text_person</span>
                <span>Cancelar alta</span>
              </button>

              <div class="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                <span class="material-symbols-outlined text-[#135bec]">info</span>
                <p class="text-[11px] text-red-700 leading-relaxed font-medium">
                  Puede cancelar esta afiliación y solicitar al cliente que realice el pago de alta para luego activar su servicio. 
                  Los datos se enviarán en el próximo reporte como baja.
                </p>
              </div>
            }

            @if (customer()?.asesor && customer()?.statusService == "EN BAJA CON PROVEEDOR") {
              <button (click)="confirmCancelation()" class="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-red-500/20">
                <span class="material-symbols-outlined">inbox_text_person</span>
                <span>Confirmar cancelación</span>
              </button>

              <div class="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                <span class="material-symbols-outlined text-[#135bec]">info</span>
                <p class="text-[11px] text-red-700 leading-relaxed font-medium">
                  Confirma la cancelación solo si el proveedor ha confirmado la baja del cliente. Esto actualizará el estado a "Baja Confirmada".
                </p>
              </div>
            }

            
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <span class="material-symbols-outlined text-[#135bec]">info</span>
              <p class="text-[11px] text-blue-700 leading-relaxed font-medium">
                Este cliente fue registrado por el asesor <span class="font-bold">{{ customer()?.asesor }}</span> el día <span class="font-bold">{{ customer()?.fechaAlta }}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    @if (isLoading()) {
    <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm animate-fade-in">
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-primary font-black uppercase tracking-widest text-xs">Guardando datos...</p>
      </div>
    </div>
  }
  `
})
export class ClientEditComponent {

  isLoading = signal(false);

  formBuilder = new FormBuilder();
  form : any;

  customer = signal<CustomerServiceModel | undefined>(undefined);
  statusOptions = signal<{id: number, name: string}[]>([]);
  selectedStatusId = signal<number | null>(null);

  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private statusService: StatusserviceService, private serviceService: ServiceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id == null){
      alert('Servicio no encontrado');
      this.back();
      return;
    }

    this.statusService.getAll().subscribe({
      next: (res) => {
        if(res.message && res.object){
          this.statusOptions.set(res.object);
          this.customerService.getCustomerById(id).subscribe({
            next: (res) => {
              if(res.message && res.object){
                const customerData = res.object as CustomerServiceModel;
                this.customer.set(customerData);
                this.selectedStatusId.set(customerData.idStatusService);
              }
            },
            error: (err) => {
              alert('Error al cargar el cliente, por favor intente nuevamente');
              this.back();
            }
          });
          
        }
      },
      error: (err) => {
        alert('Error al cargar los estatus, por favor intente nuevamente');
        this.back();
      }
    });
  }

  saveToInProcess() {
    const statusInProcess = this.statusOptions().find(status => status.name.toUpperCase() === 'EN PROCESO');
    const statusId = statusInProcess ? statusInProcess.id : null;

    const currentCustomer: ClientUpdateRequest = {
      id: this.customer()?.id || 0,
      name: this.customer()?.name || '',
      nss: this.customer()?.nss || '',
      curp: this.customer()?.curp || '',
      phone: this.customer()?.phone || '',
      IdService: this.customer()?.idService || 0,
      IdStatusService: statusId || 0
    };
    this.saveChangeCustomer(currentCustomer);
  }

  saveChangeCustomer(currentCustomer : ClientUpdateRequest) {
    this.isLoading.set(true);
    this.customerService.update(currentCustomer).subscribe({
      next: (res) => {
        if(res.message && res.object){
          this.isLoading.set(false);
           const customer = res.object;
           this.router.navigate(['/confirmation-client'], {state: {customer}});
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        alert('Error al guardar los cambios, por favor intente nuevamente');
      }
    });
  }

  // Estado de los archivos subidos usando Signals
  files = signal<{ idse: File | null; vigencia: File | null }>({
    idse: null,
    vigencia: null
  });

  onFileSelected(event: any, type: 'idse' | 'vigencia'): void {
    const file = event.target.files[0];

    if (file) {
      this.files.update(current => ({
        ...current,
        [type]: file
      }));
    }
  }

  saveIdse() {
    this.isLoading.set(true);
    const fileVale = this.files();

    const dateAlta = document.getElementById('dateAltaIMSS') as HTMLInputElement;

    if(!dateAlta || !dateAlta.value) {
      alert('Por favor, selecciona una fecha de alta IMSS antes de enviar.');
      this.isLoading.set(false);
      return;
    }

    const date = new Date(dateAlta.value);

    if (!fileVale.idse) {
      alert('Por favor, selecciona un archivo IDSE antes de enviar.');
      this.isLoading.set(false);
      return;
    }

    this.customerService.saveIdse(this.customer()?.idService.toString() || '', fileVale.idse, date).subscribe({
      next: (res) => {
        if(res.message){
          const customer = res.object;
          this.isLoading.set(false);
          this.router.navigate(['/confirmation-client'], {state: {customer}});
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        alert('Error al enviar el comprobante IDSE, por favor intente nuevamente');
      }
    });
  }

  saveActive() {
    this.isLoading.set(true);

    this.serviceService.setActiveCustomer(this.customer()?.idService.toString() || '').subscribe({
      next: (res) => {
        this.isLoading.set(false);
        alert('Cliente activado correctamente');
        this.router.navigate(['/dashboard-admin']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        alert('Error al activar el cliente, por favor intente nuevamente');
      }
    });
    this.isLoading.set(false);
  }

  saveCancelation() {
    this.isLoading.set(true);

    this.serviceService.setToInactiveCustomer(this.customer()?.idService.toString() || '').subscribe({
      next: (res) => {
        this.isLoading.set(false);
        alert('Cliente desactivado correctamente');
        this.router.navigate(['/dashboard-admin']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        alert('Error al activar el cliente, por favor intente nuevamente');
      }
    });
  }

  confirmCancelation() {
    this.isLoading.set(true);
    this.serviceService.setConfirmCancelation(this.customer()?.idService.toString() || '').subscribe({
      next: (res) => {
        this.isLoading.set(false);
        alert('Cliente desactivado correctamente');
        this.router.navigate(['/dashboard-admin']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        alert('Error al activar el cliente, por favor intente nuevamente');
      }
    });
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatusId.set(Number(value));
  }

  back() {
    this.router.navigate(['/dashboard-admin']);
  }
}