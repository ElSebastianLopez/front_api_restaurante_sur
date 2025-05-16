export interface Detalle {
  plato: string;
  supervisor: string;
  valor: number;
}

export interface Venta {
  nroFactura: number;
  fecha: string;
  cliente: string;
  mesa: string;
  mesero: string;
  total: number;
  idCliente: number;
  idMesero: number;
  nroMesa: number;
  detalles: Detalle[];
}
