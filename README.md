# 🌱 EcoRecolector - Sistema de Recolección de Residuos Aprovechables

Sistema web para gestión de servicios de recolección de residuos aprovechables con integración a WhatsApp.

## 📱 Demo en Vivo
[Ver aplicación](https://tu-usuario.github.io/ecorecolector-app)

## 🚀 Características

### Para Clientes
- ✅ Formulario completo de solicitud
- ✅ Selección de tipos de residuos (PET, Cartón, Plástico, Papel)
- ✅ Subida de fotos con preview
- ✅ Recolección inmediata o programada
- ✅ Integración directa con WhatsApp
- ✅ Historial de solicitudes

### Para Recicladores
- ✅ Dashboard con estadísticas
- ✅ Ver solicitudes disponibles
- ✅ Sistema de aceptación de solicitudes
- ✅ Lista de recicladores cercanos

## 🛠️ Tecnologías Utilizadas
- **React 18** - Framework frontend
- **Tailwind CSS** - Estilos y diseño responsive
- **Lucide React** - Iconografía
- **WhatsApp API** - Integración de mensajería

## 📦 Instalación

### Prerequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/ecorecolector-app.git
cd ecorecolector-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Configuración

### WhatsApp
Actualiza el número de WhatsApp en el archivo `src/App.js`:
```javascript
const numeroWhatsApp = '573123387813'; // Tu número aquí
```

### Personalización
- **Colores**: Modifica las clases de Tailwind en los componentes
- **Tipos de residuos**: Actualiza el array `tiposResiduos` 
- **Precios**: Modifica los precios en cada tipo de residuo

## 📱 Uso

### Cliente
1. Completa el formulario con tus datos
2. Selecciona el tipo de residuo
3. Indica la cantidad estimada
4. Sube fotos del material
5. Elige recolección inmediata o programada
6. Haz clic en "Enviar solicitud por WhatsApp"

### Reciclador
1. Cambia a vista "Reciclador" en el header
2. Ve las solicitudes disponibles en el dashboard
3. Acepta solicitudes según distancia y disponibilidad

## 🚢 Despliegue

### GitHub Pages
```bash
npm run build
npm run deploy
```

### Netlify/Vercel
1. Conecta tu repositorio
2. Comando de build: `npm run build`
3. Directorio de publicación: `build`

## 🔮 Próximas Funcionalidades
- [ ] Mapa interactivo con Google Maps
- [ ] Base de datos persistente
- [ ] Sistema de notificaciones
- [ ] App móvil nativa
- [ ] WhatsApp Business API completa
- [ ] Sistema de pagos

## 📞 Contacto
- **WhatsApp**: +57 312 338 7813
- **Empresa**: Servicios de Aseo Complementario
- **Email**: contacto@ecorecolector.com

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 🤝 Contribuir
¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---
Hecho con ❤️ para el cuidado del medio ambiente 🌍
