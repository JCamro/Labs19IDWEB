const btn3 = document.getElementById("btn3");
btn3.addEventListener("click", () => {
    id = prompt("Ingrese id de pokemon");
    obtenerPokemon(id);
});

async function obtenerPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
            throw new Error("Error en la solicitud: "+res.status);
        }
        const data = await res.json();
        
        return data;

    } catch (error) {
        throw error;
    }
} 

const btn4 = document.getElementById("btn4");
btn4.addEventListener("click", () => {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(res => {return res.json()})
    .then(data => {
        console.log(
            "\nPropiedades Pikachu"+
            "\nPeso: " + data.weight +
            "\nAltura: " + data.height
        );
    })
    .catch(err => {console.log("Error: "+err)}); 
});

const btn5 = document.getElementById("btn5");
btn5.addEventListener("click", async() => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        
        if (!res.ok) {throw new Error("Error al conectar: " + res);}
    
        const data = await res.json();
    
        const altura = data.height;
        const peso = data.weight;
    
        console.log(
            "\nPropiedades Pikachu"+
            "\nPeso: " + peso +
            "\nAltura: " + altura
        );
    
    } catch (error) {
        console.log(error);
    }
});

const btn6 = document.getElementById("btn6");
btn6.addEventListener("click", async() => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");

        if (!res.ok) {
            throw new Error("Error en la solicitud: " + res);
        }

        const data = await res.json();

        console.log("URL imagen: " + data.sprites.front_default);

    } catch (error) {
        console.log(error);
    }
});


const btn7 = document.getElementById("btn7");
btn7.addEventListener("click", async() => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

        if (!res.ok) {throw new Error("Error en la peticion: "+res);}

        const data = await res.json();
        
        data.results.forEach(poke => {
            console.log("Nombre: "+poke.name);
        });

    } catch (error) {
        console.log(error);
    }
});

const btn8 = document.getElementById("btn8");
btn8.addEventListener("click", async () => {
    const numAleatorio = Math.floor(Math.random()*899);

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${numAleatorio}`);

        if (!res.ok) {
            throw new Error("Error al solicitar: " + res);
        }

        const data = await res.json();

        console.log(
            "Pokemon Aleatorio"+
            "\nNombre: "+data.name+
            "\nid: "+data.id+
            "\nPeso: "+data.weight
        );
    } catch (error) {
        console.log(error);
    }
});


const btn9 = document.getElementById("btn9");
const entradaId = document.getElementById("entrada9");
const div9 = document.getElementById("ejercicio9");

btn9.addEventListener("click", async () => {
    div9.innerHTML = "";
    try {
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entradaId.value}`);

        if (!res.ok) {
            throw new Error("Error en la solicitud: "+res.status);
        }

        const data = await res.json();
        
        //Creando imagen
        const imagen = document.createElement("img");
        imagen.src = data.sprites.front_default; 
        imagen.alt = "Imagen Pokemon";

        //Creando Nombred.heigh
        const nombre = document.createElement("p");
        nombre.textContent = "Nombre: "+data.name;
        //Creando id
        const id = document.createElement("p");
        id.textContent = "ID: "+data.id;
        //Creando peso
        const peso = document.createElement("p");
        peso.textContent = "Peso: "+data.weight;
        //Creando altura
        const altura = document.createElement("p");
        altura.textContent = "Altura: "+data.height;
        
        div9.appendChild(nombre);
        div9.appendChild(id);
        div9.appendChild(imagen);
        div9.appendChild(peso);
        div9.appendChild(altura);
        
    } catch (error) {
        //Manejando entrada no valida
        const manejo = document.createElement("p");
        manejo.textContent = "No se pudo encontrar este Pokemon!!";
        div9.appendChild(manejo);
    }
});


async function cargarTarjeta(poke, div) {
    const card_content = document.getElementById(div);
    card_content.style.display = "grid";
    card_content.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    const card = document.createElement("div");
    
    card.style.backgroundColor = "green";
    card.style.border = "solid 1px black";
    card.style.margin = "10px";
    card.style.padding = "5px";

    try {
        const pokemon = await obtenerPokemon(poke);

        //Creando imagen
        const imagen = document.createElement("img");
        imagen.src = pokemon.sprites.front_default; 
        imagen.alt = "Imagen Pokemon";

        //Creando Nombred.heigh
        const nombre = document.createElement("p");
        nombre.textContent = "Nombre: "+pokemon.name;
        //Creando id
        const id = document.createElement("p");
        id.textContent = "ID: "+pokemon.id;

        card.appendChild(nombre);
        card.appendChild(id);
        card.appendChild(imagen);

        card_content.appendChild(card);

    } catch (error) {
        //Manejando entrada no valida
        const manejo = document.createElement("p");
        manejo.textContent = error;
        card.appendChild(manejo);
        card_content.appendChild(card);
    }
}

for (let index = 0; index < 10; index++) {
    cargarTarjeta((index+1), "ejercicio10");
}


