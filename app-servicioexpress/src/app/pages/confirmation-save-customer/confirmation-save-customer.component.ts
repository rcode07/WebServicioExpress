import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-save-customer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in font-public relative overflow-hidden">
      
      <!-- TopAppBar -->
      <header class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-4 h-16 flex items-center justify-between">
        <button (click)="goToDashboard()" class="text-primary p-2 active:scale-90 transition-transform flex items-center shrink-0">
          <span class="material-symbols-outlined text-2xl font-bold">arrow_back_ios</span>
        </button>
        <h2 class="text-slate-900 dark:text-white text-lg font-black leading-tight uppercase tracking-wider flex-1 text-center">Confirmación</h2>
        <div class="w-12 shrink-0"></div> <!-- Spacer -->
      </header>

      <main class="flex-1 overflow-y-auto pb-32">
        <!-- Success Icon Section with Animation -->
        <div class="flex flex-col items-center justify-center pt-12 pb-8">
          <div class="bg-green-500/10 p-8 rounded-full animate-success-blob relative">
            <div class="bg-green-500 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 ring-8 ring-green-500/5">
              <span class="material-symbols-outlined !text-6xl font-black scale-in">check</span>
            </div>
            <!-- Floating particles simulation -->
            <div class="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-float-1"></div>
            <div class="absolute bottom-4 left-0 w-2 h-2 bg-green-300 rounded-full animate-float-2"></div>
          </div>
        </div>

        <!-- Headline & Description -->
        <div class="px-8 text-center space-y-3">
          <h2 class="text-primary dark:text-blue-400 tracking-tight text-3xl font-black leading-tight">¡Actualización Exitosa!</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed max-w-[280px] mx-auto">
            Los datos del cliente han sido actualizados correctamente en el sistema de seguros médicos.
          </p>
        </div>

        <!-- Client Summary Card Detail -->
        <div class="px-6 mt-10">
          <div class="flex flex-col gap-5 rounded-[2.5rem] bg-white dark:bg-slate-900 p-7 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <!-- Background decoration -->
            <div class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:scale-110 transition-transform"></div>
            
            <div class="flex items-center gap-4 border-b border-slate-50 dark:border-slate-800 pb-5">
              <div class="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                <span class="material-symbols-outlined text-3xl font-bold fill-1">person</span>
              </div>
              <div>
                <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-0.5">Cliente Registrado</p>
                <p class="text-slate-900 dark:text-white text-xl font-black leading-tight">{{ customer()?.name }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div class="flex flex-col gap-1">
                <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">CURP</p>
                <p class="text-slate-900 dark:text-white text-sm font-mono font-bold tracking-tighter">{{ customer()?.curp }}</p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Folio Asignado</p>
                <p class="text-primary font-black text-sm">#{{ customer()?.id }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-1.5 pt-2">
              <p class="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Tipo de Póliza</p>
              <div class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl">
                <span class="material-symbols-outlined text-primary text-xl fill-1">verified_user</span>
                <p class="text-slate-900 dark:text-white text-sm font-black tracking-tight">IMSS</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons Section -->
        <div class="flex flex-col gap-4 p-8 mt-4">
          <button (click)="goToDashboard()" class="w-full bg-secondary hover:bg-yellow-400 text-deep-blue font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-secondary/20 active:scale-[0.97] uppercase tracking-widest text-sm flex items-center justify-center gap-3">
            <span>Volver al Inicio</span>
            <span class="material-symbols-outlined font-black">home</span>
          </button>
        </div>
      </main>

      <!-- iOS Home Indicator -->
      <div class="fixed bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-full z-[110]"></div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    
    .scale-in { animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
    
    .animate-success-blob { animation: blob 4s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes blob { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }

    .animate-float-1 { animation: float 3s infinite ease-in-out; }
    .animate-float-2 { animation: float 4s infinite ease-in-out reverse; }
    @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }

    ::-webkit-scrollbar { display: none; }
  `]
})
export class ConfirmationSaveCustomerComponent {
  
  customer = signal<any>(null);
  
  constructor(private router : Router) {
    const navigation = this.router.getCurrentNavigation();
    const stateCustomer = navigation?.extras?.state?.['customer'];

    if (stateCustomer) {
      this.customer.set(stateCustomer);
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard-admin']);
  }
}
