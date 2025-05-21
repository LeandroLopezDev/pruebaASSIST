# Sistema de Gestión de Reservas ASSIST

## Descripción
Sistema de gestión de reservas desarrollado con React y TypeScript, que permite consultar y administrar reservas de manera eficiente. La aplicación se integra con una API REST y proporciona una interfaz de usuario moderna y responsiva.

## Características Principales
- Consulta de reservas con filtros por pasajero y número de reserva
- Paginación de resultados
- Manejo robusto de errores
- Interfaz de usuario intuitiva
- Integración con API REST

## Tecnologías Utilizadas
- React
- TypeScript
- Axios para peticiones HTTP
- Vite como bundler

## Requisitos Previos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL del repositorio]
```

2. Navegar al directorio del proyecto:
```bash
cd assist
```

3. Instalar dependencias:
```bash
npm install
```

## Configuración
La aplicación utiliza una API REST con la siguiente URL base:
```
https://3ccfrjulc8.execute-api.us-west-1.amazonaws.com/dev
```

## Desarrollo
Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto
```
assist/
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── features/      # Características específicas
│   ├── hooks/         # Custom hooks
│   ├── services/      # Servicios de API
│   └── assets/        # Recursos estáticos
├── public/           # Archivos públicos
└── package.json      # Dependencias y scripts
```

## API y Servicios
La aplicación incluye servicios para:
- Consulta de reservas con parámetros de búsqueda
- Manejo de errores personalizado
- Gestión de estado de carga

## Contribución
Para contribuir al proyecto:
1. Crear un fork del repositorio
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia
Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.