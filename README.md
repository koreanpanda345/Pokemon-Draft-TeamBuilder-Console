# Pokemon Draft Teambuilder Console
So what does this thing do? well you know the Google Spreadsheets, or the Excel Files that people use to team build for a draft match or such. Thats what this thing does. Using Data from Smogon/Pokemon Showdown, makes this thing always up to date. ~~except for newer moves, which I sadly have to program in.~~

## How to use this thing
To use this thing, you first need to have the program. so that means clone this repo.
BUT WAIT. Slow down, you need to have Nodejs installed. make sure you have it installed before using this.
To install Nodejs, go to this link: https://nodejs.org/en/

Have node? prefect.

Next you will need to do the following:
- Navigate to the file. (It is much easier to do this through vscode, or some kind of text editor/ide.)
- Open the console that is pointed to this folder's path. if you haven't done so
- run the `npm run build` command. This will add all of the packages and dependencies that this program needs.
- run the `npm run start`(`npm start` for short) command. This will make two new Files, TeamA.json and TeamB.json (Theses files are referred as Team Files.)

The console will tell you wat to do, but to add a pokemon in you need to put it into the string array pokemon in the Team files.
You can add the Team Name in the string object called team_name.

then run the `npm run start` command, and watch the magic happen.

# NOTICE
I am not done making this, so there will be bugs. the current bugs that i know of, are the following:

- Pivot Pokemon: Pokemon that don't have a pivot move for some reason is added with the Teleport move. 
- Cleric Pokemon: Pokemon that knows wish, doesn't show up for some odd reason.

You are always welcome to edit the program if you want to. I am making sure I comment stuff, to make it easier for those that don't like how it displays or such.
