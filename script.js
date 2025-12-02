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

const btn12 = document.getElementById("btn13"); 
const entradaPoke12 = document.getElementById("entrada11");
const div12 = document.getElementById("ejercicio11");

btn12.addEventListener("click", async () => {
    div12.innerHTML = "";
    try {
        
        const pokemon = await obtenerPokemon(entradaPoke12.value);
        
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