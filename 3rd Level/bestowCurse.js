//DAE Macro Execute, Effect Value = "Macro Name" @target 

var target = canvas.tokens.get(args[1]);
var saveDC = args[2];
var tokenID = target.actor._data._id;

/**
 * For each target select the effect (GM selection)
 */
if (args[0] === "on") {
    new Dialog({
        title: "Choose curse effect for " + target.name,
        buttons: {
            one: {
                label: "Curse: Ability",
                callback: () => {
                    new Dialog({
                        title: "Choose ability to curse",
                        buttons: {
                            one: {
                                label: "Strength",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "STR",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.str": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.str": 1 });
                                }
                            },
                            two: {
                                label: "Dexterity",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "DEX",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.dex": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.dex": 1 });
                                }
                            },
                            three: {
                                label: "Constitution",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "CON",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.con": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.con": 1 });
                                }
                            },
                            four: {
                                label: "Intelligence",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "INT",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.int": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.int": 1 });
                                }
                            },
                            five: {
                                label: "Wisdom",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "WIS",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.wis": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.wis": 1 });
                                }
                            },
                            six: {
                                label: "Charisma",
                                callback: () => {
                                    target.actor.setFlag('world', 'bestowCurse', {
                                        name: "CHA",
                                    });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.check.cha": 1 });
                                    target.actor.update({ "flags.midi-qol.disadvantage.ability.save.cha": 1 });
                                }
                            }
                        }
                    }).render(true);

                }
            },
            two: {
                label: "Curse: Attack Rolls",
                callback: () => {
                    target.actor.setFlag('world', 'bestowCurse', {
                        name: "ATK",
                    });
                    target.actor.update({ "flags.midi-qol.disadvantage.attack.all" : 1 });
                }
            },
            three: {
                label: "Confusion",
                callback: () => {
                    target.actor.setFlag('world', 'bestowCurse', {
                        name: "COF",
                    });
                    let tokenID = target.data._id;
                    let turnID = game.combat.combatants.find(i => i.tokenId == tokenID)._id;
                    const alertData = {
                        round: 0,
                        roundAbsolute: false,
                        turnId: turnID,
                        repeating: {
                            frequency: 1,
                            expire: null,
                            expireAbsolute: false,
                        },
                        message: "Make a Wisdom Save DC: " + args[2] +" !",
                        macro: "acidArrowDamage",
                        args: [tokenID, args[2]],
                    };
                    TurnAlert.create(alertData);
                }
            },
            four: {
                label: "Improved Hex",
                callback: () => {
                    target.actor.setFlag('world', 'bestowCurse', {
                        name: "HEX",
                    });
                }
            }
        }
    }).render(true);
}

if (args[0] === "off") {
    let flag = target.actor.getFlag('world', 'bestowCurse');
    if (flag.name === "STR") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.str": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.str": 0 });
    };
    if (flag.name === "DEX") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.dex": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.dex": 0 });
    };
    if (flag.name === "CON") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.con": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.con": 0 });
    };
    if (flag.name === "INT") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.int": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.int": 0 });
    };
    if (flag.name === "WIS") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.wis": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.wis": 0 });
    };
    if (flag.name === "CHA") {
        target.actor.update({ "flags.midi-qol.disadvantage.ability.check.cha": 0 });
        target.actor.update({ "flags.midi-qol.disadvantage.ability.save.cha": 0 });
    };
    if (flag.name === "ATK") {
        target.actor.update({ "flags.midi-qol.disadvantage.attack.all" : 1 });
    };
    if (flag.name === "COF") {
            
    };
    if (flag.name === "COF") {

    };
    target.actor.unsetFlag('world', 'bestowCurse');
}