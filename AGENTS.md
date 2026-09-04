# AGENTS.md — Koko Atelier Galway

> Contexto permanente del proyecto para el agente de código (Codex).
> Guarda este archivo en la raíz del repositorio. Se lee al inicio de cada sesión
> para no tener que re-explicar el contexto cada vez.
>
> _Última actualización: 16 de agosto de 2026._

---

## 1. Qué estamos construyendo

Sistema para **Koko Atelier Galway**, un taller de arreglos de ropa y sastrería
de una sola persona en Galway, Irlanda. Sustituye la gestión actual en papel y boli.

Dos productos:

1. **Web pública** — sitio rápido, mobile-first, con **SEO local para Galway**
   (que aparezca en búsquedas como "clothing alterations Galway", "tailor Galway",
   "bridal alterations Galway").
2. **Panel privado de gestión** — herramienta interna simple para el día a día:
   nuevo pedido, entregas de la semana, marcar como listo / recogido, buscar cliente.
   Nada que la sastra no necesite.

Usuaria principal (la sastra): Liudmyla. El panel debe ser **simple y guiado**;
ella nunca ve pantallas de administración técnicas.

**Arquitectura — dos aplicaciones SEPARADAS, dos repos:** la web pública y el panel privado
son **proyectos/deploys distintos, en dos repositorios Git separados**, aunque en la demo
actual conviven en el mismo repo (`/admin-demo/`). Se separan:
- **Web pública** — **Next.js** (export estático) en el dominio (`kokoatelier.ie`). Es el
  repo actual (`galway-alterations-demo`), al que se le **quita el panel**.
- **Panel privado** — app aparte (Next.js), autenticada, contra Directus, en un **repo nuevo**
  y previsiblemente en un subdominio (p. ej. `panel.kokoatelier.ie`). Reutiliza la UI del
  admin actual como punto de partida.
Pueden compartir marca/estilos, pero son bases de código y despliegues independientes.

---

## 2. Funcionalidad — flujo del pedido (happy path)

Es el dominio central; toda la lógica gira en torno a esto:

1. El cliente entra con una prenda; la sastra mira y le dice el precio.
2. Le pasa la **tablet en modo kiosko**: el cliente rellena nombre, teléfono, correo
   + **casilla de consentimiento RGPD**. El kiosko **se resetea** entre clientes.
3. La sastra añade los detalles: prenda, tipo de arreglo, **foto**, medidas, precio y
   **señal/depósito** si la hay. Se **imprime un ticket con nº de orden** para prender
   en la prenda.
4. El cliente recibe un **email automático de confirmación** con lo dejado y la fecha
   de recogida.
5. Se crea la orden → estado **"Pendiente"** en el panel (móvil/tablet).
6. Al terminarla, la sastra la marca **"Lista para recoger"** → aviso por email al cliente.
7. Recogida: entrega la prenda, cobra el resto, marca **"Terminado"**.
8. Al día siguiente, email al cliente con **enlace a reseña de Google** (impulsa SEO local).

Reglas de dominio a respetar:
- Estados del pedido: **Received → In progress → Ready → Collected** (+ Cancelled).
- **Varias prendas por orden** permitidas.
- Citas de **prueba** para novia/trajes.
- Teléfono siempre en **formato internacional** (Irlanda: prefijo `353`, sin `+` ni `00`).
- Avisos por **EMAIL** (gratis). WhatsApp solo como **botón click-to-chat** en el panel:
  `https://wa.me/<telefono_internacional>?text=<mensaje_url_encoded>` — abre el chat con el
  mensaje ya escrito; la sastra pulsa enviar desde su móvil. Fallback SMS si el número no
  tiene WhatsApp. **No** usar WhatsApp Business API (tiene coste).

---

## 3. Stack técnico

- **Web pública:** **Next.js 16** (App Router, React 19, Tailwind) con **export estático**,
  desplegada en Netlify. **Ya existe** con tests (Vitest) en el repo `galway-alterations-demo`;
  se **conserva** y se le **separa el panel**. SEO con la **Metadata API de Next** + JSON-LD
  (LocalBusiness/TailorShop) + `src/app/sitemap.ts` + `src/app/robots.ts`. Datos del negocio
  centralizados en `src/data/site.ts` (hoy con placeholders "To be confirmed").
- **Panel de gestión:** **app separada, en su propio repo** (Next.js, autenticada) que habla
  con Directus por su **API REST/GraphQL**. Reutiliza la UI del admin actual
  (`src/components/admin/*`, i18n EN/UK) reemplazando el `localStorage` por Directus.
- **Backend (datos y API):** **Directus** — plataforma headless open source sobre **PostgreSQL**,
  self-hosted en el VPS (Easypanel). Se definen las **colecciones** propias (clientes, órdenes,
  prendas, citas, pagos…) y Directus auto-genera **API REST y GraphQL**, con roles y permisos.
  Corre por detrás; la sastra nunca ve su panel de administración.
