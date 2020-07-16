/***
 * @author Cody Spratford
 * @summary - This Program is a Pokemon Draft Prep/Teambuilder helper. This acts like a google spreadsheet that you would use.
 * You are welcome to edit the code, I made sure to comment stuff. If you need help/want to report a bug, please contact me.
 * @since 7/13/2020
 */

/***
 * @name TODO-List
 * @todo Finish making the type chart.
 * @todo Finish adding all the Cleric moves, and Fix the wish moves, as it does not display them.
 * @todo Make damage calcs console command.
 */

const { init } = require("./console");
const { checkIfTeamsHaveAnything } = require("./JsonFileLook");

// IF both team json files are empty, then send this.
if (!checkIfTeamsHaveAnything()) {
  console.log(
    `To start using this, please edit the TeamA.json and TeamB.json files.`
  );
  console.log(
    `To add a new pokemon, add the pokemon as a string into the pokemon: [].`
  );
  console.log(`Example:`);
  console.log(`pokemon: ["lopunny", "eevee"]`);
  console.log(
    `for pokemon that have alternative forms, add the form after the pokemon name.`
  );
  console.log(`Example:`);
  console.log(`pokemon: ["lycanroc dusk", "muk alola"]`);
  console.log(
    `megas are the only form keyword that can be in front or behind.`
  );
  return;
}
// Inits the console.js file.
init();

