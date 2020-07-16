/***
 * @author Cody Spratford
 * @summary This files handles all damage calculations.
 * @since 7/15/200
 * 
 *  you maybe wondering why, am i calcing all the moves for the attacking pokemon?
 *  Answer to that, is simply cause this is for prepping, I mean you can use this during battle,
 *  But like its mostly made for Prepping, so its always to Calc all the Moves to see what is more likely to be used on x mon, or what will do the most for you on y mon against x mon.
 */

const { Generations } = require("@pkmn/data");
const { Dex } = require("@pkmn/dex");
const { calculate, Pokemon, Move, Field } = require("@smogon/calc");

module.exports = class Calcs {
  /**
   * @typedef {String} attacker
   */
  attacker;
  /**
   * @typedef {string} defender
   */
  defender;
  /**
   *
   * @param {string} attacker the attacking pokemon
   * @param {string} defender the defending pokemon
   */
  constructor(attacker, defender) {
    this.attacker = attacker;
    this.defender = defender;
  }
  /**
   * This Grabs all of the Attacking pokemon's moves that it can learn.
   * @return {Promise<import('@pkmn/data').Learnset>} the pokemon learnset.
   */
  GetLearnSet() {
    this.attacker = this.attacker.replace("mega", "").replace("-", "");
    const gen = new Generations(Dex);
    const learnset =
      gen.get(8).species.get(this.attacker) === undefined
        ? gen.get(7).learnsets.get(this.attacker)
        : gen.get(8).learnsets.get(this.attacker);

    return learnset;
  }
  /**
   * This calcs the damage output for x move.
   * @param {string} move the move that will be used to calc.
   * @param {{
   *  crit: Boolean,
   *  sr: Boolean,
   *  ls: Boolean,
   *  reflect: Boolean,
   *  veil: Boolean,
   *  def_item: String,
   *  atk_item: String,
   *  def_boost: {hp: Number, atk: Number, def: Number, spa: Number, spd: Number, spe: Number},
   *  atk_boost: {hp: Number, atk: Number, def: Number, spa: Number, spd: Number, spe: Number},
   *  def_nature: String,
   *  atk_nature: String
   * }} modifiers
   */
  runCalcs(move, modifiers) {
    let gen = new Generations(Dex);
    let atkgen =
      gen.get(8).species.get(this.attacker) === undefined
        ? gen.get(7)
        : gen.get(8);
    let defgen =
      gen.get(8).species.get(this.defender) === undefined
        ? gen.get(7)
        : gen.get(8);
    let movegen =
      gen.get(8).moves.get(move) === undefined ? gen.get(7) : gen.get(8);

    let attacker = new Pokemon(atkgen, this.attacker, {
      ivs: { atk: 31, spa: 31 },
      item: modifiers.atk_item,
      boosts: modifiers.atk_boost,
      nature: modifiers.atk_nature === "" ? "Serious" : modifiers.atk_nature
    });
    let defender = new Pokemon(defgen, this.defender, {
      ivs: { hp: 31, def: 31, spd: 31, spa: 31 },
      item: modifiers.def_item,
      boosts: modifiers.def_boost,
      nature: modifiers.def_nature === "" ? "Serious" : modifiers.def_nature
    });
    let _move = new Move(movegen, move, {
      isCrit: modifiers.crit,
    });
    let field = new Field({
      defenderSide: {
        isSR: modifiers.sr,
        isAuroraVeil: modifiers.veil,
        isLightScreen: modifiers.learnset,
        isReflect: modifiers.reflect,
      },
    });
    if (_move.bp === 0) return;

    let calc = calculate(atkgen, attacker, defender, _move, field);
    return calc;
  }
  /**
   * This checks if the move does do damage.
   * @param {string} move the move in question.
   * @return {Boolean} - true if the move does, else false if it does not.
   */
  checkIfMoveDoesDamage(move) {
    let _move = new Move(
      new Generations(Dex).get(8).moves.get(move) == undefined
        ? new Generations(Dex).get(7)
        : new Generations(Dex).get(8),
      move
    );

    if (_move.bp === 0) return false;
    else return true;
  }
};
