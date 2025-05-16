import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../../core/models/Clientes/Cliente';
import { Mesa } from '../../../core/models/Mesa/Mesa';
import { Mesero } from '../../../core/models/Meseros/Mesero';
import { ClienteService } from '../../../core/services/Clientes/cliente.service';
import { MesaService } from '../../../core/services/Mesa/mesa.service';
import { MeseroService } from '../../../core/services/Meseros/mesero.service';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FacturaService } from '../../../core/services/Factura/factura.service';
import { FacturaRefreshService } from '../../../core/services/FacturaRefreshService/factura-refresh.service';

@Component({
  selector: 'app-crear-factura',
  standalone: true,                      // importante para standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  facturaForm: FormGroup;

  clientes: Cliente[] = [];
  mesas: Mesa[] = [];
  meseros: Mesero[] = [];

  constructor(
    private fb: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly mesaService: MesaService,
    private readonly meseroService: MeseroService,
    private readonly facturaService: FacturaService,
    private readonly facturaRefreshService: FacturaRefreshService,
    private readonly dialogRef: MatDialogRef<CrearFacturaComponent>,
  ) {
    this.facturaForm = this.fb.group({
      idCliente: [null, Validators.required],
      nroMesa: [null, [Validators.required, Validators.min(1)]],
      idMesero: [null, Validators.required],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required]
    });
  }

  ngOnInit() {
    this.cargarClientes();
    this.cargarMesas();
    this.cargarMeseros();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: data => this.clientes = data,
      error: err => console.error('Error al cargar clientes', err)
    });
  }

  cargarMesas() {
    this.mesaService.getMesas().subscribe({
      next: data => this.mesas = data,
      error: err => console.error('Error al cargar mesas', err)
    });
  }

  cargarMeseros() {
    this.meseroService.getMeseros().subscribe({
      next: data => this.meseros = data,
      error: err => console.error('Error al cargar meseros', err)
    });
  }

  cancelar() {
    // lógica para cerrar modal sin guardar
  }

  crear() {
  if (this.facturaForm.valid) {
    const factura = this.facturaForm.value;

    this.facturaService.crearFactura(factura).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Factura creada: ' + response.message);
          this.facturaRefreshService.notifyRefresh();  // Notificar refresco
          this.dialogRef.close(true);
        } else {
          alert('Error al crear factura: ' + response.message);
        }
      },
      error: (err) => alert('Error en la petición: ' + err.message)
    });
  } else {
    this.facturaForm.markAllAsTouched();
  }
}

}
