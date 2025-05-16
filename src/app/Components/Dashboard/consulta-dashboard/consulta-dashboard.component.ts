import { Component } from '@angular/core';
import { MeseroService } from '../../../core/services/Meseros/mesero.service';
import { ClienteService } from '../../../core/services/Clientes/cliente.service';
import { DetalleFacturaService } from '../../../core/services/DetalleFactura/detalle-factura.service';
import { Mesero } from '../../../core/models/Meseros/Mesero';
import { Cliente } from '../../../core/models/Clientes/Cliente';
import { ProductoMasVendido } from '../../../core/models/ProductoMasVendido/ProductoMasVendido';
import { FormsModule } from '@angular/forms';
import localeEsCO from '@angular/common/locales/es-CO';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-consulta-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './consulta-dashboard.component.html',
})
export class ConsultaDashboardComponent {
  // Datos
  ventasMesero: Mesero[] = [];
  clientesFiltrados: Cliente[] = [];
  productosVendidos: ProductoMasVendido[] = [];

  // Filtros
  valorMinimo: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private meseroService: MeseroService,
    private clienteService: ClienteService,
    private detalleFacturaService: DetalleFacturaService
  ) {}

  consultarVentasMesero(): void {
  this.meseroService.getVentasPorMesero().subscribe({
    next: (response) => {
      if (response.success) {
        this.ventasMesero = response.data;
      }
    },
    error: (err) => {
      console.error('Error al obtener ventas por mesero:', err);
    },
  });
}
  consultarClientes(): void {
    this.clienteService.getTodosLosClientesConConsumo().subscribe({
      next: (clientes) => {
        this.clientesFiltrados = clientes.filter(
          (c) => c.totalConsumo >= this.valorMinimo
        );
      },
      error: (err) => {
        console.error('Error al obtener clientes:', err);
      },
    });
  }

  consultarProductosVendidos(): void {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor seleccione el rango de fechas.');
      return;
    }

    this.detalleFacturaService
      .getProductosMasVendidos(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (productos) => {
          this.productosVendidos = productos;
        },
        error: (err) => {
          console.error('Error al obtener productos más vendidos:', err);
        },
      });
  }
}
