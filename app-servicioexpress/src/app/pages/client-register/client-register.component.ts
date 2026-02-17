import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in relative">
      <!-- Header -->
      <header class="bg-primary pt-6 pb-10 px-6 rounded-b-[32px] shadow-lg relative overflow-hidden shrink-0">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <div class="flex items-center justify-between relative z-10">
          <button (click)="back()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white active:scale-90 transition-transform">
            <span class="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 class="text-lg font-bold text-white uppercase tracking-wider">Registrar Cliente</h1>
          <div class="w-10"></div> 
        </div>

        <div class="mt-8 flex items-center space-x-4 relative z-10">
          <div class="bg-secondary p-3 rounded-2xl shadow-lg shadow-black/10">
            <span class="material-symbols-outlined text-primary text-3xl fill-1">person_add</span>
          </div>
          <div>
            <p class="text-white/80 text-[10px] uppercase font-black tracking-[0.2em]">Nuevo Ingreso</p>
            <p class="text-white text-xl font-black leading-tight">Inscripción al Seguro</p>
          </div>
        </div>
      </header>

      <!-- Main Form Area -->
      <main class="flex-1 px-6 -mt-6 relative z-20 pb-4 overflow-y-auto">
        <form [formGroup] = "form" class="space-y-4" (submit)="$event.preventDefault(); submit()">
          <div class="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-xl space-y-5 border border-white dark:border-slate-700">
            
            <!-- NSS Input -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="nss">Número de Seguridad Social (NSS)</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">badge</span>
                <input
                  formControlName="nss"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                  id="nss" 
                  placeholder="0000 00 0000 0" 
                  type="text">
              </div>
            </div>

            <!-- CURP Input -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="curp">CURP</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">fingerprint</span>
                <input 
                  formControlName="curp"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all uppercase outline-none text-sm font-medium" 
                  id="curp" 
                  placeholder="ABCD000000XXXXXX00" 
                  type="text">
              </div>
            </div>

            <!-- Name Input -->
            <div class="space-y-1.5">
              <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="name">Nombre Completo</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                <input 
                  formControlName="name"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                  id="name" 
                  placeholder="Juan Pérez López" 
                  type="text">
              </div>
            </div>

            <!-- Phone Input -->
            <div class="space-y-1.5 pb-2">
              <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="phone">Teléfono de Contacto</label>
              <div class="relative group">
                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">phone_iphone</span>
                <input 
                  formControlName="phone"
                  class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                  id="phone" 
                  placeholder="449 000 0000" 
                  type="tel">
              </div>
            </div>

            <!-- Documentation Section -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
              <p class="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-2">Documentación Requerida (PDF)</p>
              
              <div class="grid grid-cols-1 gap-4">
                <!-- File Input 1 -->
                <div class="relative">
                  <input accept=".pdf" class="hidden" id="semanas" type="file" (change)="onFileSelected($event, 'semanas')">
                  <label for="semanas" class="flex items-center justify-between p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 active:scale-[0.98] transition-all cursor-pointer group">
                    <div class="flex items-center space-x-3">
                      <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl text-red-500">
                        <span class="material-symbols-outlined text-2xl" [class.fill-1]="files().semanas">picture_as_pdf</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {{ files().semanas ? files().semanas : 'Subir Semanas Cotizadas' }}
                        </span>
                        <span class="text-[9px] text-slate-400 uppercase font-black">Formato PDF Máx. 5MB</span>
                      </div>
                    </div>
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
                      [ngClass]="files().semanas ? 'bg-green-500 text-white' : 'bg-primary text-white'">
                      <span class="material-symbols-outlined text-lg">{{ files().semanas ? 'check' : 'add' }}</span>
                    </div>
                  </label>
                </div>

                <!-- File Input 2 -->
                <div class="relative">
                  <input accept=".pdf" class="hidden" id="vigencia" type="file" (change)="onFileSelected($event, 'vigencia')">
                  <label for="vigencia" class="flex items-center justify-between p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 active:scale-[0.98] transition-all cursor-pointer group">
                    <div class="flex items-center space-x-3">
                      <div class="bg-red-50 dark:bg-red-900/20 p-2 rounded-xl text-red-500">
                        <span class="material-symbols-outlined text-2xl" [class.fill-1]="files().vigencia">picture_as_pdf</span>
                      </div>
                      <div class="flex flex-col">
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {{ files().vigencia ? files().vigencia : 'Subir Vigencia de Derechos' }}
                        </span>
                        <span class="text-[9px] text-slate-400 uppercase font-black">Formato PDF Máx. 5MB</span>
                      </div>
                    </div>
                    <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors"
                      [ngClass]="files().vigencia ? 'bg-green-500 text-white' : 'bg-primary text-white'">
                      <span class="material-symbols-outlined text-lg">{{ files().vigencia ? 'check' : 'add' }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Box -->
          <div class="flex items-center space-x-3 p-4 bg-primary/5 dark:bg-white/5 border border-primary/10 rounded-2xl">
            <span class="material-symbols-outlined text-primary fill-1">verified</span>
            <p class="text-[10px] font-bold text-slate-600 dark:text-slate-300 leading-tight">
              <span class="text-primary font-black uppercase">Aviso:</span> 
              Los documentos son procesados de forma segura. Se enviará una notificación automática vía WhatsApp al finalizar.
            </p>
          </div>
        </form>
      </main>

      <!-- Sticky Footer Actions & Navigation -->
      <footer class="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.1)] px-6 py-6 pb-12 z-[100] max-w-md mx-auto w-full">
        <button (click)="submit()" class="w-full bg-secondary hover:bg-yellow-400 text-primary font-black text-lg py-5 rounded-2xl shadow-xl shadow-secondary/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-3 uppercase tracking-widest">
          @if (isLoading()) {
          <span class="material-symbols-outlined animate-spin">progress_activity</span>
          <span>Procesando...</span>
        } @else {
          <span>Registrar Cliente</span>
          <span class="material-symbols-outlined font-black">arrow_forward</span>
        }
        </button>

        <nav class="mt-8 flex justify-around items-center">
          <button (click)="back()" class="flex flex-col items-center space-y-1 text-slate-300 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-[9px] font-black uppercase tracking-tighter">Inicio</span>
          </button>
          <button class="flex flex-col items-center space-y-1 text-primary">
            <span class="material-symbols-outlined fill-1">person_add</span>
            <span class="text-[9px] font-black uppercase tracking-tighter">Registro</span>
          </button>
          <button class="flex flex-col items-center space-y-1 text-slate-300">
            <span class="material-symbols-outlined">list_alt</span>
            <span class="text-[9px] font-black uppercase tracking-tighter">Clientes</span>
          </button>
          <button class="flex flex-col items-center space-y-1 text-slate-300">
            <span class="material-symbols-outlined">support_agent</span>
            <span class="text-[9px] font-black uppercase tracking-tighter">Ayuda</span>
          </button>
        </nav>
      </footer>

      <!-- iOS Home Indicator -->
      <div class="fixed bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-full z-[110]"></div>
    </div>

    @if (isLoading()) {
    <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm animate-fade-in">
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-primary font-black uppercase tracking-widest text-xs">Guardando datos...</p>
      </div>
    </div>
  }
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    ::-webkit-scrollbar { display: none; }
    
    input::placeholder { color: #94a3b8; font-weight: 500; }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class ClientRegisterComponent {

  isLoading = signal(false);

  // Estado de los archivos subidos usando Signals
  files = signal<{ semanas: File | null; vigencia: File | null }>({
    semanas: null,
    vigencia: null
  });

  formBuilder = new FormBuilder();
  form : any;

  constructor(private router: Router, private service: CustomerService, private fb: FormBuilder) {}
  
  back(): void {
    this.router.navigate(['/dashboard']);
  }

  onFileSelected(event: any, type: 'semanas' | 'vigencia'): void {
  const file = event.target.files[0];

  if (file) {
    this.files.update(current => ({
      ...current,
      [type]: file
    }));
  }
}

ngOnInit(): void{
  this.form = this.fb.group({
    nss: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    name: ['', [Validators.required]],
  });
}

  
  submit(): void {
    const idConsultant = localStorage.getItem('user_id');

    if(idConsultant == null){
      alert("Error, cierre sesión y vuelva a entrar");
      return;
    }

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const nss = this.form.value.nss;
    const curp = this.form.value.curp;
    const phone = this.form.value.phone;
    const name = this.form.value.name;

    const filesValue = this.files();

    if (!filesValue.semanas || !filesValue.vigencia) {
      console.error('Faltan archivos');
      return;
    }

    this.service.create(idConsultant, nss, curp, phone, name, filesValue.semanas, filesValue.vigencia).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        const customer = response.object;

        this.router.navigate(['/confirmation'], {state: {customer}});
      },
      error : (err) => {
        this.isLoading.set(false);
        alert("Error al crear al cliente, favor de intentarlo de nuevo");
      }
    });
    
  }
}