// args[1] = token id

const t = canvas.tokens.get(args[1]);
if (args[0] === "on") {
    let newInfections = new Roll("d6").roll();
    if (t.actor.data.flags.world.rotGrubs === undefined || t.actor.data.flags.world.rotGrubs === null)  {
        await t.actor.setFlag("world", "rotGrubs", { value: newInfections._total });
        newInfections.toMessage({ flavor: `${t.data.name} total Rot Grub Infections: ${newInfections._total}` });
        return;
    };
    if (t.actor.data.flags.world.rotGrubs != undefined && t.actor.data.flags.world.rotGrubs != null) {
        let currInfections = t.actor.data.flags.world.rotGrubs.value + newInfections._total;
        await t.actor.setFlag("world", "rotGrubs", { value: currInfections });
        newInfections.toMessage({ flavor: `${t.data.name} total Rot Grub Infections: ${currInfections}` });
        console.log("FARTON: ", currInfections);
        return;
    };
};
if (args[0] === "each") {
    let damDice = t.actor.data.flags.world.rotGrubs.value;
    let damRoll = new Roll(`${damDice}d6[piercing]`).roll();
    new MidiQOL.DamageOnlyWorkflow(actor, token, damRoll.total, "piercing", [t], damRoll, { flavor: "Rot Grub Damage Roll (Piercing)" });
};
