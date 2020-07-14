/***
 * @author Cody Spratford
 * @summary - This Program is a Pokemon Draft Prep/Teambuilder helper. This acts like a google spreadsheet that you would use.
 * You are welcome to edit the code, I made sure to comment stuff. If you need help/want to report a bug, please contact me.
 * @since 7/13/2020
 */

 /***
  * @name TODO-List
  * @todo Finish making the type chart.
  * @todo Fix the Pivot moves. It displays 'Teleport' for pokemon that do not have any kind of pivoting moves.
  * @todo Finish adding all the Cleric moves, and Fix the wish moves, as it does not display them.
  */

const Teams = require("./teams");
const teamA = require('../TeamA.json');
const teamB = require('../TeamB.json');
const TypeChart = require("./TypeChart");
const {checkIfTeamsHaveAnything} = require('./JsonFileLook');
const Listr = require('listr');
const {Observable} = require('rxjs');

// IF both team json files are empty, then send this.
if(!checkIfTeamsHaveAnything()) {
    console.log(`To start using this, please edit the TeamA.json and TeamB.json files.`);
    console.log(`To add a new pokemon, add the pokemon as a string into the pokemon: [].`);
    console.log(`Example:`);
    console.log(`pokemon: ["lopunny", "eevee"]`);
    console.log(`for pokemon that have alternative forms, add the form after the pokemon name.`);
    console.log(`Example:`);
    console.log(`pokemon: ["lycanroc dusk", "muk alola"]`);
    console.log(`megas are the only form keyword that can be in front or behind.`);
    return;
}
// This is to organize the executions of the tables a bit better.
const tasks = new Listr([
    {
        title: 'Making TeamA Data',
        task: () => {
            return new Listr([
                {
                    title: 'Getting Team A Data',
                    task: () => {
                        const _teamA = new Teams(teamA.pokemon).getObjects();
                        const tableA = [];
                        
                        for(let poke of _teamA) {
                            let abilities = [];
                            abilities.push(poke.abilities["0"]);
                            abilities.push(poke.abilities["1"]);
                            abilities.push(poke.abilities["H"]);
                            for(let i = 0; i < abilities.length; i++) {
                                if(abilities[i] == undefined)
                                    abilities.splice(i, 1);
                            }
                            tableA.push({
                                name: poke.name,
                                types: poke.types,
                                abilities: abilities,
                                base_hp: poke.baseStats.hp,
                                base_atk: poke.baseStats.atk,
                                base_def: poke.baseStats.def,
                                base_spa: poke.baseStats.spa,
                                base_spd: poke.baseStats.spd,
                                base_spe: poke.baseStats.spe
                            });
                            let type = new TypeChart(poke.types).getTypeChart();
                        }
                        console.log(teamA.team_name);
                        console.table(tableA);
                        
                        new Teams(teamA.pokemon).getHazardPokemon().then(x => {
                            console.log(`Hazards for ${teamA.team_name}`)
                            console.table(x);
                        })
                        
                        new Teams(teamA.pokemon).getPivotPokemon().then(x => {
                            console.log(`Pivots for ${teamA.team_name}`);
                            console.table(x);
                        })
                        
                        new Teams(teamA.pokemon).getClericPokemon().then(x => {
                            console.log(`Clerics for ${teamA.team_name}`);
                            console.table(x);
                        })
                    }
                }
            ])
        }
    },
    {
        title: 'Making TeamB Data',
        task: () => {
            return new Listr([
                
                    {
                        title: 'Getting Team B Data',
                        task: () => {
    
                            const _teamB = new Teams(teamB.pokemon).getObjects();
    
                            const tableB = [];
                            
                            
                            
                            for(let poke of _teamB) {
                                let abilities = [];
                                abilities.push(poke.abilities["0"]);
                                abilities.push(poke.abilities["1"]);
                                abilities.push(poke.abilities["H"]);
                            
                                tableB.push({
                                    name: poke.name,
                                    types: poke.types,
                                    abilities: abilities,
                                    base_hp: poke.baseStats.hp,
                                    base_atk: poke.baseStats.atk,
                                    base_def: poke.baseStats.def,
                                    base_spa: poke.baseStats.spa,
                                    base_spd: poke.baseStats.spd,
                                    base_spe: poke.baseStats.spe
                                });
                                for(let i = 0; i < abilities.length; i++) {
                                    if(abilities[i] == undefined)
                                        abilities.splice(i, 1);
                                }
                            }
                            console.log(teamB.team_name);
                            console.table(tableB);
                            
                            new Teams(teamB.pokemon).getHazardPokemon().then(x => {
                                console.log(`Hazards for ${teamB.team_name}`)
                                console.table(x);
                            })
                            
                            
                            new Teams(teamB.pokemon).getPivotPokemon().then(x => {
                                console.log(`Pivots for ${teamB.team_name}`);
                                console.table(x);
                            })
                            
                            new Teams(teamB.pokemon).getClericPokemon().then(x => {
                                console.log(`Clerics for ${teamB.team_name}`);
                                console.table(x);
                            })
                        }
                    }
            ])
        }
    }
])


tasks.run().catch(err => {
    console.error(err);
})