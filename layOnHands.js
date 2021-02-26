//When a player uses LOH, they should uncheck the first "Consume Available usage. Otherwise an extra point will be used
(async () => {
    if (game.user.targets.size != 1) {
        ui.notifications.error("Please target a single token.");
        return;
    };
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    let target = Array.from(game.user.targets)[0].actor;
    let currHP = Number(target.data.data.attributes.hp.value);
    if (currHP >= target.data.data.attributes.hp.max) {
        ui.notifications.error(target.data.name + " is already at max health");
        return;
    };
    let contrChar = canvas.tokens.controlled[0];
    let availLOH = contrChar.actor.items.find(i => i.data.name = "Lay on Hands").data.data.uses.value;
    if (availLOH < 1) {
        ui.notifications.error("No Lay on Hands points are available.");
        return;
    };
    var useLOH = parseInt(prompt("How many points? Max: " + availLOH));
    if (useLOH > availLOH) {
        ui.notifications.error("Not enough Lay on Hands points are available.");
        return;
    };
    let dataLOH = contrChar.actor.items.find(i => i.data.name = "Lay on Hands");
    await dataLOH.update({ "data.uses.value": availLOH - useLOH });
    await target.update({ "data.attributes.hp.value": currHP + useLOH });
})();