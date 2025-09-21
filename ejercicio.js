const readlineSync = require('readline-sync');

const licoreria = {"Licores-Nacionales": ["Cerveza", "Aguardiente"],
                "Licores-Destilados": ["Vino", "Whisky", "Vodka"],
                "Licores-Tradicionales": ["Chicha", "Guarapo", "Canelazo"]
};

function MostrarCategorias(){ 
    console.log("*---Bienvinido a LICORERIA BOMBA----*");
    console.log("\nCategorias disponibles:");
    Object.keys(licoreria).forEach(categoria =>{ 
        console.log(`-${categoria}`);
    });
}

//Bucle principal proceso de elección
function iniciarCompra(){
    let carrito = {} //esto con el fin de que el usuario no pierda su "compra"
    let compra = true;

    while (compra){ //bucle
        MostrarCategorias();
        //Simular la elección del cliente
        const CategoriaSeleccionada = readlineSync.question("Elija una de las categorias disponibles:"); //switch

        //Se accede a los articulo de las categorias
        const articulos = licoreria[CategoriaSeleccionada];

        if (articulos) {
            console.log(`\nArticulos de la categoria "${CategoriaSeleccionada}":`);
            articulos.forEach(articulo => {
                console.log(`${articulo}`);
            });

            //Pregunta clave B
            const respuestaB = readlineSync.question("¿Desea cambiar de eleccion y volver al menu anterior? Ingrese 1 para SI o 2 para NO:");
            if (respuestaB === '2'){ //condicionales
                let continuarArticulos = true;
                while(continuarArticulos){
                    const licorseleccionado = readlineSync.question("\nNombre del licor:");
                    if(articulos.includes(licorseleccionado)){
                        const cantidad = readlineSync.question(`¿Cuantas botellas de ${licorseleccionado} desea?:`);
                        if(cantidad > 0){
                            if (carrito[licorseleccionado]){
                                carrito[licorseleccionado] += cantidad;
                            } else {
                                carrito[licorseleccionado] = cantidad;
                            }
                            console.log(`\nHa agregado ${cantidad} bottellas a ${licorseleccionado} a su carrito.`);
                        }else {
                            console.log("Cantidad no válida.");
                        }
                    }else {
                        console.log("articulo no Válido");
                    }
                        //Pregunta para seguir comprando en la misma categoria
                    const respuestaC = readlineSync.question(`\n ¿Desea otro tipo de licor de la categoria "${CategoriaSeleccionada}? Ingrese 1 para SI o 2 para NO:`);
                    if (respuestaC === '2'){  //condicionales
                        continuarArticulos = false;
                    } else if (respuestaC === '1'){
                    // El bucle simplemente continúa a la siguiente iteración
                    console.log("\nVolviendo al menú principal de categorías.");
                    }else {
                        console.log("Opción no válida. Volviendo a la selección de licores.");
                    }
                }
            }else if (respuestaB === '1') {  //condicionales
                console.log("Redirigiendo al menu anterior");
                continue
            }else {
                console.log("Opcion no válida. Volviendo a la selección de artículos.");
            }
        }else {
            console.log("Categoría no válida. Intentelo de nuevo.");
            continue
        }

        //Pregunta final para seguir comprando en otra categoria o finalizar compra
        const respuestaD = readlineSync.question("\n¿Desea otro tipo de licor de la tienda? Ingrese 1 para SI o 2 para Finalizar:"); //input
        if (respuestaD === '2'){
            compra = false; //se termina el bucle principal
        } else if (respuestaD !== '1'){
            console.log("Opción no válida. Volviendo al menú de cátegorias para que elija otro trago (No deberia tomar más borrachin )");  
        }
    }
    //Muestra de la factura o resumen de compra
    console.log("\n*----Factura de COOOOMPRA----*"); //outputs
    for (const item in carrito){
        console.log(`${item}: ${carrito[item]} botellas`);
    }
    console.log("¡Gracias por su compra!"); // outputs
}

function EdadPermitida(){
    const nombre = readlineSync.question("Ingrese su nombre:");
    let EdadValida = false;
    while (!EdadValida){
        const edad = readlineSync.questionInt("\n¿Cuantos años tiene?:"); //input
            if (edad >= 18){
            console.log(`Bienvenido, ${nombre}, ¿Queres un trago?`)
            EdadValida=true;
        } else{
        console.log(`¿Que haces en una licoreria teniendo ${edad} años pelotudo? No podes entrar`); // outputs
        }
    }
}
EdadPermitida();
// si la edad es valida, la función de compra se iniciará de lo contrario no.
iniciarCompra();