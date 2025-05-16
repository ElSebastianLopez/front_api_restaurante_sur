import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// Añade estos proveedores de Angular Material
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';

// Configuración opcional para tooltips
const tooltipOptions: MatTooltipDefaultOptions = {
  showDelay: 500,
  hideDelay: 0,
  touchendHideDelay: 0,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: tooltipOptions } // <-- Opcional
  ]
};
