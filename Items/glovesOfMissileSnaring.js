let a = canvas.tokens.controlled[0].actor;
let damage = a.data.flags.dae.damgeApplied;
let catchMis = new Roll("d10 + @abilities.dex.mod", a.getRollData()).roll();
if (catchMis._total >= damage) {
    catchMis.toMessage({ flavor: `${a.name} catches the missile! No damage!.`, });
    a.update({ "data.attributes.hp.value": (a.data.data.attributes.hp.value + damage) });
};
if (catchMis._total < damage) {
    catchMis.toMessage({ flavor: `${a.name} reduces damage by ${catchMis._total}.`, });
    a.update({ "data.attributes.hp.value": (a.data.data.attributes.hp.value + damage - catchMis._total ) });
};