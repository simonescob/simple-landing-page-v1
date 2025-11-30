# Commit Messages

## Objetivo
Generar mensajes de commit de git en español usando el formato Conventional Commits.

## Formato Manual para KiloCode Button

### Instrucciones para Usar con KiloCode
Cuando uses el botón de kilocode, incluye esta instrucción específica:
```
Generate git commit messages in Spanish using Conventional Commits format. Keep titles under 50 characters without trailing period.
```

### Formato Conventional Commits en Español

#### Tipos de Commits
- **feat**: Nueva característica → `feat: agregar calculadora de préstamos`
- **fix**: Corrección de error → `fix: corregir validación de datos`
- **docs**: Documentación → `docs: actualizar README`
- **style**: Cambios de formato → `style: formatear código CSS`
- **refactor**: Refactorización → `refactor: reorganizar funciones`
- **test**: Agregar tests → `test: agregar pruebas unitarias`
- **chore**: Tareas de mantenimiento → `chore: actualizar dependencias`

#### Estructura del Mensaje
```
<tipo>: <descripción breve>

[descripción opcional más detallada]
```

#### Ejemplos Prácticos
```
feat: agregar página de inventario con filtros
feat: implementar calculadora de préstamos con tasas variables
fix: corregir validación de formularios en página principal
docs: agregar instrucciones de instalación
refactor: optimizar carga de datos de vehículos
style: mejorar diseño responsivo en móviles
```

#### Plantillas para Copiar y Pegar

**Para nuevas características:**
```
feat: [descripción breve en español]

[explicación detallada opcional]
```

**Para correcciones:**
```
fix: [descripción del problema corregido]

[solución aplicada opcional]
```

**Para documentación:**
```
docs: [tema documentado]

[detalles adicionales opcionales]
```

## Reglas Importantes
- Usar tiempo imperativo en español
- Título máximo 50 caracteres sin punto final
- Primera letra minúscula
- Describir qué hace el cambio, no qué se cambió
- Ser conciso pero descriptivo

## Ejemplos Detallados por Tipo de Cambio

### Características (feat)
```
feat: agregar calculadora de préstamos con tasas variables
feat: implementar sistema de filtrado avanzado en inventario
feat: crear página de detalles de vehículo con galería
feat: añadir validaciones de formularios en tiempo real
```

### Correcciones (fix)
```
fix: corregir problema de validación en formularios de contacto
fix: solucionar error de carga en imágenes de vehículos
fix: arreglar diseño responsivo en dispositivos móviles
fix: corregir cálculo incorrecto de intereses en préstamos
```

### Documentación (docs)
```
docs: agregar instrucciones de instalación del proyecto
docs: actualizar guía de uso de la calculadora de préstamos
docs: documentar estructura de archivos del proyecto
docs: crear manual de contribución para desarrolladores
```

### Refactorización (refactor)
```
refactor: reorganizar funciones de validación de datos
refactor: optimizar estructura de componentes de inventario
refactor: simplificar lógica de cálculo financiero
refactor: limpiar código CSS y mejorar organización
```

### Estilo (style)
```
style: mejorar espaciado y alineación en formularios
style: actualizar paleta de colores del tema
style: formatear código JavaScript según estándares
style: ajustar tipografía y tamaños de fuente
```

### Pruebas (test)
```
test: agregar pruebas unitarias para calculadora de préstamos
test: implementar tests de integración para formularios
test: crear casos de prueba para validación de datos
test: agregar cobertura de pruebas para componentes UI
```

### Mantenimiento (chore)
```
chore: actualizar dependencias de paquetes npm
chore: limpiar archivos de configuración no utilizados
chore: optimizar imágenes y recursos estáticos
chore: actualizar versión de documentación API
```

## Lista de Verificación Antes del Commit

### ✅ Formato Correcto
- [ ] Uso de tipo Conventional Commits (feat, fix, docs, etc.)
- [ ] Descripción en tiempo imperativo
- [ ] Primera letra en minúscula
- [ ] Sin punto final en el título
- [ ] Máximo 50 caracteres en el título

### ✅ Contenido en Español
- [ ] Todo el texto en español
- [ ] Terminología técnica apropiada en español
- [ ] Descripción clara y específica
- [ ] Evita traducciones literales innecesarias

### ✅ Contexto Apropiado
- [ ] Describe qué hace el cambio, no qué se cambió
- [ ] Incluye el área afectada si es necesario
- [ ] Mantiene consistencia con mensajes anteriores

## Mensajes de Commit Incorrectos (Evitar)

❌ **Incorrecto:**
```
feat: New loan calculator implementation
fix: Fixed validation bug
docs: README updated
```

✅ **Correcto:**
```
feat: implementar calculadora de préstamos con interfaz moderna
fix: corregir validación de campos en formularios de contacto
docs: actualizar documentación con nuevos ejemplos de uso
```

## Convenciones Específicas del Proyecto

### Características del Proyecto
- **Inventario**: Usar "inventario", "vehículos", "stock"
- **Financiero**: Usar "préstamos", "cálculos", "intereses", "tasas"
- **UI/UX**: Usar "interfaz", "diseño", "experiencia de usuario"
- **Datos**: Usar "datos", "validación", "estructura", "información"

### Palabras Clave Recomendadas
- **Agregar**: implementar, añadir, crear, incluir
- **Corregir**: solucionar, arreglar, reparar, subsanar
- **Mejorar**: optimizar, refactorizar, actualizar, perfeccionar
- **Eliminar**: quitar, remover, suprimir, depurar
