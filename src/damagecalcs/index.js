/***
 * @author Cody Spratford
 * @summary This is the main file for the Damage Calc command. Everything goes through here.
 * @since 7/15/2020
 */

// This is editable stuff. Theses have to be hard coded in, cause its not console-friendly.
//=========================================================//
let _def_item = "";
let _atk_item = "Choice Specs";
let _def_boost = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
let _atk_boost = { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
let _atk_nature = "";
let _def_nature = "Modest";
//=========================================================//

let attacking = process.argv[2];
let defending = process.argv[3];
process.argv.slice(2, 3);
// Field modifications.
let mods = process.argv;
// If moves should result in a critical hit.
let _crit = mods.includes("crit");
// If the defending side has stealth rocks up on their side.
let _sr =
  mods.includes("sr") ||
  mods.includes("stealth_rocks") ||
  mods.includes("stealth_rock") ||
  mods.includes("rocks") ||
  mods.includes("rock");
// If the defending side has Light screen up on their side.
let _lightscreen = mods.includes("light_screen") || mods.includes("ls");
// If the defending side has reflect up on their side.
let _reflect = mods.includes("reflect");
// If the defending side has aurora veil up on their side.
let _veil = mods.includes("aurora_veil") || mods.includes("veil");

// This is the Modification list.
let modifiers = {
  crit: _crit,
  sr: _sr,
  ls: _lightscreen,
  reflect: _reflect,
  veil: _veil,
  def_item: _def_item,
  atk_item: _atk_item,
  def_boost: _def_boost,
  atk_boost: _atk_boost,
  def_nature: _def_nature,
  atk_nature: _atk_nature,
};

const Calcs = require("./calcs");

let calc = new Calcs(attacking, defending);
// Does wacky calculation stuff, and displays it.
let moves = [];
calc.GetLearnSet().then((learnset) => {
  moves = Object.keys(learnset.learnset);
  let movesTable = [];
  console.log(`Calcs for All of ${attacking}'s moves against ${defending}`);
  for (let move of moves) {
    // This check is needed, as it can cause errors if the target is immune to a move of the attacker.
    if (calc.checkIfMoveDoesDamage(move))
      movesTable.push({
        move: move,
        result:
          calc.runCalcs(move, modifiers).damage !== 0
            ? calc.runCalcs(move, modifiers).kochance().text === ""
              ? "Probably the worse move to use."
              : calc.runCalcs(move, modifiers).kochance().text
            : "Does Nothing",
        damage: calc.runCalcs(move, modifiers).damage.toString(),
      });
  }

  // This Displays the info.
  console.table(movesTable);
  console.log("Modifiers");
  console.log(modifiers);
});
