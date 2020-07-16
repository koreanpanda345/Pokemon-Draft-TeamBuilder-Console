const teamA = require("../TeamA.json");
const teamB = require("../TeamB.json");
module.exports = {
  /**
   * @summary This method checks if both Json files have stuff in them. if not then return false, to do stuff, else return true to continue.
   * @return {Boolean}
   */
  checkIfTeamsHaveAnything() {
    if (
      teamA.team_name === "" &&
      teamA.pokemon.length === 0 &&
      teamB.team_name === "" &&
      teamB.pokemon.length === 0
    )
      return false;
    return true;
  },
};
