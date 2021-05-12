let baseRoll = "4d4 + 4"; 
let numBerserkers = new Roll(`${baseRoll}`).roll();
numBerserkers.toMessage({ flavor: 'Number of Berserkers Summoned' });