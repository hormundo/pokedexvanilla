let baseUrl = "https://pokeapi.co/api/v2/";
        let isMenuOpen = false;

        const typeLabel = (type) => {
            let $spanType = document.createElement("span");

            switch (type) {
                case "normal":
                    $spanType.classList.add("type", "normal");
                    $spanType.textContent = "normal";
                    break;

                case "fighting":
                    $spanType.classList.add("type", "fighting");
                    $spanType.textContent = "lucha";
                    break;

                case "flying":
                    $spanType.classList.add("type", "flying");
                    $spanType.textContent = "volador";
                    break;

                case "poison":
                    $spanType.classList.add("type", "poison");
                    $spanType.textContent = "veneno";
                    break;

                case "ground":
                    $spanType.classList.add("type", "ground");
                    $spanType.textContent = "tierra";
                    break;

                case "rock":
                    $spanType.classList.add("type", "rock");
                    $spanType.textContent = "roca";
                    break;

                case "bug":
                    $spanType.classList.add("type", "bug");
                    $spanType.textContent = "bicho";
                    break;

                case "ghost":
                    $spanType.classList.add("type", "ghost");
                    $spanType.textContent = "fantasma";
                    break;

                case "steel":
                    $spanType.classList.add("type", "steel");
                    $spanType.textContent = "acero";
                    break;

                case "fire":
                    $spanType.classList.add("type", "fire");
                    $spanType.textContent = "fuego";
                    break;

                case "water":
                    $spanType.classList.add("type", "water");
                    $spanType.textContent = "agua";
                    break;

                case "grass":
                    $spanType.classList.add("type", "grass");
                    $spanType.textContent = "planta";
                    break;

                case "electric":
                    $spanType.classList.add("type", "electric");
                    $spanType.textContent = "eléctrico";
                    break;

                case "psychic":
                    $spanType.classList.add("type", "psychic");
                    $spanType.textContent = "psíquico";
                    break;

                case "ice":
                    $spanType.classList.add("type", "ice");
                    $spanType.textContent = "hielo";
                    break;

                case "dragon":
                    $spanType.classList.add("type", "dragon");
                    $spanType.textContent = "dragón";
                    break;

                case "dark":
                    $spanType.classList.add("type", "dark");
                    $spanType.textContent = "oscuro";
                    break;

                case "fairy":
                    $spanType.classList.add("type", "fairy");
                    $spanType.textContent = "hada";
                    break;

                case "unknown":
                    $spanType.classList.add("unknown", "unknown");
                    $spanType.textContent = "desconocido";
                    break;

                case "shadow":
                    $spanType.classList.add("type", "shadow");
                    $spanType.textContent = "sombra";
                    break;

                default:
                    break;
            }

            return $spanType;
        }

        const fillPopupData = (pokemonResume) => {
            
            const damagePromises = [];
            
            for(let i = 0; i < pokemonResume.tipos.length; i++) {
                const url = `${baseUrl}type/${pokemonResume.tipos[i].type.name}`;
                damagePromises.push(fetch(url).then(res => res.json()));
            }
            
            document.querySelector(".debilidades").innerHTML = "";

            Promise.all(damagePromises).then(res => {
                
                const debilidadesArray = [];

                for(let i = 0; i < res.length; i++) {
                    
                    res[i].damage_relations.double_damage_from.forEach(e => {
                        debilidadesArray.push(e.name);
                    })
                    
                }
                    let debilidadesFiltered = [...new Set(debilidadesArray)];

                    debilidadesFiltered.forEach(e => {
                        document.querySelector(".debilidades").appendChild(typeLabel(e));
                    })
            })
           
            document.querySelector(".modal figure img").src = pokemonResume.imagen;
            document.querySelector(".modal .historia").textContent = pokemonResume.historia;
            document.querySelector(".modal-title").innerHTML = pokemonResume.nombre;
            document.querySelector(".altura").innerHTML = `${parseFloat(pokemonResume.altura)/10} Mts`;
            document.querySelector(".peso").innerHTML = `${parseFloat(pokemonResume.peso/10)} Kgs`;
            document.querySelector(".salud").innerHTML = `${pokemonResume.stats[0].base_stat} HP`;

            const velocidad = document.querySelector('.velocidad');
            velocidad.textContent = 0;
            velocidad.dataset.done = 0;
            velocidad.style.width = velocidad.getAttribute('data-done') + '%';
            velocidad.className = "";
            velocidad.classList.add("progress-done", "velocidad", "type", pokemonResume.tipos[0].type.name);

            setTimeout(() => {
                velocidad.style.opacity = 1;
                let percent = (pokemonResume.stats[5].base_stat * 100) / 255;
                velocidad.dataset.done = percent;
                velocidad.textContent = pokemonResume.stats[5].base_stat;
                velocidad.style.width = velocidad.getAttribute('data-done') + '%';
            }, 500)

            const ataque = document.querySelector('.ataque');
            ataque.textContent = 0;
            ataque.dataset.done = 0;
            ataque.style.width = ataque.getAttribute('data-done') + '%'
            ataque.className = "";
            ataque.classList.add("progress-done", "ataque", "type", pokemonResume.tipos[0].type.name);
            
            setTimeout(() => {
                ataque.style.opacity = 1;
                let percent = (pokemonResume.stats[1].base_stat * 100) / 255;
                ataque.dataset.done = percent;
                ataque.textContent = pokemonResume.stats[1].base_stat;
                ataque.style.width = ataque.getAttribute('data-done') + '%';
            }, 500)

            const defensa = document.querySelector('.defensa');
            defensa.textContent = 0;
            defensa.dataset.done = 0;
            defensa.style.width = defensa.getAttribute('data-done') + '%';
            defensa.className = "";
            defensa.classList.add("progress-done", "defensa", "type", pokemonResume.tipos[0].type.name);
            
            setTimeout(() => {
                defensa.style.opacity = 1;
                let percent = (pokemonResume.stats[2].base_stat * 100) / 255;
                defensa.dataset.done = percent;
                defensa.textContent = pokemonResume.stats[2].base_stat;
                defensa.style.width = defensa.getAttribute('data-done') + '%';
            }, 500)

            let $divTypes = document.querySelector(".tipos");
            $divTypes.innerHTML = "";

            pokemonResume.tipos.forEach(e => {
                $divTypes.appendChild(typeLabel(e.type.name));
            })
        }

        const getDetailPokemon = async (param) => {
            
            const synth = window.speechSynthesis;

            if(typeof param === "string") {
               
                try {
                    let pokemonfetch = await fetch(`${baseUrl}pokemon/${param}`);
                    let pokemonJson = await pokemonfetch.json();

                    let speciesfetch = await fetch(`${baseUrl}pokemon-species/${param}`);
                    let speciesJson = await speciesfetch.json();

                    if(!pokemonfetch.ok || speciesJson.ok) throw {status: res.status, statusText: res.statusText};
                    let historia  = "";
                    
                    pokemonResume = { 
                        id: param,
                        nombre: `#${param} ${pokemonJson.name.toUpperCase()}`,
                        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${param}.png`,
                        tipos: pokemonJson.types,
                        altura: pokemonJson.height,
                        peso: pokemonJson.weight,
                        stats: pokemonJson.stats,
                        historia: function historia() {
                            for (let i = 0; i < speciesJson.flavor_text_entries.length; i++) {
                                if (speciesJson.flavor_text_entries[i].language.name === "es") {
                                    this.historia = speciesJson.flavor_text_entries[i].flavor_text;
                                return;
                                }
                            }
                        }
                    }
                    pokemonResume.historia();

                    const text = pokemonResume.historia
                    const utterThis = new SpeechSynthesisUtterance(text) 
                    synth.speak(utterThis)

                    fillPopupData(pokemonResume);
                    
                    } catch (err) {
                        let message = err.statusText || "Ocurrio un error";
                        document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend",`<p><b>Error ${err.status} ${message}</b></p>`)
                    }

            } else {
                const utterThis = new SpeechSynthesisUtterance();
                synth.cancel(utterThis);
            }
        }

        const getPokemon = async (id) => {
            try {
                let res = await fetch(`${baseUrl}pokemon/${id}`);
                let json = await res.json();

                if(!res.ok) throw {status: res.status, statusText: res.statusText};

                pokemonResume = { 
                    id: id,
                    nombre: `#${id} ${json.name.toUpperCase()}`,
                    imagen: json.sprites.front_default
                }
                
                return pokemonResume;

            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                document.getElementsByTagName("main")[0].insertAdjacentHTML("beforeend",`<p><b>Error ${err.status} ${message}</b></p>`)
            }
        }

        const getAllPokemons = async (id = 1) => {
            const $row = document.querySelector(".rowPokemon");
            const $template = document.getElementById("card-template").content;
            let $fragment = document.createDocumentFragment();

            $row.innerHTML = "";

            document.querySelector(".card-filter").value = "";

            try {
                document.getElementsByTagName("main")[0].insertAdjacentHTML("afterbegin",`<img class="loader" src="tail-spin.svg" alt="Cargando..." />`);
                let res = await fetch(`${baseUrl}generation/${id}`);
                let json = await res.json();

                if(!res.ok) throw {status: res.status, statusText: res.statusText};

                const pokemonResume = []
                
                for (let i = 0; i < json.pokemon_species.length; i++) {
                    let URLPokemonSpecies = json.pokemon_species[i].url;
                    let id = URLPokemonSpecies.split("/");
                    pokemonResume.push(await getPokemon(parseInt(id[id.length-2])));
                }
                
                pokemonResume.sort(function(a,b){
                    return a.id > b.id?1:a.id < b.id?-1:0
                })

                pokemonResume.forEach(e => {
                    $template.querySelector(".card").id = e.id;
                    $template.querySelector(".name-pokemon").textContent = e.nombre;
                    $template.querySelector(".img-pokemon").src = e.imagen;

                    $clone = document.importNode($template, true);

                    $fragment.appendChild($clone);
                })

                $row.appendChild($fragment);

                document.querySelector(".loader").remove();

            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                document.getElementsByTagName("main")[0].insertAdjacentHTML("afterend",`<p><b>Error ${err.status} ${message}</b></p>`)
            }
        }

        const getGenerations = async () => {
            const $ul = document.querySelector(".menu ul");

            try {
                let res = await fetch(`${baseUrl}generation/`);
                let json = await res.json();

                if(!res.ok) throw {status: res.status, statusText: res.statusText};
                
                json.results.forEach((e, i) => {
                    let $li = document.createElement("li");
                    $li.classList.add("nav-link");
                    $li.textContent = `Generación ${i+1}`;
                    $li.id = i+1;
                    $ul.appendChild($li)
                    document.querySelector("li").classList.add("active");
                })

            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                document.getElementsByTagName("main")[0].insertAdjacentHTML("afterend",`<p><b>Error ${err.status} ${message}</b></p>`)
            }
        }

        document.addEventListener("DOMContentLoaded", e => {
            getAllPokemons();
            getGenerations();
            searchFilters(".card-filter", ".card-col")
        })

        document.addEventListener("click", e => {
            if(e.target.matches("li")) {
                getAllPokemons(e.target.id)

                document.querySelectorAll("li").forEach(e => {
                    e.classList.remove("active");
                })
                e.target.classList.add("active");
            }
                
            if(e.target.matches('.hamburger-box') || e.target.matches('.hamburger-box *')) {
            
                document.querySelector('.hamburger').classList.toggle("is-active");
                
                if(isMenuOpen) {
                    document.querySelector('.menu').classList.add("menu-close");
                    isMenuOpen = false;
                } else {
                    document.querySelector('.menu').classList.remove("menu-close");
                    isMenuOpen = true;
                }
            }

            if(e.target.matches('.nav-link')) {
                document.querySelectorAll('.nav-link').forEach(e => {
                    e.classList.remove('active');
                })
                
                e.target.classList.add('active');
                document.querySelector('.menu').classList.add("menu-close");
                document.querySelector('.hamburger').classList.toggle("is-active");
                isMenuOpen = false;
            }

            if(e.target.matches('.card-col') || e.target.matches('.card-col *')) {
                let id = e.target.closest(".card").id;
                getDetailPokemon(id);
            }

            if(e.target.matches('.btn-close') || e.target.matches('#pokemonDetail') ) {
                let cancelVoice = true;
                getDetailPokemon(cancelVoice);
            }
        })

        function searchFilters(input, selector) {
            const $input = document.querySelector(input);

            document.addEventListener("keyup", e => {
                if(e.target.matches(input)) {

                document.querySelectorAll(selector).forEach(el => 
                        el.textContent.toLowerCase().includes(e.target.value)
                        ? el.classList.remove("filter")
                        : el.classList.add("filter")
                    );
                }
            })
        }
