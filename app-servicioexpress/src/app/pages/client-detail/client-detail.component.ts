import { Component, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MOCK_CLIENTS, MOCK_DOCUMENTS, MOCK_STEPS } from '../../mocks/constants';
import { Client } from '../../models/ClientModel';
import { EnrollmentStep } from '../../models/EnrollmentStepModel';
import { Documentx } from '../../models/DocumentModel';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { ServiceService } from '../../core/services/service.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template : `
    <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in font-public">
      
      <!-- Sticky Top Navigation Bar -->
      <header class="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-4 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <button (click)="back()" class="text-primary p-2 active:scale-90 transition-transform">
            <span class="material-symbols-outlined text-2xl font-bold">arrow_back_ios</span>
          </button>
          <h1 class="text-slate-900 dark:text-white text-lg font-bold">Detalle del Cliente</h1>
        </div>
        <button class="text-primary p-2 active:scale-90 transition-transform">
          <span class="material-symbols-outlined text-2xl">more_horiz</span>
        </button>
      </header>

      <main class="flex-1 pb-32 overflow-y-auto">
        <!-- Client Profile Header -->
        <div class="p-5 bg-white dark:bg-slate-900 mb-2 border-b border-slate-50 dark:border-slate-800">
          <div class="flex items-center gap-5">
            <div class="w-24 h-24 rounded-full bg-cover bg-center border-4 border-primary/10 shadow-lg" 
                 [style.background-image]="'url(https://lh3.googleusercontent.com/aida-public/AB6AXuD9cB3438BNPEoDYnq-Z3OeDuIQo4rROcqOK3eJBYLcB2LCxWjcNvevZ3CNkyM4HRyEhZmUmrE8caAeRtirsPyAfeJ9FGy8hzLL0_g48tElutxW3Xo_9M9MQntdzXmRBPgKcVULkv3cVNZSCoYrhFVTJ4g1uL2JTrEmirkASKg-xfv6ODfm-YQEF9aWFU2ADZfVZ2No_1QGw8rloVRGlmDANw5rAVYf22Df4z1bgPN_aQgUr-iK0CH-M_ryNpHq3x2Qb0UD7eTiBoc)'">
            </div>
            <div class="flex-1">
              <h2 class="text-slate-900 dark:text-white text-2xl font-black leading-tight tracking-tight">{{ client()?.name }}</h2>
              <div class="flex items-center gap-1.5 mt-1 text-slate-500">
                <span class="material-symbols-outlined text-sm font-bold">fingerprint</span>
                <p class="text-[11px] font-bold uppercase tracking-widest">NSS: {{ client()?.nss }}</p>
              </div>
              <div class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-primary/10 text-primary uppercase tracking-tighter">
                {{ client()?.policyType || 'Plan Médico Platino' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Enrollment Progress Section -->
        <div class="bg-white dark:bg-slate-900 mb-2 p-6 border-y border-slate-50 dark:border-slate-800">
          <h3 class="text-slate-900 dark:text-white text-lg font-black mb-6">Progreso de Inscripción</h3>
          <div class="space-y-0">
            @for (step of steps(); track step.id; let last = $last) {
              <div class="grid grid-cols-[40px_1fr] gap-x-3">
                <!-- Step Visuals -->
                <div class="flex flex-col items-center">
                  <div class="relative flex items-center justify-center">
                    @if (step.status === 'completed') {
                      <div class="z-10 text-primary">
                        <span class="material-symbols-outlined text-[28px] fill-1">check_circle</span>
                      </div>
                    } @else if (step.status === 'current') {
                      <div class="absolute w-8 h-8 rounded-full bg-primary/20 animate-pulse"></div>
                      <div class="z-10 text-primary">
                        <span class="material-symbols-outlined text-[28px]">radio_button_checked</span>
                      </div>
                    } @else {
                      <div class="z-10 text-slate-200 dark:text-slate-700">
                        <span class="material-symbols-outlined text-[28px]">radio_button_unchecked</span>
                      </div>
                    }
                  </div>
                  @if (!last) {
                    <div class="w-[2px] h-12 my-1 transition-colors duration-500" 
                         [ngClass]="step.status === 'completed' ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'">
                    </div>
                  }
                </div>

                <!-- Step Text -->
                <div class="pt-1 pb-8">
                  <p class="text-base font-bold leading-none mb-1" 
                     [ngClass]="step.status === 'pending' ? 'text-slate-400' : 'text-slate-900 dark:text-white'">
                    {{ step.title }}
                  </p>
                  <p class="text-xs font-medium" 
                     [ngClass]="step.status === 'current' ? 'text-primary' : 'text-slate-400'">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Attached Documents Section -->
        <div class="bg-white dark:bg-slate-900 mb-2 p-6 border-y border-slate-50 dark:border-slate-800">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-slate-900 dark:text-white text-lg font-black">Documentos Adjuntos</h3>
            <button class="text-primary text-sm font-black uppercase tracking-widest">Ver todos</button>
          </div>
          
          <div class="space-y-3">
            @for (doc of documents(); track doc.id) {
              <div class="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 active:scale-[0.98] transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                    <span class="material-symbols-outlined text-2xl fill-1">picture_as_pdf</span>
                  </div>
                  <div>
                    <p class="text-slate-900 dark:text-white text-sm font-black leading-tight">{{ doc.name }}</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Subido {{ doc.date }} • {{ doc.size }}</p>
                  </div>
                </div>
                <a 
                  [href]="doc.url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-slate-300 hover:text-blue-500 transition-colors flex items-center">
                  <span class="material-symbols-outlined">visibility</span>
                </a>
              </div>
            }

            <button class="w-full flex items-center justify-center gap-2 p-4 mt-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-primary hover:border-primary/50 transition-all active:scale-[0.98]">
              <span class="material-symbols-outlined">upload_file</span>
              Adjuntar nuevo documento
            </button>
          </div>
        </div>

        <!-- Action Required Alert Card -->
        <div class="mx-6 mt-6 p-5 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-start gap-4 shadow-sm shadow-secondary/5 mb-10">
          <span class="material-symbols-outlined text-secondary fill-1 mt-0.5">info</span>
          <div>
            <p class="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Acción requerida</p>
            <p class="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              La validación de documentos está demorando más de lo habitual. Favor de verificar si existe algún correo de seguimiento o contactar a soporte técnico.
            </p>
          </div>
        </div>
      </main>

      <!-- Bottom Nav Bar -->
      <app-bottom-nav activeTab="clientes"></app-bottom-nav>

      <!-- iOS Home Indicator -->
      <div class="fixed bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-full z-[110]"></div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    ::-webkit-scrollbar { display: none; }
  `]
})
export class ClientDetailComponent {
  client = signal<Client | undefined>(undefined);
  steps = signal<EnrollmentStep[] | undefined>(undefined);
  documents = signal<Documentx[] | undefined>(undefined);

  constructor(private route: ActivatedRoute, private router: Router, private serviceService: ServiceService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if(id == null){
      alert('Servicio no encontrado');
      this.back();
      return;
    }

    this.serviceService.getHistroricalById(id).subscribe({
      next: (response) => {
        if(response.message && response.object){

          const mapped: EnrollmentStep[] = response.object.history.map((item: any) => ({
            id: String(item.id),
            title: item.title,
            description: item.description,
            status: item.status as 'completed' | 'current' | 'pending',
            date: item.date || undefined
          }));

          const customerMapped : Client = {
            id: response.object.customer.id,
            name: response.object.customer.name,
            initials: response.object.customer.initials,
            serviceType: response.object.customer.serviceType,
            folio: response.object.customer.folio,
            status: response.object.customer.status,
            date: response.object.customer.date,
            nss: response.object.customer.nss,
            curp: response.object.customer.curp,
            phone: response.object.customer.phone,
            policyType: response.object.customer.policyType
          };

          const docSemanasCotizadas: Documentx = {
            id: '1',
            name: 'Semanas Cotizadas.pdf',
            date: '',
            size: '',
            type: 'application/pdf',
            url:  response.object.customer.urlSemanasCotizadas
          };

          const docSemanasDerechos: Documentx = {
            id: '1',
            name: 'Semanas Cotizadas.pdf',
            date: '',
            size: '',
            type: 'application/pdf',
            url:  response.object.customer.urlVigenciaDerechos
          };

          console.log('Mapped Documents:', docSemanasCotizadas, docSemanasDerechos);

          const documents = [docSemanasCotizadas, docSemanasDerechos];
          
          this.documents.set(documents);
          this.steps.set(mapped); 
          this.client.set(customerMapped);
        }
      },
      error: (err) => {
        alert('Error al obtener el historial del cliente');
      }
    });

    
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}