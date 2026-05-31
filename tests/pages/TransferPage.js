const { expect } = require('@playwright/test');

exports.TransferPage = class TransferPage {
  constructor(page) {
    this.page = page;
    this.cuentaDestinoInput = page.locator('input[placeholder*="Cuenta Destino"]');
    this.montoInput = page.locator('input[placeholder*="Monto"]');
    this.enviarTransferenciaButton = page.getByRole('button', {
      name: 'Enviar Transferencia'
    });
    this.estadoTexto = page.locator('#status-box');
  }

  async abrirPagina() {
    await this.page.goto('http://localhost:5173');
  }

  async crearTransferencia(cuentaDestino, monto) {
    await this.cuentaDestinoInput.fill(cuentaDestino);
    await this.montoInput.fill(monto);
    await this.enviarTransferenciaButton.click();
  }

  async esperarEstadoAprobado() {

  await expect.poll(
    async () => {

      const texto = await this.estadoTexto.textContent();

      console.log(`Estado actual: ${texto}`);

      return texto;

    },
    {
      timeout: 10000,
      intervals: [500, 1000]
    }
  ).toContain('APROBADO');

}
};