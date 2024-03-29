﻿//ItemMacro

let tName = "Djinni";
let end = tName.length;
let aName = actor.data.name;
await Summoner.placeAndSummon(
    actor,
    tName,
);
for (let token of canvas.tokens.placeables) {
    if (token.data.name.substring(0, end) === tName) {
        await token.update({ name: aName + "'s " + tName })
        await token.update({ disposition: '1' })
    }
};