import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {}

  imprimirHTML(page: HTMLElement, nombreArchivo: string) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    doc.html(page, {
      callback: (docPdf) => {
        const hoy = new Date();
        doc.save(
          'Productos' +
            hoy.getDate() +
            hoy.getMonth() +
            hoy.getFullYear() +
            hoy.getTime() +
            '.pdf'
        );
      },
    });
  }

  imprimir(
    encabezado: string[],
    cuerpo: any[],
    titulo: string,
    guardar?: boolean,
    nombreArchivo?: string
  ) {
    nombreArchivo = nombreArchivo == undefined ? '' : nombreArchivo;
    // Landscape export, 2×4 inches
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });

    autotable(doc, { head: [encabezado], body: cuerpo });

    if (guardar) {
      const hoy = new Date();
      doc.save(
        'Productos' +
          hoy.getDate() +
          hoy.getMonth() +
          hoy.getFullYear() +
          hoy.getTime() +
          '.pdf'
      );
    }
  }
}
