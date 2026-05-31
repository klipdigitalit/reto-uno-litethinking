# Reto Técnico QA Automation – Transferencias Asíncronas con Kafka y Playwright

## Descripción

Este proyecto implementa una solución de automatización QA para validar un flujo de procesamiento asíncrono utilizando una arquitectura basada en eventos.

La aplicación simula el envío de transferencias bancarias donde la solicitud es procesada de forma asíncrona mediante Apache Kafka. El estado de la transacción evoluciona desde **PENDIENTE** hasta **APROBADO**, permitiendo validar estrategias de sincronización y polling inteligente desde pruebas automatizadas.

---

# Objetivos del reto

* Implementar una arquitectura basada en eventos utilizando Kafka.
* Desarrollar pruebas E2E utilizando Playwright.
* Aplicar el patrón de diseño Page Object Model (POM).
* Implementar Polling Inteligente para validaciones asíncronas.
* Orquestar la ejecución mediante GitHub Actions.
* Reducir escenarios de flakiness en pruebas E2E.

---

# Arquitectura de la solución

```text
Frontend React
      │
      ▼
Backend API (Express)
      │
      ▼
Kafka Topic
transferencias-creadas
      │
      ▼
Worker Kafka
      │
      ▼
Actualización Estado
(PENDIENTE → APROBADO)
      │
      ▼
Frontend consulta estado
(Polling)
      │
      ▼
Playwright valida resultado
```

---

# Tecnologías utilizadas

## Frontend

* React
* Vite
* TypeScript

## Backend

* Node.js
* Express

## Mensajería

* Apache Kafka
* KafkaJS

## Automatización

* Playwright
* Page Object Model (POM)

## DevOps

* Docker Compose
* GitHub Actions

---

# Estructura del proyecto

```text
reto-uno-litethinking
│
├── .github/
│   └── workflows/
│       └── test-pipeline.yml
│
├── backend/
│   ├── server.js
│   ├── worker.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── tests/
│   ├── pages/
│   │   └── TransferPage.js
│   │
│   └── transfer-async.spec.js
│
├── docker-compose.yml
├── package.json
├── playwright.config.ts
└── README.md
```


# Flujo funcional

## 1. Crear transferencia

El usuario registra:

* Cuenta destino
* Valor de transferencia

La aplicación crea una transacción con estado:

```text
PENDIENTE
```

---

## 2. Publicar evento Kafka

El backend publica un evento en el tópico:

```text
transferencias-creadas
```

---

## 3. Procesamiento asíncrono

El Worker consume el evento desde Kafka y simula el procesamiento bancario.

Posteriormente actualiza el estado a:

```text
APROBADO
```

---

## 4. Consulta de estado

El frontend ejecuta consultas periódicas al backend para conocer el estado actualizado.

---

## 5. Validación automatizada

Playwright implementa Polling Inteligente para esperar dinámicamente hasta que el estado cambie a:

```text
Estado: APROBADO
```

sin utilizar esperas fijas (sleep).

---

# Instalación local

## 1. Levantar Kafka

```bash
docker compose up -d
```

---

## 2. Instalar dependencias Backend

```bash
cd backend
npm install
```

---

## 3. Instalar dependencias Frontend

```bash
cd frontend
npm install
```

---

## 4. Instalar dependencias raíz

```bash
npm install
```

---

## 5. Instalar Playwright

```bash
npx playwright install --with-deps
```

---

# Ejecución local

## Backend

```bash
cd backend
npm run start-server
```

---

## Worker Kafka

```bash
cd backend
npm run start-worker
```

---

## Frontend

```bash
cd frontend
npm run dev
```

Aplicación disponible en:

```text
http://localhost:5173
```

---

# Ejecución de pruebas

## Ejecución simple

```bash
npx playwright test
```

---

## Ejecución del reto

```bash
npx playwright test tests/transfer-async.spec.js --workers=1 --repeat-each=3
```

---

# Estrategia de Polling Inteligente

La validación del estado utiliza:

```javascript
expect.poll()
```

permitiendo:

* Espera dinámica.
* Timeout configurable.
* Eliminación de sleeps fijos.
* Reducción de flakiness.

Timeout configurado:

```text
10 segundos
```

---

# Integración Continua

El proyecto cuenta con un pipeline CI/CD implementado mediante GitHub Actions.

El pipeline realiza:

1. Checkout del repositorio.
2. Instalación de dependencias.
3. Instalación de navegadores Playwright.
4. Levantamiento de Kafka.
5. Levantamiento Backend.
6. Levantamiento Worker.
7. Levantamiento Frontend.
8. Ejecución de pruebas E2E.
9. Publicación de evidencias.

---

# Repositorio

https://github.com/klipdigitalit/reto-uno-litethinking

# Evidencias del reto

Para facilitar la revisión del ejercicio, se incluye el documento:

```text
Evidencias_del_reto.pdf
```

Este documento contiene:

* Evidencias de la Fase 1 – Preparación del entorno local.
* Evidencias de la Fase 2 – Automatización resiliente con Playwright.
* Evidencias de la Fase 3 – Orquestación CI/CD con GitHub Actions.
* Capturas de pantalla de Kafka UI.
* Evidencias de ejecución de pruebas.
* Capturas del pipeline en GitHub Actions.
* Hallazgos y soluciones aplicadas durante la implementación.

Se recomienda revisar este documento junto con el código fuente para comprender el proceso completo de construcción y validación de la solución.
