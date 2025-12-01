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
        return error;
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

btn9.addEventListener("click", () => {
    div9.innerHTML = "";
    try {
        const pokemon = obtenerPokemon("1");

        //Creando imagen
        const imagen = document.createElement("img");
        imagen.src = pokemon.sprites.front_default; 
        imagen.alt = "Imagen Pokemon";
        imagen.width = "200px";

        //Creando Nombre
        const nombre = document.createElement("p");
        nombre.textContent = "Nombre: "+pokemon.name;
        //Creando id
        const id = document.createElement("p");
        id.textContent = "ID: "+pokemon.id;
        //Creando peso
        const peso = document.createElement("p");
        peso.textContent = "Peso: "+pokemon.weight;
        //Creando altura
        const altura = document.createElement("p");
        altura.textContent = "Altura: "+pokemon.height;
        
        div9.appendChild(imagen)
        div9.appendChild(nombre)
        div9.appendChild(id)
        div9.appendChild(peso)
        div9.appendChild(altura)
        
    } catch (error) {
        //Manejando entrada no valida
        const peso = document.createElement("p");
        peso.textContent = "No se encontro en la base de datos ese Pokemon!";
        div9.appendChild(peso);
        
    }

});