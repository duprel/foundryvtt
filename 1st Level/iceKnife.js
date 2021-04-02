(async () => {
    if (args[0] === "on") {
        let spellDC = canvas.tokens.controlled[0].actor.data.data.attributes.spelldc;
        let tactor = Array.from(game.user.targets)[0];
        let numDice = (args[1] + 1)
        let effectActor = game.actors.entities.find(a => a.name === "RiderEffects");
        let effect = effectActor.items.find(i => i.name === "Ice Knife Explosion");
        await effect.update(
            {
                "data": {
                    "save": {
                        "dc": spellDC
                    },
                    "damage": {
                        "parts": [
                            [
                                `${numDice}d6`,
                                "cold"
                            ]
                        ],
                    },
                },     
          }
        );
        new MidiQOL.TrapWorkflow(tactor, effect, [tactor], tactor.center)
    } else {
    };
})();
