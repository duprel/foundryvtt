//ItemMacro

let numDice = 4 + (args[0].powerLevel * 2);
let diceRoll = new Roll(`${numDice}d10`).roll();
diceRoll.toMessage({ flavor: 'Total HP Affected' });