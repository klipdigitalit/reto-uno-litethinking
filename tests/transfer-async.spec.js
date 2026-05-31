const { test } = require('@playwright/test');
const { TransferPage } = require('./pages/TransferPage');

test.describe('Transferencia async', () => {

  test('Debe aprobar transferencia async', async ({ page }) => {
    const transferPage = new TransferPage(page);

    const cuentaDestino = Date.now().toString();
    const monto = '100';

    await transferPage.abrirPagina();

    await transferPage.crearTransferencia(cuentaDestino, monto);

    await transferPage.esperarEstadoAprobado();
  });

});