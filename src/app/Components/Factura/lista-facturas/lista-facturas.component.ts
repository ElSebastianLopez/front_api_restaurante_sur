import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../../core/services/Factura/factura.service';
import { Factura } from '../../../core/models/Factura/Factura';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FacturaRefreshService } from '../../../core/services/FacturaRefreshService/factura-refresh.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DetalleFacturaComponent } from '../detalle-factura/detalle-factura.component';
import { CrearDetalleFacturaComponent } from '../crear-detalle-factura/crear-detalle-factura.component';

@Component({
  selector: 'app-lista-facturas',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css'],
})
export class ListaFacturasComponent implements OnInit {
  facturas: Factura[] = [];
  displayedColumns: string[] = [
    'nroFactura',
    'nombreCliente',
    'nombreMesa',
    'nombreMesero',
    'fecha',
    'acciones',
  ];
  errorMessage = '';
  private refreshSub?: Subscription;

  constructor(
    private facturaService: FacturaService,
    private facturaRefreshService: FacturaRefreshService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cargarFacturas();

    this.refreshSub = this.facturaRefreshService.refreshNeeded$.subscribe(
      () => {
        this.cargarFacturas();
      }
    );
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe({
      next: (data) => (this.facturas = data),
      error: (err) =>
        (this.errorMessage = 'Error cargando facturas: ' + err.message),
    });
  }

  ngOnDestroy() {
    this.refreshSub?.unsubscribe();
  }

  abrirDetalle(nroFactura: number) {
    this.dialog.open(DetalleFacturaComponent, {
      width: '600px',
      data: { nroFactura },
    });
  }

  abrirCrearDetalle(nroFactura: number) {
  const dialogRef = this.dialog.open(CrearDetalleFacturaComponent, {
    width: '500px',
    data: { nroFactura }
  });

  // Pasar nroFactura al componente modal
  dialogRef.componentInstance.nroFactura = nroFactura;

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado === true) {
      // refrescar detalles, si quieres
    }
  });
}
}
