import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrearFacturaComponent } from '../../Factura/crear-factura/crear-factura.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogModule } from '@angular/material/dialog';
import { ListaFacturasComponent } from '../../Factura/lista-facturas/lista-facturas.component';

@Component({
  selector: 'app-home',
   standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    ListaFacturasComponent  ,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog: MatDialog) {}

 abrirCrearFactura() {
  const dialogRef = this.dialog.open(CrearFacturaComponent, {
    width: '500px',
  });
}

}
