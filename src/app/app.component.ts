import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrearFacturaComponent } from './Components/Factura/crear-factura/crear-factura.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CrearFacturaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'restaurante-app';
}
