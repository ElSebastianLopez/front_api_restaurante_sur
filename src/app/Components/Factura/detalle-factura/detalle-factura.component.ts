import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleFacturaService } from '../../../core/services/DetalleFactura/detalle-factura.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DetalleFactura } from '../../../core/models/DetalleFactura/DetalleFactura';

@Component({
  selector: 'app-detalle-factura',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  template: `
    <h2 mat-dialog-title>Detalle Factura #{{nroFactura}}</h2>

    <mat-dialog-content>
      <table mat-table [dataSource]="detalles" class="mat-elevation-z8" style="width: 100%;">

        <ng-container matColumnDef="plato">
          <th mat-header-cell *matHeaderCellDef> Plato </th>
          <td mat-cell *matCellDef="let detalle"> {{detalle.plato}} </td>
        </ng-container>

        <ng-container matColumnDef="supervisor">
          <th mat-header-cell *matHeaderCellDef> Supervisor </th>
          <td mat-cell *matCellDef="let detalle"> {{detalle.supervisor}} </td>
        </ng-container>

        <ng-container matColumnDef="valor">
          <th mat-header-cell *matHeaderCellDef> Valor </th>
          <td mat-cell *matCellDef="let detalle"> {{detalle.valor | currency}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <div *ngIf="errorMessage" style="color: red; margin-top: 1em;">
        {{errorMessage}}
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="cerrar()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class DetalleFacturaComponent implements OnInit {
  nroFactura: number;
  detalles: DetalleFactura[] = [];
  errorMessage = '';
  displayedColumns = ['plato', 'supervisor', 'valor'];

  constructor(
    private detalleFacturaService: DetalleFacturaService,
    private dialogRef: MatDialogRef<DetalleFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nroFactura: number }
  ) {
    this.nroFactura = data.nroFactura;
  }

  ngOnInit() {
    this.detalleFacturaService.getDetallesFactura(this.nroFactura).subscribe({
      next: (res) => {
        if (res.success) {
          this.detalles = res.data;
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar detalles: ' + err.message;
      }
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
