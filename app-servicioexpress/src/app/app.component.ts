import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-slate-200 dark:border-slate-800">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AppComponent {}