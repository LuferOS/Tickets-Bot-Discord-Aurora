# 🎟️ Aurora Tickets: Gestión Profesional de Soporte 🛠️

### **Autor:** LuferOS

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=nodedotjs&style=for-the-badge)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/Discord.js-14.x-blue?logo=discord&style=for-the-badge)](https://discord.js.org/)
[![Base de Datos](https://img.shields.io/badge/Base%20de%20Datos-JSON-orange?logo=json&style=for-the-badge)](https://www.json.org/json-es.html)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-lightgrey?style=for-the-badge)](LICENSE)

---

## 🌌 ¿Qué es Aurora Tickets?

Aurora Tickets es un bot de Discord diseñado para profesionalizar y automatizar la gestión de soporte en tu servidor. A diferencia de otros bots que requieren un panel web complejo, Aurora se configura de manera íntegra y sencilla a través de comandos directamente en Discord.

Su propósito es crear un flujo de trabajo claro y ordenado, permitiendo a los usuarios solicitar ayuda mediante la creación de canales privados (tickets) a los que solo ellos y el equipo de staff designado pueden acceder. Eficiencia, privacidad y organización en un solo bot.

---

## ✨ Características Principales

* **⚙️ Gestión de Tickets Profesional:**
    * Despliega paneles interactivos con un botón para que los usuarios puedan crear tickets fácilmente en los canales que tú designes.
    * Genera canales de texto privados y seguros para cada solicitud de soporte.
    * Asigna automáticamente los permisos correctos para que solo el creador del ticket y el staff puedan ver e interactuar en el canal.

* **📜 Transcripciones Automáticas en HTML:**
    * Al cerrar un ticket, el bot genera una transcripción completa de la conversación en un archivo HTML limpio y legible.
    * Envía automáticamente la transcripción a un canal de registros designado para el archivo y la consulta del staff.
    * ¡El usuario que creó el ticket también recibe una copia de la transcripción en sus mensajes directos para sus propios registros!

* **🔧 Configuración Sencilla con Comandos Slash (`/`):**
    * **`/setup`**: El comando de administrador para la configuración inicial. Permite designar el rol del staff, la categoría de canales para tickets y el canal de registros.
    * **`/panel`**: Un comando simple para que los administradores desplieguen el panel de "Crear Ticket" en cualquier canal.
    * **`/close`**: Un comando de utilidad (además del botón en el ticket) para que el staff o el creador puedan cerrar el ticket actual.

---

## 🚀 Empezando con Aurora Tickets

Sigue estos pasos para poner a Aurora Tickets en funcionamiento en tu servidor de Discord.

### **Prerrequisitos**

Asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
* [Git](https://git-scm.com/downloads)

### **Instalación**

1.  **Clona el Repositorio:**
    ```bash
    git clone [https://github.com/LuferOS/Tickets-Bot-Discord-Aurora.git](https://github.com/LuferOS/Tickets-Bot-Discord-Aurora.git)
    cd AuroraTickets
    ```

2.  **Instala Dependencias:**
    Utiliza `npm` para instalar todas las librerías necesarias para el bot.
    ```bash
    npm install
    ```

3.  **Configura `config.json`:**
    Crea un archivo `config.json` en la raíz de tu proyecto con la siguiente estructura. Asegúrate de obtener tu `token`, `clientId` y `guildId` desde el [Portal de Desarrolladores de Discord](https://discord.com/developers/applications):

    ```json
    {
        "clientId": "TU_CLIENT_ID_DEL_BOT",
        "guildId": "TU_ID_DE_SERVIDOR",
        "token": "TU_TOKEN_SECRETO_DEL_BOT"
    }
    ```

    * `clientId`: El ID de aplicación de tu bot.
    * `guildId`: El ID del servidor de Discord donde usarás el bot.
    * `token`: El token secreto de tu bot (¡mantenlo en secreto!).

### **Despliegue de Comandos Slash**

Para que los comandos `/setup`, y `/panel` funcionen, necesitas desplegarlos en Discord. Ejecuta el siguiente script en tu terminal:

```bash
node deploy-commands.js
