import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [],
  template: `
     <nav class="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-100 px-8 py-5 pb-12 z-[60] max-w-md mx-auto">
      <div class="flex items-center justify-between">
        <button (click)="navigate('/dashboard')" [class.text-primary]="activeTab === 'inicio'" class="flex flex-col items-center gap-1 text-slate-300">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-[9px] font-bold uppercase">Panel</span>
        </button>
        
        <button (click)="navigate('/register')" class="w-16 h-16 bg-primary text-secondary rounded-full -mt-14 border-[6px] border-slate-50 dark:border-slate-950 shadow-2xl flex items-center justify-center active:scale-90 transition-all">
          <span class="material-symbols-outlined text-4xl">add</span>
        </button>
        
        <button (click)="logout()" class="flex flex-col items-center gap-1 text-slate-300">
          <span class="material-symbols-outlined">logout</span>
          <span class="text-[9px] font-bold uppercase">Cerrar sesión</span>
        </button>
      </div>
    </nav>
  `
})
export class BottomNavComponent {
  @Input() activeTab: string = 'inicio';
  constructor(private router: Router) { }
  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_phone');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }
}