const btn11 = document.getElementById("btn11");
const entradaPoke = document.getElementById("entrada11");
const div11 = document.getElementById("ejercicio11");

btn11.addEventListener("click", async () => {
    div11.innerHTML = "";
    try {
        
        const pokemon = await obtenerPokemon(entradaPoke.value);
        
        //Creando imagen
        const imagen = document.createElement("img");
        imagen.src = pokemon.sprites.front_default; 
        imagen.alt = "Imagen Pokemon";

        //Creando Nombred.heigh
        const nombre = document.createElement("p");
        nombre.textContent = "Nombre: "+pokemon.name;
        //Creando id
        const id = document.createElement("p");
        id.textContent = "ID: "+pokemon.id;
        //Creando Tipos
        const tipos = document.createElement("ul");

        for (const tipo of pokemon.types) {
            const li = document.createElement("li");
            li.textContent = tipo.type.name;
            tipos.appendChild(li);
        }
        
        div11.appendChild(imagen);
        div11.appendChild(nombre);
        div11.appendChild(id);
        div11.appendChild(tipos);
        
    } catch (error) {
        //Manejando entrada no valida
        const manejo = document.createElement("p");
        manejo.textContent = "No se pudo encontrar este Pokemon!!";
        div11.appendChild(manejo);
    }
});


const btn12 = document.getElementById("btn12");
const entrada12 = document.getElementById("entrada12");
const div12 = document.getElementById("ejercicio12");

btn12.addEventListener("click", async () => {
    div12.innerHTML = "";

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entrada12.value}`);

        if (!res.ok) {
            throw new Error("Error en la solicitud: " + res.status);
        }

        const data = await res.json();

        const nombre12 = document.createElement("p");
        nombre12.textContent = "Nombre: " + data.name;

        const id12 = document.createElement("p");
        id12.textContent = "ID: " + data.id;

        const imagen12 = document.createElement("img");
        imagen12.src = data.sprites.front_default;
        imagen12.alt = "Imagen Pokémon";

        const peso12 = document.createElement("p");
        peso12.textContent = "Peso: " + data.weight;

        const altura12 = document.createElement("p");
        altura12.textContent = "Altura: " + data.height;

        //------ Estadísticas base ------
        const tituloStats12 = document.createElement("h3");
        tituloStats12.textContent = "Estadísticas Base:";

        const listaStats12 = document.createElement("ul");

        data.stats.forEach(stat => {
            const item12 = document.createElement("li");
            item12.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            listaStats12.appendChild(item12);
        });

        div12.appendChild(nombre12);
        div12.appendChild(id12);
        div12.appendChild(imagen12);
        div12.appendChild(peso12);
        div12.appendChild(altura12);
        div12.appendChild(tituloStats12);
        div12.appendChild(listaStats12);

    } catch (error) {
        const manejo12 = document.createElement("p");
        manejo12.textContent = "No se pudo encontrar este Pokémon!";
        div12.appendChild(manejo12);
    }
});

// Ejercicio 14

const primeros12 = [];
for (let index = 0; index < 12; index++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${(index+1)}`)
    .then(res => {return res.json();})
    .then(data => {primeros12.push(data);})
    .catch(err => {console.log("Error: "+err);});
    
} 


const btnAnterior14 = document.getElementById("btnAnterior14");
const btnSiguiente14 = document.getElementById("btnSiguiente14");
const contenedor14 = document.getElementById("contenedor14");

let inicio14 = 1; 
let fin14 = 3;

async function cargarPokemones14() {
    contenedor14.innerHTML = "";

    for (let i = inicio14; i <= fin14; i++) {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);

            if (!res.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await res.json();

            const tarjeta14 = document.createElement("div");
            tarjeta14.style.border = "1px solid black";
            tarjeta14.style.padding = "10px";
            tarjeta14.style.margin = "10px";
            tarjeta14.style.display = "inline-block";
            tarjeta14.style.textAlign = "center";
            tarjeta14.style.width = "150px";

            const imagen14 = document.createElement("img");
            imagen14.src = data.sprites.front_default;
            imagen14.alt = "Pokemon";

            const nombre14 = document.createElement("p");
            nombre14.textContent = "Nombre: " + data.name;

            const id14 = document.createElement("p");
            id14.textContent = "ID: " + data.id;

            tarjeta14.appendChild(imagen14);
            tarjeta14.appendChild(nombre14);
            tarjeta14.appendChild(id14);

            contenedor14.appendChild(tarjeta14);

        } catch (error) {
            const error14 = document.createElement("p");
            error14.textContent = "No se pudo cargar el Pokémon " + i;
            contenedor14.appendChild(error14);
        }
    }
}

cargarPokemones14();

btnSiguiente14.addEventListener("click", () => {
    if (fin14 < 12) {
        inicio14 += 3;
        fin14 += 3;
        cargarPokemones14();
    }
});

btnAnterior14.addEventListener("click", () => {
    if (inicio14 > 1) {
        inicio14 -= 3;
        fin14 -= 3;
        cargarPokemones14();
    }
});
