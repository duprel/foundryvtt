(async () => {
    if (args[0] === "on") {
        let spellDC = canvas.tokens.controlled[0].actor.data.data.attributes.spelldc;
        let numDice = args[1] + 1
        let tactor = game.actors.entities.find(a => a.name === "RiderEffects");
        let item = tactor.items.find(i => i.name === "Ice Knife Explosion");
        console.log("###############:        ", numDice);
    } else {
    };
})();
