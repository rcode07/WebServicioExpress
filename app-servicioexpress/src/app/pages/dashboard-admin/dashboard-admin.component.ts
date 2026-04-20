import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, BottomNavComponent],
  template : `
    <div class="bg-[#f6f6f8] min-h-screen pb-24">
      <header class="flex items-center bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div class="flex items-center gap-3">
          <div class="bg-[#135bec] p-2 rounded-lg text-white">
            <span class="material-symbols-outlined">health_and_safety</span>
          </div>
          <h1 class="text-xl font-extrabold tracking-tight text-slate-900">AdminSalud</h1>
        </div>
        <div class="flex flex-1 justify-end items-center gap-3">
          <button class="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <div class="h-10 w-10 rounded-full bg-[#135bec1a] flex items-center justify-center border border-[#135bec33]">
            <span class="material-symbols-outlined text-[#135bec]">person</span>
          </div>
        </div>
      </header>

      <main class="px-4 py-6 space-y-6">
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Panel de Control</h2>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text"
                (input)="updateSearch($event)"
                class="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#135bec] outline-none text-sm transition-all"
                placeholder="Buscar por Nombre, NSS o CURP"
              />
            </div>
            <button class="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600">
              <span class="material-symbols-outlined">tune</span>
            </button>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all" (click)="getFile()">
            <span class="material-symbols-outlined text-xl">download</span>
            <span class="text-sm">Reporte</span>
          </button>
          
          <button class="flex-[1.5] bg-[#135bec] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#135bec33] active:scale-95 transition-all" (click)="goToCreateUser()">
            <span class="material-symbols-outlined text-xl">person_add</span>
            <span class="text-sm">Nuevo Usuario</span>
          </button>
        </div>

        <div class="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          @for (tab of tabs(); track tab; let i = $index) {
            <button 
              type="button"
              (click)="selectedTab.set(tab)"
              [class]="'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ' + 
              (selectedTab() === tab ? 'bg-[#135bec] text-white' : 'bg-white border border-slate-200 text-slate-600')"
            >
              {{tab}}
            </button>
          }
        </div>

        <div class="space-y-3">
          @for (item of affiliations(); track item.id) {
            } @empty {
            <p class="text-center text-slate-400 py-10">No se encontraron registros.</p>
          }
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg">Listado de Clientes</h3>
            <span class="text-xs text-slate-500 font-medium uppercase">Actualizado Hoy</span>
          </div>
          
          <div class="space-y-3">
            @for (item of affiliations(); track item.id) {
              <div (click)="goToDetail(item.id)" class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h4 class="font-bold text-slate-900">{{item.name}}</h4>
                    <p class="text-xs text-slate-500 font-mono mt-0.5">NSS: {{item.nss}}</p>
                  </div>
                  <span [class]="'text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ' + getStatusClass(item.statusService)">
                    {{item.status}}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-50">
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">CURP</p>
                    <p class="text-xs font-medium truncate">{{item.curp}}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Asesor</p>
                    <p class="text-xs font-medium">{{item.consultantName}}</p>
                  </div>
                </div>
                <div class="mt-2 flex justify-between items-center">
                  <span class="text-[10px] text-slate-400 italic">Fecha: {{item.fechaActualizacion}}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </main>
      <!-- Reusing the BottomNav Component -->
      <app-bottom-nav activeTab="inicio"></app-bottom-nav>
    </div>
    @if (isLoading()) {
    <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm animate-fade-in">
      <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
        <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p class="text-primary font-black uppercase tracking-widest text-xs">Descargando archivo...</p>
      </div>
    </div>

    
  }
    `,
})
export class DashboardAdminComponent {

  private allClients = signal<any[]>([]);

  isLoading = signal(false);

  // Término de búsqueda reactivo
  searchTerm = signal('');

  stats = signal([
    { label: 'Total Clientes', value: '1,250', change: '+12%', color: 'text-green-600' },
    { label: 'Pendientes', value: '45', sub: 'Por procesar', color: 'text-amber-500' },
    { label: 'En Revisión', value: '12', sub: 'En auditoría', color: 'text-[#135bec]' },
    { label: 'Completados', value: '1,193', sub: 'Afiliaciones exitosas', color: 'text-green-600' },
  ]);

  selectedTab = signal('Todos');

  tabs = signal(['Todos', 'PENDIENTE', 'PRÓXIMO VENCIMIENTO', 'DAR DE BAJA','RENOVAR', 'SEGURO VENCIDO', 'EN PROCESO', 'ACTIVO', 'CON PROVEEDOR', 'PENDIENTE REVISIÓN PAGO ALTA', 'PENDIENTE PAGO ALTA']);

  affiliations = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const activeTab = this.selectedTab();
    let filtered = this.allClients();

    // 2. Primero filtramos por Pestaña (Status)
    if (activeTab !== 'Todos') {
      filtered = filtered.filter(c => c.statusService === activeTab);
    }

    // 3. Luego filtramos por término de búsqueda
    if (term) {
      return filtered.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.nss.toLowerCase().includes(term) ||
        c.curp.toLowerCase().includes(term)
      );
    }

    // Si no hay búsqueda y es "Todos", podrías mantener tu slice(0, 4) o mostrar todo lo de la pestaña
    return activeTab === 'Todos' ? filtered.slice(0, 4) : filtered;
  });

  constructor(private customerService : CustomerService, private router : Router) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: (res) => {
        if(res.message && res.object){
          this.allClients.set(res.object);
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToCreateUser() {
    this.router.navigate(['/consultant-create']);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'ACTIVO': return 'bg-green-100 text-green-600';
      case 'PENDIENTE': return 'bg-amber-100 text-amber-600';
      case 'EN PROCESO': return 'bg-[#135bec1a] text-[#135bec]';
      case 'RENOVAR': return 'bg-[#135bec1a] text-[#135bec]';
      case 'SEGURO VENCIDO': return 'bg-red-100 text-red-600';
      case 'PRÓXIMO VENCIMIENTO': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-[#135bec]';
    }
  }

  getFile() {
    this.isLoading.set(true);
    this.customerService.getFile().subscribe((response: any) => {
      const blob = response.body; // El archivo está en el body
      const contentDisposition = response.headers.get('content-disposition');
      
      let fileName = 'reporte.xlsx';
      if (contentDisposition) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) { 
          fileName = matches[1].replace(/['"]/g, '');
        }
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      this.isLoading.set(false);
      this.ngOnInit(); // Recargar datos después de la descarga
    });
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  goToDetail(id: string) {
    this.router.navigate(['/client-edit', id]);
  }
}