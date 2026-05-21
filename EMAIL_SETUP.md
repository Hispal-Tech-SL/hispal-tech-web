# Configuración de Envío de Emails

## ✅ Estado Actual

El formulario de contacto está configurado para usar **Web3Forms** (API real). Los emails se envían directamente a `contacthispaltech@gmail.com`.

## 🚀 Configuración para Desarrolladores

### 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con tu API key de Web3Forms:

```bash
# Web3Forms API Configuration
VITE_WEB3FORMS_ACCESS_KEY=tu-api-key-aqui
```

### 2. Obtener API Key de Web3Forms

1. Ve a [https://web3forms.com](https://web3forms.com)
2. Regístrate (gratuito)
3. Copia tu `access_key`
4. Pégala en el archivo `.env`

### 3. Reiniciar el servidor

```bash
npm run dev
```

## 📧 Cómo Funciona

- **API Real**: Usa Web3Forms para envío real de emails
- **Destino**: Todos los emails van a `contacthispaltech@gmail.com`
- **Datos**: Incluye nombre, email, teléfono, empresa, proyecto, presupuesto, timeline y descripción
- **Notificaciones**: El usuario recibe confirmación de envío exitoso

## 🔧 Variables de Entorno

| Variable                    | Descripción          | Ejemplo                                |
| --------------------------- | -------------------- | -------------------------------------- |
| `VITE_WEB3FORMS_ACCESS_KEY` | API key de Web3Forms | `100f9b11-f298-4f17-bf1c-54c3aa3f9987` |

## 🛠️ Alternativas (Si no quieres usar Web3Forms)

### EmailJS

```typescript
// En src/services/emailService.ts
const EMAILJS_CONFIG = {
  serviceId: "tu-service-id",
  templateId: "tu-template-id",
  publicKey: "tu-public-key",
};
```

### Formspree

```typescript
// Cambiar la URL en sendEmailAlternative
const response = await fetch("https://formspree.io/f/TU_ENDPOINT", {
  method: "POST",
  // ...
});
```

## ✅ Verificación

1. Completa el formulario de contacto
2. Haz clic en "Solicitar Presupuesto Gratuito"
3. Verifica que recibes el email en `contacthispaltech@gmail.com`
4. Revisa la consola del navegador (F12) para logs de depuración

## 🔒 Seguridad

- ✅ La API key está en variables de entorno
- ✅ El archivo `.env` está en `.gitignore`
- ✅ No se expone la API key en el código
