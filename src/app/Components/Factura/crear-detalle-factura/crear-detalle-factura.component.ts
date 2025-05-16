import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SupervisorService } from '../../../core/services/Supervisor/supervisor.service';
import { DetalleFacturaService } from '../../../core/services/DetalleFactura/detalle-factura.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Supervisor } from '../../../core/models/Supervisor/Supervisor';

@Component({
  selector: 'app-crear-detalle-factura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h2 mat-dialog-title>Crear Detalle de Factura</h2>

    <form [formGroup]="detalleForm" (ngSubmit)="crear()">
      <mat-dialog-content>

        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Supervisor</mat-label>
          <mat-select formControlName="idSupervisor" placeholder="Seleccione supervisor">
            <mat-option *ngFor="let sup of supervisores" [value]="sup.idSupervisor">
              {{ sup.nombres }} {{ sup.apellidos }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="detalleForm.get('idSupervisor')?.hasError('required')">Supervisor es requerido</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Plato</mat-label>
          <input matInput formControlName="plato" placeholder="Nombre del plato" />
          <mat-error *ngIf="detalleForm.get('plato')?.hasError('required')">Plato es requerido</mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width: 100%;">
          <mat-label>Valor</mat-label>
          <input matInput type="number" formControlName="valor" placeholder="Valor del plato" />
          <mat-error *ngIf="detalleForm.get('valor')?.hasError('required')">Valor es requerido</mat-error>
          <mat-error *ngIf="detalleForm.get('valor')?.hasError('min')">Valor debe ser mayor que 0</mat-error>
        </mat-form-field>

      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="cancelar()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit">Crear</button>
      </mat-dialog-actions>
    </form>
  `
})
export class CrearDetalleFacturaComponent implements OnInit {
  detalleForm: FormGroup;
  supervisores: Supervisor[] = [];
  nroFactura: number | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly supervisorService: SupervisorService,
    private readonly detalleFacturaService: DetalleFacturaService,
    private readonly dialogRef: MatDialogRef<CrearDetalleFacturaComponent>
  ) {
    this.detalleForm = this.fb.group({
      idSupervisor: [null, Validators.required],
      plato: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.cargarSupervisores();
  }

  cargarSupervisores() {
    this.supervisorService.getSupervisores().subscribe({
      next: data => this.supervisores = data.data, // asumiendo que ApiResponse está envuelto
      error: err => console.error('Error al cargar supervisores', err)
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  crear() {
    if (this.detalleForm.valid) {
      const detalle = {
        nroFactura: this.nroFactura,
        ...this.detalleForm.value
      };

      this.detalleFacturaService.crearDetalleFactura(detalle).subscribe({
        next: res => {
          if (res.success) {
            alert('Detalle creado: ' + res.message);
            this.dialogRef.close(true);
          } else {
            alert('Error al crear detalle: ' + res.message);
          }
        },
        error: err => alert('Error en la petición: ' + err.message)
      });
    } else {
      this.detalleForm.markAllAsTouched();
    }
  }
}
