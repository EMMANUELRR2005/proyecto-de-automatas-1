# 🏋️ Máquina Expendedora Gym 💪

## Descripción del Proyecto

Este proyecto representa un sistema autómata simulado de una máquina expendedora. Está diseñado para demostrar cómo los autómatas pueden ser modelados y utilizados para procesos automatizados como la gestión de transacciones y selección de productos.

El sistema simula una máquina expendedora de productos de gimnasio, incluyendo suplementos deportivos, accesorios y bebidas. La aplicación implementa un autómata de estados finitos que gestiona todo el ciclo de una transacción: desde la selección del producto, la inserción de monedas, hasta la dispensación del artículo y el cálculo del cambio.

## Características

- **Interfaz gráfica interactiva**: Diseño visual atractivo que simula una máquina expendedora real
- **Variedad de productos**: 9 productos diferentes de gimnasio con distintos precios
- **Sistema de balance**: Seguimiento en tiempo real del dinero insertado
- **Animaciones visuales**: Efectos visuales para hacer la experiencia más realista
- **Gestión de transacciones**: Manejo de compras, cálculo de cambio y devolución de dinero
- **Validación de saldo**: Verificación de fondos suficientes antes de dispensar productos

## Productos Disponibles

| Código | Producto | Precio |
|--------|----------|--------|
| A1 | Proteína Whey | Q45.00 |
| A2 | Creatina | Q35.00 |
| A3 | Barra Proteica | Q15.00 |
| B1 | BCAA | Q40.00 |
| B2 | Pre-Workout | Q50.00 |
| B3 | Shaker | Q20.00 |
| C1 | Toalla Gym | Q12.00 |
| C2 | Guantes | Q25.00 |
| C3 | Bebida Isotónica | Q10.00 |

## Instrucciones de Uso

Para interactuar con el sistema, simplemente siga las instrucciones en la interfaz gráfica proporcionada o en el código base. El autómata simula el proceso de selección de productos, inserción de monedas y dispensación del artículo.

### Pasos para realizar una compra:

1. **Abra el archivo `index.html` en su navegador web**
   - Puede simplemente hacer doble clic en el archivo
   - O arrastrarlo a su navegador preferido

2. **Seleccione un producto**
   - Haga clic en cualquiera de los productos mostrados en la cuadrícula
   - El producto seleccionado se resaltará
   - La pantalla mostrará el nombre y precio del producto

3. **Inserte dinero**
   - Utilice los botones de denominaciones disponibles (Q10, Q20, Q50, Q100)
   - El balance se actualizará en tiempo real
   - Puede insertar múltiples billetes hasta tener el monto necesario

4. **Realizar la compra**
   - Presione el botón "Comprar" cuando tenga saldo suficiente
   - El sistema verificará que su balance sea suficiente
   - Si la compra es exitosa, verá una animación del producto siendo dispensado
   - El cambio (si aplica) se devolverá automáticamente

5. **Devolver dinero**
   - Si desea recuperar su dinero sin hacer una compra, presione "Devolver Dinero"
   - Todo el balance actual será devuelto

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones visuales
- **JavaScript**: Lógica del autómata y manejo de eventos

## Estructura del Proyecto

```
proyecto-de-automatas-1/
│
├── index.html          # Página principal con la interfaz de usuario
├── script.js           # Lógica del autómata (clase VendingMachine)
├── styles.css          # Estilos visuales y animaciones
├── inicio.js           # Archivo de inicialización (vacío)
└── README.md           # Este archivo
```

## Implementación del Autómata

El sistema implementa un autómata de estados finitos con los siguientes estados:

1. **Estado Inicial**: Esperando selección de producto
2. **Producto Seleccionado**: Usuario ha elegido un producto
3. **Dinero Insertado**: Balance disponible para la compra
4. **Procesando Compra**: Validación de fondos y dispensación
5. **Transacción Completa**: Producto dispensado, cambio devuelto

### Transiciones de Estado

- **Seleccionar producto** → Cambia a estado "Producto Seleccionado"
- **Insertar dinero** → Actualiza el balance
- **Comprar** → Valida fondos y dispensa producto (si es exitoso)
- **Devolver dinero** → Retorna al estado inicial con balance 0

## Cómo Ejecutar

1. Clone o descargue este repositorio
2. Abra el archivo `index.html` en cualquier navegador web moderno
3. ¡Comience a interactuar con la máquina expendedora!

No se requiere ninguna instalación adicional ni servidor web. El proyecto funciona completamente en el lado del cliente.

## Conceptos de Autómatas Demostrados

Este proyecto demuestra varios conceptos fundamentales de la teoría de autómatas:

- **Estados finitos**: El sistema tiene un conjunto definido de estados
- **Transiciones**: Las acciones del usuario causan transiciones entre estados
- **Entrada**: Los clics y selecciones del usuario son las entradas del autómata
- **Salida**: Mensajes, actualizaciones visuales y acciones (dispensar producto)
- **Memoria**: El sistema mantiene el estado actual (producto seleccionado, balance)

## Contribuciones

Este proyecto fue desarrollado como una demostración educativa de sistemas autómatas aplicados a problemas del mundo real.

## Licencia

Este proyecto es de código abierto y está disponible para fines educativos.
