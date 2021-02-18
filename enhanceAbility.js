//DAE Macro Execute, Effect Value = "Macro Name" @target 

let target = canvas.tokens.get(args[1]);

/**
 * For each target select the effect (GM selection)
 */
if (args[0] === "on") {
    new Dialog({
        title: "Choose enhance ability effect for " + target.name,
        buttons: {
            one: {
                label: "Bear's Endurance",
                callback: () => {
                    let formula = `2d6`;
                    let tHP = new Roll(formula);
                    tHP.roll().toMessage();
                    let amount = tHP.total;
                    ChatMessage.create({ content: target.name + " gains " + amount + " temp Hp" });
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "bear",
                    });
                    target.actor.update({ "data.attributes.hp.temp": amount });
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.con": 1 });

                }
            },
            two: {
                label: "Bull's Strength",
                callback: () => {
                    ChatMessage.create({ content: target.name + "s encumberance is doubled" });
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "bull",
                    });
                    target.actor.setFlag('dnd5e', 'powerfulBuild', true);
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.str": 1 });
                }
            },
            three: {
                label: "Cat's Grace",
                callback: () => {
                    ChatMessage.create({ content: target.name + " doesn't suffer damage from falls less than 20 ft." });
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "cat",
                    });
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.dex": 1 });
                }
            },
            four: {
                label: "Eagle's Splendor",
                callback: () => {
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "eagle",
                    });
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.cha": 1 });
                }
            },
            five: {
                label: "Fox's Cunning",
                callback: () => {
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "fox",
                    });
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.int": 1 });
                }
            },
            six: {
                label: "Owl's Wisdom",
                callback: () => {
                    target.actor.setFlag('world', 'enhanceAbility', {
                        name: "owl",
                    });
                    target.actor.update({ "flags.midi-qol.advantage.ability.check.wis": 1 });
                }
            }
        }
    }).render(true);
}

if (args[0] === "off") {
    let flag = target.actor.getFlag('world', 'enhanceAbility');
    if (flag.name === "bear") {
        target.actor.update({ "flags.midi-qol.advantage.ability.check.con": 0 });
        target.actor.update({ "data.attributes.hp.temp": 0 });
    };
    if (flag.name === "bull") {
        target.actor.unsetFlag('dnd5e', 'powerfulBuild', false);
        target.actor.update({ "flags.midi-qol.advantage.ability.check.str": 0 });
    };
    if (flag.name === "cat") {
        target.actor.update({ "flags.midi-qol.advantage.ability.check.dex": 0 });
    };
    if (flag.name === "eagle") {
        target.actor.update({ "flags.midi-qol.advantage.ability.check.cha": 0 });
    };
    if (flag.name === "fox") {
        target.actor.update({ "flags.midi-qol.advantage.ability.check.int": 0 });
    };
    if (flag.name === "owl") {
        target.actor.update({ "flags.midi-qol.advantage.ability.check.wis": 0 });
    };
    target.actor.unsetFlag('world', 'enhanceAbility');
    ChatMessage.create({ content: "Enhance Ability has expired" });
}