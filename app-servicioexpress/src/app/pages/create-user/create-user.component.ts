import { AuthService } from '../../core/services/auth.service';
import { ConsultantModel } from '../../models/ConsultantModel';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  template: `
    <div class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark animate-fade-in relative">
    <header class="bg-primary pt-6 pb-10 px-6 rounded-b-[32px] shadow-lg relative overflow-hidden shrink-0">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      
      <div class="flex items-center justify-between relative z-10">
        <button (click)="back()" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white active:scale-90 transition-transform">
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 class="text-lg font-bold text-white uppercase tracking-wider">Nuevo Usuario</h1>
        <div class="w-10"></div> 
      </div>

      <div class="mt-8 flex items-center space-x-4 relative z-10">
        <div class="bg-secondary p-3 rounded-2xl shadow-lg shadow-black/10">
          <span class="material-symbols-outlined text-primary text-3xl fill-1">person_add</span>
        </div>
        <div>
          <p class="text-white/80 text-[10px] uppercase font-black tracking-[0.2em]">Configuración</p>
          <p class="text-white text-xl font-black leading-tight">Crear Cuenta</p>
        </div>
      </div>
    </header>

    <main class="flex-1 px-6 -mt-6 relative z-20 pb-4 overflow-y-auto">
      <form [formGroup]="form" class="space-y-4" (submit)="$event.preventDefault(); submit()">
        <div class="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-xl space-y-5 border border-white dark:border-slate-700">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="name">Nombre Completo</label>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
              <input 
                formControlName="name"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                id="name" 
                placeholder="Ej. Juan Pérez" 
                type="text">
            </div>
          </div>
          <div class="space-y-1.5">
            <div class="flex justify-between items-end px-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest" for="phone">Número de Teléfono</label>
              <span class="text-[10px] font-bold" [ngClass]="form.get('phone')?.value?.length === 10 ? 'text-green-500' : 'text-slate-400'">
                {{ form.get('phone')?.value?.length || 0 }}/10
              </span>
            </div>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">phone_iphone</span>
              <input 
                maxlength="10"
                formControlName="phone"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                id="phone" 
                placeholder="449 000 0000" 
                type="tel">
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="password">Contraseña</label>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
              <input 
                formControlName="password"
                class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium" 
                id="password" 
                placeholder="••••••••" 
                type="password">
            </div>
          </div>

          <div class="space-y-1.5 pb-2">
            <label class="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest" for="price">Precio de Servicio</label>
            <div class="relative group">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">payments</span>
              <input 
                formControlName="price"
                class="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-white transition-all outline-none text-sm font-medium font-mono" 
                id="price" 
                placeholder="0.00" 
                type="number">
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">MXN</span>
            </div>
          </div>

        </div>

        <div class="flex items-center space-x-3 p-4 bg-primary/5 dark:bg-white/5 border border-primary/10 rounded-2xl">
          <span class="material-symbols-outlined text-primary fill-1">info</span>
          <p class="text-[10px] font-bold text-slate-600 dark:text-slate-300 leading-tight">
            <span class="text-primary font-black uppercase">Nota:</span> 
            El precio será tomado en cuenta en todos los servicios que el asesor registre.
          </p>
        </div>
      </form>
    </main>

    <footer class="sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-t-[3rem] shadow-[0_-15px_40px_rgba(0,0,0,0.1)] px-6 py-6 pb-12 z-[100] max-w-md mx-auto w-full">
      <button 
        (click)="submit()" 
        [disabled]="form.invalid || isLoading()"
        class="w-full bg-secondary hover:bg-yellow-400 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed text-primary font-black text-lg py-5 rounded-2xl shadow-xl shadow-secondary/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-3 uppercase tracking-widest">
        
        @if (isLoading()) {
            <span class="material-symbols-outlined animate-spin">progress_activity</span>
            <span>Procesando...</span>
          } @else {
            <span>Registrar Cliente</span>
            <span class="material-symbols-outlined font-black">person_add</span>
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
          <span class="material-symbols-outlined">group</span>
          <span class="text-[9px] font-black uppercase tracking-tighter">Usuarios</span>
        </button>
        <button class="flex flex-col items-center space-y-1 text-slate-300">
          <span class="material-symbols-outlined">settings</span>
          <span class="text-[9px] font-black uppercase tracking-tighter">Ajustes</span>
        </button>
      </nav>
    </footer>

    <div class="fixed bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-full z-[110]"></div>
  </div>

  @if (isLoading()) {
  <div class="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm animate-fade-in">
    <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
      <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p class="text-primary font-black uppercase tracking-widest text-xs">Creando cuenta...</p>
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
export class CreateUserComponent {
  isLoading = signal(false);
  formBuilder = new FormBuilder();
  form : any;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  constructor(private router : Router, private authService : AuthService, private fb: FormBuilder){}

  submit(): void {
    //if (this.form.invalid) return;
    this.isLoading.set(true);

    const newConsultant = new ConsultantModel(
      this.form.value.phone,
      this.form.value.password,
      this.form.value.phone,
      this.form.value.name,
      parseFloat(this.form.value.price)
    );

    this.authService.createConsultant(newConsultant).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('Usuario creado exitosamente');
        this.back();
      },
      error: () => {
        this.isLoading.set(false);
        console.error('Error al crear usuario');
        alert('Ocurrió un error al crear el usuario. Por favor, intenta nuevamente.');
      }
    });
  }
  
  back(): void {
    this.router.navigate(['/dashboard-admin']);
  }
}