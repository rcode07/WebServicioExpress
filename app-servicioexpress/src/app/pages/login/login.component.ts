import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
  
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template : `
    <div class="flex flex-col h-screen bg-white dark:bg-slate-900 animate-fade-in relative">
      <!-- Header with Gradient and Logo -->
      <div class="bg-gradient-to-br from-deep-blue to-blue-900 h-[35%] w-full flex flex-col items-center justify-center relative overflow-hidden shrink-0">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary opacity-5 rounded-full"></div>
        
        <div class="z-10 flex flex-col items-center">
          <div class="relative mb-2">
            <div class="w-20 h-20 border-4 border-secondary rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-5xl text-secondary">speed</span>
            </div>
          </div>
          <h1 class="font-logo text-2xl text-white tracking-widest text-center">
            SERVICIO<br/>
            <span class="text-secondary text-3xl">EXPRESS</span>
          </h1>
          <p class="text-[10px] text-white/60 tracking-[0.3em] font-bold mt-1">L I D E R I G O</p>
        </div>
      </div>

      <!-- Login Form Section -->
      <div class="flex-1 px-8 pt-8 flex flex-col overflow-y-auto">
        <div class="mb-8">
          <h2 class="text-2xl font-bold dark:text-white">Inicio de Sesión</h2>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Sistema de Alta de Seguro Médico</p>
        </div>

        <form [formGroup]="form" class="space-y-5" (submit)="$event.preventDefault(); login()">
          <!-- Advisor ID Input -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">ID DE ASESOR</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">badge</span>
              <input formControlName="userName"
                type="text" 
                class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 dark:text-white transition-all outline-none" 
                placeholder="Ingresa tu ID" 
                value="">
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">CONTRASEÑA</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
              <input 
                formControlName = "password"
                [type]="showPassword() ? 'text' : 'password'" 
                class="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-secondary/50 dark:text-white transition-all outline-none" 
                placeholder="" 
                value="password">
              <button 
                type="button"
                (click)="togglePassword()"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">
                <span class="material-symbols-outlined text-xl">
                  {{ showPassword() ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <div class="flex justify-end">
            <a href="#" class="text-xs font-semibold text-primary dark:text-blue-400">¿Olvidaste tus credenciales?</a>
          </div>

          <!-- Login Button -->
          <button 
            type="submit" 
            class="w-full bg-secondary hover:bg-yellow-500 text-deep-blue font-bold py-4 rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4">
            ENTRAR AL PORTAL
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </form>

        <!-- Support Section -->
        <div class="mt-auto py-8">
          <div class="flex items-center gap-3 justify-center py-4 px-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-green-500">chat</span>
            </div>
            <div class="flex flex-col">
              <span class="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">SOPORTE DISPONIBLE</span>
              <span class="text-sm font-bold dark:text-white">449 638 9920</span>
            </div>
          </div>
        </div>
      </div>

      <!-- iOS Home Indicator -->
      <div class="h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-2 shrink-0"></div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    input::placeholder { color: #94a3b8; }
    
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `]
})
export class LoginComponent {

  formBuilder = new FormBuilder();

  form : any;

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // const token = localStorage.getItem('access_token');
    // if (token) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  showPassword = signal(false);
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  login(): void {

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
    const payload = {
      userName: this.form.value.userName,
      password : this.form.value.password
    };

    this.auth.login(payload).subscribe({
      next: (tokens) => {
        this.auth.storeToken(tokens);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('login failed', err);
        alert('Login failed. Please check your credetials and try again.')
      }
    });
  }
}