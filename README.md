# 🎬 MovieApp - Angular 18 🎥  

### 📌 Proyecto desarrollado por Carlos Edgardo López Barrera  

MovieApp es una aplicación web desarrollada con **Angular 18** que permite a los usuarios explorar películas populares, ver detalles completos, conocer el elenco y equipo de producción, recibir recomendaciones y dar calificación de películas.  

## 🚀 Características  

✅ **Autenticación** 
✅ **Exploración de Películas** (Cartelera y Top Rated)  
✅ **Detalles de Películas** con información detallada  
✅ **Equipo de Producción y Reparto** con fotos y nombres  
✅ **Películas Relacionadas** basadas en recomendaciones de TheMovieDB  
✅ **Búsqueda de Películas** con barra de búsqueda interactiva  
✅ **Infinity Scroll** para carga progresiva de películas  
✅ **Simulación de Votación** 

---

## 📂 Arquitectura del Proyecto  

```
📦 movie-app
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┣ 📂 navbar          # Navbar con navegación y logout
 ┃ ┃ ┃ ┗ 📂 movie-card      # Componente reutilizable para mostrar una película
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📂 login           # Pantalla de inicio de sesión
 ┃ ┃ ┃ ┣ 📂 movies-now-playing  # Listado de películas en cartelera
 ┃ ┃ ┃ ┣ 📂 movies-top-rated   # Listado de películas mejor calificadas
 ┃ ┃ ┃ ┗ 📂 movie-detail      # Página con los detalles de una película
 ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📜 auth.service.ts   # Servicio de autenticación
 ┃ ┃ ┃ ┗ 📜 movies.service.ts # Servicio para consumir API de películas
 ┃ ┃ ┣ 📂 guards
 ┃ ┃ ┃ ┗ 📜 auth.guard.ts     # Guard para restringir rutas sin autenticación
 ┃ ┃ ┣ 📂 interfaces
 ┃ ┃ ┃ ┗ 📜 interfaces.ts     # Modelos de datos de películas y usuarios
 ┃ ┃ ┣ 📜 app.routes.ts       # Configuración de rutas
 ┃ ┃ ┗ 📜 main.ts             # Entrada principal de la aplicación
 ┃ ┣ 📂 assets                # Imágenes y archivos estáticos
 ┃ ┗ 📜 index.html            # HTML base
 ┣ 📜 angular.json            # Configuración de Angular
 ┣ 📜 tailwind.config.js      # Configuración de TailwindCSS
 ┣ 📜 package.json            # Dependencias del proyecto
 ┗ 📜 README.md               # Este archivo 📖
```

---

## 🔧 Instalación y Configuración  

### **1️⃣ Clonar el repositorio**
```sh
git clone https://github.com/Carloslpez219/PRUEBA_PAGALO_CARLOSLOPEZ.git
cd PRUEBA_PAGALO_CARLOSLOPEZ
```

### **2️⃣ Instalar dependencias**
```sh
npm install
```

### **3️⃣ Configurar TailwindCSS**
Asegúrate de que Tailwind esté correctamente configurado en `tailwind.config.js` y `styles.css`.  
Si no tienes Tailwind instalado, puedes ejecutarlo con:
```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **4️⃣ Iniciar la aplicación**
```sh
ng serve
```
🔹 La aplicación se ejecutará en **http://localhost:4200**  

---

## 🎭 APIs Utilizadas  

Esta aplicación consume la API de [TheMovieDB](https://www.themoviedb.org/) para obtener información de películas, reparto y recomendaciones.  

### **📌 Endpoints utilizados:**
- `GET /discover/movie` → Obtener películas populares  
- `GET /movie/top_rated` → Obtener películas mejor calificadas  
- `GET /movie/{id}` → Obtener detalles de una película  
- `GET /movie/{id}/credits` → Obtener elenco y equipo de producción  
- `GET /movie/{id}/recommendations` → Obtener películas recomendadas  
- `GET /search/movie?query=` → Buscar películas por nombre  

📌 **Clave de API (almacenada en `environment.ts`)**
```typescript
export const environment = {
  production: false,
  url: 'https://api.themoviedb.org/3',
  apiKey: 'key'
};
```

---

## 🎨 Diseño y Estilos  

El diseño de la aplicación utiliza **TailwindCSS** para un estilo responsivo.  
🔹 **Interfaz fluida** con animaciones en `hover` y `transition`.  
🔹 **Diseño optimizado para móviles y escritorio** con `flex` y `grid`.  

---

## 🔐 Autenticación  

Dado que TheMovieDB requiere `session_id` para autenticación, hemos simulado el inicio de sesión con `localStorage`.  

- **Inicio de sesión simulado** (email: 'test@example.com', password: '123456').  
- **Protección de rutas con `AuthGuard`**.  
- **Logout borra el token del almacenamiento y redirige al login**.  

📌 **Cómo funciona el `AuthGuard`**
```typescript
canActivate(): boolean {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
```

---

## 🎬 Funcionalidades Clave  

### ✅ **Exploración de Películas**
- Listado de **películas en cartelera** y **mejor calificadas**.
- **Paginación infinita** (scroll infinito).

### ✅ **Detalles de Películas**
- **Información completa** sobre cada película.
- **Fotos y nombres** del elenco y equipo de producción.
- **Películas recomendadas** según cada título.

### ✅ **Búsqueda en Tiempo Real**
- Barra de búsqueda con **filtros por nombre**.

### ✅ **Votación**
- El usuario puede calificar películas de **1 a 10 estrellas**.
- **Persistencia** de la votación.

---

## 🚀 **Roadmap / Posibles Mejoras**
✅ Implementar favoritos para guardar películas  
✅ Soporte multi-idioma  
✅ Historial de películas vistas  
✅ Integración con Firebase para autenticación real  

---

## 💡 Contribuciones  
Si deseas contribuir, ¡serás bienvenido!  

1. **Haz un fork** de este repositorio.  
2. Crea una nueva rama: `git checkout -b feature-nueva-funcionalidad`.  
3. **Realiza tus cambios** y haz un commit.  
4. **Abre un Pull Request**.  

---

## 📝 **Licencia**  
Este proyecto está bajo la **Licencia MIT**. Puedes usarlo y modificarlo libremente.  

---

💙 **Desarrollado por Carlos Edgardo López Barrera** 🚀🎬  
```
