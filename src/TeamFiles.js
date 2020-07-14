/***
 * @author Cody Spratford
 * @name TeamFiles
 * @summary this file handles the Team files. It will create them if it does not exist.
 */


 const {existsSync, writeFileSync} = require('fs');

 const teamA = existsSync(`./TeamA.json`);
 const teamB = existsSync(`./TeamB.json`);

 if(!teamA) {
     writeFileSync('./TeamA.json', JSON.stringify({team_name: "", pokemon: []}), {flag: 'w'});
 }

 if(!teamB) {
     writeFileSync('./TeamB.json', JSON.stringify({team_name: "", pokemon: []}), {flag: 'w'});
 }