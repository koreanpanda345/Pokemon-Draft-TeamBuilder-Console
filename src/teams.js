const {Generations, Specie} = require("@pkmn/data");
const {Dex} = require("@pkmn/dex");
const {calcStat, Pokemon, Field, Move} = require("@smogon/calc");

module.exports = class Teams {
    /**
     * @typedef string[]
     */
    pokemons;
    /**
     * 
     * @param {string[]} pokemons The Pokemon in the team.
     */
    constructor(pokemons){
        this.pokemons = pokemons;
    }
    /**
     * Returns an array of the Pokmeon in the Pokemon Object.
     * @returns {Specie[]}
     */
    getObjects(){
        let obj = [];
        const gen = new Generations(Dex);
        for(let pokemon of this.pokemons) {
            const _pokemon = gen.get(8).species.get(pokemon) === (undefined) ? gen.get(7).species.get(pokemon) : gen.get(8).species.get(pokemon);
            obj.push(_pokemon);
        }
        return obj;
    }
    /**
     * @summary This method checks if the team has any cleric pokemon, if so it adds the pokemon with the cleric move that it has to the list.
     * @returns {Promise<any>} - the Pokemons that have cleric moves.
     */
    getClericPokemon() {
        let data = new Promise(async(resolve, reject) => {
          let obj = [];
          const gen = new Generations(Dex);
          for(let pokemon of this.pokemons) {
                pokemon = pokemon.toLowerCase().replace('mega', '');
                pokemon = pokemon.replace('-', '');
                
                const _pokemon = gen.get(8).learnsets.get(pokemon) === undefined ? gen.get(7).learnsets.get(pokemon) : gen.get(8).learnsets.get(pokemon);
                if(await(await _pokemon).learnset["wish"])
                    obj.push({pokemon: pokemon, move: "Wish"});
                if(await(await _pokemon).learnset["healbell"])
                    obj.push({pokemon: pokemon, move: "Heal Bell"});
          }
          return resolve(obj);
        })

        return data;
    }
    /**
     * @summary This method checks if the team has any pivot pokemon, if so it adds the pokemon with the pivot move that it has to the list.
     * @returns {Promise<any>} - the Pokemons that have pivoting moves.
     */
    getPivotPokemon() {
        let data = new Promise(async (resolve, reject) => {
            let obj = [];
            const gen = new Generations(Dex);
            for(let pokemon of this.pokemons) {
                pokemon = pokemon.toLowerCase().replace('mega', '');
                pokemon = pokemon.replace('-', '');
                const _pokemon = gen.get(8).learnsets.get(pokemon) === undefined ? gen.get(7).learnsets.get(pokemon) : gen.get(8).learnsets.get(pokemon);
                if(await(await _pokemon).learnset["uturn"])
                    obj.push({pokemon: pokemon, move: "U-Turn"});
                if(await(await _pokemon).learnset["voltswitch"])
                    obj.push({pokemon: pokemon, move: "Volt Switch"});
                if(await(await _pokemon).learnset["flipturn"])
                    obj.push({pokemon: pokemon, move: "Flip Turn"});
                if(await(await _pokemon).learnset["teleport"]);
                    obj.push({pokemon: pokemon, move: "Teleport"});
                if(await(await _pokemon).learnset["batonpass"])
                    obj.push({pokemon: pokemon, move: "Baton Pass"});
                if(await(await _pokemon).learnset["partingshot"])
                    obj.push({pokemon: pokemon, move: "Parting Shot"});

            }
            return resolve(obj);
        })
        return data;
    }
    /**
     * @summary This method checks if the team has any hazard setters, if so it adds the pokemon with the hazard move that it has to the list.
     * @returns {Promise<any>} - The Pokemons that has hazard moves.
     */
    getHazardPokemon(){
        let data = new Promise(async (resolve, reject) => {
            let obj = [];
            const gen = new Generations(Dex);
            for(let pokemon of this.pokemons) {
                pokemon = pokemon.toLowerCase().replace('mega', '');
                pokemon = pokemon.replace('-', '');
                const _pokemon = gen.get(8).learnsets.get(pokemon) === undefined ? gen.get(7).learnsets.get(pokemon) : gen.get(8).learnsets.get(pokemon);
                if(await (await _pokemon).learnset["stealthrock"])
                    obj.push({pokemon: pokemon, move: "Stealth Rock"});
                if(await(await _pokemon).learnset["spikes"])
                    obj.push({pokemon: pokemon, move: "Spikes"});
                if(await(await _pokemon).learnset["toxicspikes"])
                    obj.push({pokemon: pokemon, move: "Toxic Spikes"});
            }
            return resolve(obj);
        });
        return data;
    }

}