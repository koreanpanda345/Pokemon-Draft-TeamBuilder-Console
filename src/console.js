/***
 * @author Cody Spratford
 * @summary This file handles the console. this is what will display stuff.
 * @since 7/15/2020
 * 
 * 
 * You maybe wondering why does the last few tables out of order?
 * Answer to that, is most likely cause some are excuting before others.
 */

const Teams = require("./teams");
const teamA = require("../TeamA.json");
const teamB = require("../TeamB.json");
const TypeChart = require("./TypeChart");

const Listr = require("listr");

module.exports = {
  init() {
    const tasks = new Listr([
      {
        title: `Making Tables for ${teamA.team_name}`,
        task: () => {
          return new Listr([
            {
              title: `Getting data for ${teamA.team_name}`,
              task: () => {
                const _teamA = new Teams(teamA.pokemon).getObjects();
                const tableA = [];

                for (let poke of _teamA) {
                  let abilities = [];
                  abilities.push(poke.abilities["0"]);
                  abilities.push(poke.abilities["1"]);
                  abilities.push(poke.abilities["H"]);
                  for (let i = 0; i < abilities.length; i++) {
                    if (abilities[i] == undefined) abilities.splice(i, 1);
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
                    base_spe: poke.baseStats.spe,
                  });
                  let type = new TypeChart(poke.types).getTypeChart();
                }
                console.log(teamA.team_name);
                console.table(tableA);
              },
            },
            {
              title: `Getting Speeds stats for ${teamA.team_name}`,
              task: () => {
                let speedtiersA = new Teams(teamA.pokemon).getSpeed();
                console.log(`Speed tiers for ${teamA.team_name}`);
                console.table(speedtiersA);
              },
            },
            {
              title: `Getting Hazard Pokemon for ${teamA.team_name}`,
              task: () => {
                new Teams(teamA.pokemon).getHazardPokemon().then((x) => {
                  console.log(`Hazards for ${teamA.team_name}`);
                  console.table(x);
                });
              },
            },
            {
              title: `Getting Pivot Pokemon for ${teamA.team_name}`,
              task: () => {
                new Teams(teamA.pokemon).getPivotPokemon().then((x) => {
                  console.log(`Pivots for ${teamA.team_name}`);
                  console.table(x);
                });
              },
            },
            {
              title: `Getting Cleric Pokemon for ${teamA.team_name}`,
              task: () => {
                new Teams(teamA.pokemon).getClericPokemon().then((x) => {
                  console.log(`Clerics for ${teamA.team_name}`);
                  console.table(x);
                });
              },
            },
          ]);
        },
      },
      {
        title: `Making Tables for ${teamB.team_name}`,
        task: () => {
          return new Listr([
            {
              title: `Getting data for ${teamB.team_name}`,
              task: () => {
                const _teamB = new Teams(teamB.pokemon).getObjects();
                const tableB = [];
                for (let poke of _teamB) {
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
                    base_spe: poke.baseStats.spe,
                  });
                  for (let i = 0; i < abilities.length; i++) {
                    if (abilities[i] == undefined) abilities.splice(i, 1);
                  }
                }
                console.log(teamB.team_name);
                console.table(tableB);
              },
            },
            {
              title: `Getting Speeds stats for ${teamB.team_name}`,
              task: () => {
                let speedtiersB = new Teams(teamB.pokemon).getSpeed();
                console.log(`Speed tiers for ${teamB.team_name}`);
                console.table(speedtiersB);
              },
            },
            {
              title: `Getting Hazard Pokemon for ${teamB.team_name}`,
              task: () => {
                new Teams(teamB.pokemon).getHazardPokemon().then((x) => {
                  console.log(`Hazards for ${teamB.team_name}`);
                  console.table(x);
                });
              },
            },
            {
              title: `Getting Pivot Pokemon for ${teamB.team_name}`,
              task: () => {
                new Teams(teamB.pokemon).getPivotPokemon().then((x) => {
                  console.log(`Pivots for ${teamB.team_name}`);
                  console.table(x);
                });
              },
            },
            {
              title: `Getting Cleric Pokemon for ${teamB.team_name}`,
              task: () => {
                new Teams(teamB.pokemon).getClericPokemon().then((x) => {
                  console.log(`Clerics for ${teamB.team_name}`);
                  console.table(x);
                });
              },
            },
          ]);
        },
      },
    ]);

    tasks.run().catch((err) => {
      console.error(err);
    });
  },
};