- **Automatización (emails/notificaciones):** **Directus Flows** (nativo) ante cambios de
  estado, o un pequeño servicio aparte si hace falta lógica más compleja. El email de reseña
  del día siguiente va programado. Idempotencia + reintentos para no duplicar avisos.
- **Envío de email:** servicio transaccional (Resend / Brevo) en capa gratuita, con
  **dominio de envío verificado** (registros DNS) para no caer en spam.
- **Dominio/DNS/seguridad:** Cloudflare (DNS, CDN, SSL, DDoS, oculta la IP de origen).
  Dominio recomendado: `kokoatelier.ie`.
- **Infra:** VPS (Hostinger) con **Easypanel** (Docker, HTTPS) para Directus; web y panel en
  Netlify. Backups regulares de la base de datos.
- **Lenguaje del código de aplicación:** **TypeScript** (Next.js/React; extensiones/hooks de
  Directus y cualquier servicio auxiliar).

---

## 4. Arquitectura y organización del código

- **Web pública (Next.js):** App Router en `src/app/`, componentes en `src/components/`,
  datos en `src/data/`, lógica de dominio pura en `src/domain/`. Tests con Vitest junto al
  código (`*.test.ts`).
- **Panel (Next.js, repo aparte):** front-end contra Directus; la lógica que no sea de UI
  (mapeos, reglas de estado, validaciones) se mantiene en módulos puros y testeables.
- **Directus** aporta la capa de datos, auth, permisos y automatizaciones; el código custom
  (hooks/extensiones) se mantiene pequeño y encapsulado.
- Principio general: mantener la **lógica de negocio en funciones puras** (testeables sin red
  ni BD) y aislar los adaptadores (Directus, email) detrás de interfaces.

---

## 5. Metodología: SDD + TDD (cómo debes trabajar)

### 5.1 Spec-Driven Development (SDD)
El código se implementa **exactamente** contra el contrato que recibes en el prompt.
- **Respeto absoluto al contrato:** implementa tal cual las interfaces, métodos, tipos y
  esquemas de la especificación. **NUNCA** cambies nombres de funciones, tipos, argumentos
  o propiedades.
- **Cero improvisación:** no añadas endpoints, métodos públicos ni parámetros que no se
  pidan explícitamente. Helpers/utilidades → privados y encapsulados.
- **Programación defensiva:** valida estrictamente todas las entradas. Los errores y
  excepciones deben coincidir con el contrato (tipos de error correctos, códigos HTTP
  correctos).

### 5.2 Test-Driven Development (TDD) — Red-Green-Refactor
No escribas código de producción sin un test que lo verifique. Ciclo:
1. 🔴 **RED:** escribe primero el test que falla (define el comportamiento esperado).
2. 🟢 **GREEN:** escribe el **mínimo** código para que pase. Se permite "Fake It 'Til You
   Make It" (datos estáticos temporales para llegar a verde rápido).
3. ♻ **REFACTOR:** mejora diseño y legibilidad sin cambiar el comportamiento externo.
   Los tests deben quedar siempre en verde.

**Triangulación** — acorrala la lógica con tres puntos: el **límite exacto** donde cambia
la regla, **por encima** del límite y **por debajo**.

**Pirámide de tests:**
- **Domain (unit — muchos):** lógica pura, objetos reales, sin dependencias externas.
- **Application/Casos de uso (medio):** flujos con test doubles (Fakes/Stubs) para los ports.
- **Infrastructure (integración — medio):** adaptadores contra BD real/testcontainers o
  clientes de API externos.
- **UI/E2E (pocos):** flujos de extremo a extremo.

### 5.3 NFRs a tener presentes
Rendimiento (Lighthouse SEO ~100 en la web), consistencia, seguridad (auth del panel,
fotos privadas con acceso restringido) y disponibilidad.

---

## 6. Cómo llegan las tareas (flujo de trabajo)

- La **especificación y los prompts los redacta Claude**; **tú (Codex) escribes el código**.
- Recibirás las tareas **de una en una**, secuenciales, cada una sobre estado verde verificado.
- Cada prompt vendrá autocontenido con: **contexto** (capa + rutas de archivo), **contrato
  exacto** (nombres congelados), **tests primero (RED)** con puntos de triangulación,
  **implementación mínima (GREEN)**, **restricciones** y **definición de "hecho"** (tests en
  verde, lint/typecheck ok, build ok — usa `npm run check`).
- **Todo cambio en el repo se documenta con git** (commits pequeños y descriptivos por tarea).
- Si algo del prompt entra en conflicto con este documento, **sigue el prompt** para esa tarea
  concreta y **avisa** de la discrepancia en tu respuesta.

---

## 7. Idioma
- **Código, nombres de identificadores, tests y comentarios técnicos: en inglés.**
- Web pública y mensajes al cliente: **inglés**. El panel privado soporta **inglés y ucraniano**.
- Explicaciones al equipo (Marcos): en español si lo pide.
