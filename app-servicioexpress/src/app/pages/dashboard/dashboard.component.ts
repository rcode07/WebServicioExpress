import { Component, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MOCK_CLIENTS } from '../../mocks/constants';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { CustomerService } from '../../core/services/customer.service';
import { Client } from '../../models/ClientModel';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, BottomNavComponent],
  standalone: true,
  template: `
    <div class="min-h-screen bg-background-light dark:bg-background-dark pb-32 animate-fade-in">
      <!-- Sticky Header -->
      <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-secondary shadow-lg shadow-primary/20">
              <span class="material-symbols-outlined fill-1">speed</span>
            </div>
            <div>
              <h1 class="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-400">Servicio Express</h1>
              <p class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">Panel de Asesor</p>
            </div>
          </div>
          <button class="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-90 transition-transform">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
          </button>
        </div>
      </header>

      <main class="px-5 py-6 space-y-8">
        <!-- Summary Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Resumen de Registros</h2>
            <span class="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Este mes</span>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <!-- Main Card -->
            <div class="bg-primary p-5 rounded-[2rem] text-white shadow-xl shadow-primary/20 col-span-2 flex items-center justify-between overflow-hidden relative group">
              <div class="z-10 relative">
                <p class="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-80">Total de Trámites</p>
                <h3 class="text-5xl font-black mt-1 tracking-tighter">2</h3>
                <div class="mt-3 inline-flex items-center gap-1.5 bg-secondary text-deep-blue px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  +12% <span class="material-symbols-outlined text-xs">trending_up</span>
                </div>
              </div>
              <span class="material-symbols-outlined text-[140px] text-white/10 absolute -right-6 -bottom-6 rotate-12 transition-transform group-hover:scale-110">assignment</span>
            </div>

            <!-- Stats Cards -->
            <div class="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Completados</p>
              </div>
              <h3 class="text-2xl font-bold dark:text-white">1</h3>
            </div>
            
            <div class="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">En Proceso</p>
              </div>
              <h3 class="text-2xl font-bold dark:text-white">1</h3>
            </div>
          </div>
        </section>

        <!-- Search Section -->
        <section>
          <div class="relative group">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              (input)="updateSearch($event)"
              class="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-500 transition-all text-sm outline-none shadow-sm" 
              placeholder="Buscar cliente por nombre o folio...">
          </div>
        </section>

        <!-- Clients Section -->
        <section class="space-y-4">
          <div class="flex items-center justify-between px-1">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Clientes Recientes</h2>
            <button class="text-primary dark:text-blue-400 text-xs font-black uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          
          <div class="space-y-3">
            @for (client of filteredClients(); track client.id) {
              <!-- Acción: click navega a client-detail -->
              <div (click)="goToDetail(client.id)" class="bg-white dark:bg-slate-800 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.97] transition-all hover:border-primary/30">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm shadow-inner" 
                    [ngClass]="{
                      'bg-blue-50 text-primary dark:bg-primary/20': client.status === 'COMPLETADO',
                      'bg-amber-50 text-amber-600 dark:bg-amber-900/20': client.status === 'EN PROCESO',
                      'bg-red-50 text-red-600 dark:bg-red-900/20': client.status === 'PENDIENTE'
                    }">
                    {{ client.initials }}
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm">{{ client.name }}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{{ client.serviceType }} • Folio {{ client.folio }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter"
                    [ngClass]="{
                      'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400': client.status === 'COMPLETADO',
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400': client.status === 'EN PROCESO',
                      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400': client.status === 'PENDIENTE'
                    }">
                    {{ client.status }}
                  </span>
                  <p class="text-[9px] font-bold text-slate-400 mt-1 uppercase">{{ client.date }}</p>
                </div>
              </div>
            } @empty {
              <div class="py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <span class="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
                <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Sin resultados</p>
              </div>
            }
          </div>
        </section>

        <!-- Support Banner -->
        <div class="bg-gradient-to-r from-deep-blue to-primary p-6 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
          <div class="z-10 relative">
            <h3 class="text-xl font-logo italic mb-1 leading-tight tracking-tighter">
              MANEJAMOS LOS<br/><span class="text-secondary text-2xl not-italic font-black tracking-normal">MEJORES COSTOS.</span>
            </h3>
            <p class="text-blue-100 text-xs font-bold mb-5 opacity-80 uppercase tracking-widest">¿Necesitas ayuda técnica?</p>
            <a href="https://wa.me/449638992" target="_blank" class="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-black text-[11px] uppercase shadow-lg active:scale-95 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" class="w-4 h-4" alt="WA">
              Soporte WhatsApp
            </a>
          </div>
          <span class="material-symbols-outlined text-[160px] text-white/5 absolute -right-8 -bottom-8">support_agent</span>
        </div>
      </main>

      <!-- Reusing the BottomNav Component -->
      <app-bottom-nav activeTab="inicio"></app-bottom-nav>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .font-logo { font-family: 'Orbitron', sans-serif; }
    
    ::-webkit-scrollbar { display: none; }`]
})
export class DashboardComponent {
  // Lista original de clientes
  //private allClients = signal(MOCK_CLIENTS);

  private allClients = signal<Client[]>([]);
  
  // Término de búsqueda reactivo
  searchTerm = signal('');

  // Lista filtrada computada (Angular 19 Signals)
  filteredClients = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allClients().slice(0, 4);
    
    return this.allClients().filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.folio.toLowerCase().includes(term) ||
      c.serviceType.toLowerCase().includes(term)
    );
  });

  constructor(private router: Router, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers(localStorage.getItem('user_id') || '').subscribe({
      next: (clients) => {
        this.allClients.set(clients);
      },
      error: (err) => {
        console.error('login failed', err);
      }
    });
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  goToDetail(id: string): void {
    this.router.navigate(['/client-detail', id]);
  }
}