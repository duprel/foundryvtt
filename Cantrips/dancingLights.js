let a = game.actors.get(args[1].actorId);
let tName = "Dancing Lights";
let end = 14;
let aName = a.data.name;
let fName = aName + "'s " + tName;
if (args[0] === "on") {
    await Summoner.placeAndSummon(
        a,
        tName,
    );
    for (let token of canvas.tokens.placeables) {
        if (token.data.name.substring(0, end) === tName) {
            await token.update({ name: fName })
            await token.update({ disposition: '1' })
        }
    };
};
if (args[0] === "off") {
    await Summoner.dismiss(tName);
};