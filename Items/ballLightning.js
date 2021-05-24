function reName(end, aName, tName, damDice) {
    for (let token of canvas.tokens.placeables) {
        if (token.data.name.substring(0, end) === tName) {
            token.actor.createOwnedItem({
                "data": {
                    "ability": "dex",
                    "actionType": "save",
                    "activation": {
                        "cost": 1,
                        "type": "bonus"
                    },
                    "damage": {
                        "parts": [
                            [
                                `${damDice}`,
                                "lightning"
                            ]
                        ],
                    },
                    "range": {
                        "units": "ft",
                        "value": 5
                    },
                    "save": {
                        "ability": "dex",
                        "dc": 15,
                        "scaling": "flat"
                    },
                    "target": {
                        "type": "creature",
                        "value": 1
                    },
                    "uses": {
                        "max": 1,
                        "per": "charges",
                        "value": 1
                    },
                },
                "img": "systems/dnd5e/icons/spells/light-sky-3.jpg",
                "name": "Ball Lightning",
                "type": "feat"
            });
            token.update({ name: aName + "'s " + tName });
            token.update({ disposition: '1' });
        };
    };
}

let a = game.actors.get(args[1].actorId);
let tName = "Ball Lightning";
let end = 14;
if (args[0] === "on") {
    new Dialog({
        title: "Choose the number of Ball Lightning Summoned.",
        buttons: {
            one: {
                label: "1",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        tName,
                    ).then(() => reName(end, a.data.name, tName, "4d12"));
                }
            },
            two: {
                label: "2",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        tName,
                    ).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    )).then(() => reName(end, a.data.name, tName, "5d4"));
                }
            },
            three: {
                label: "3",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        tName,
                    ).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    )).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    ))
                        .then(() => reName(end, a.data.name, tName, "2d6"));
                }
            },
            four: {
                label: "4",
                callback: () => {
                    Summoner.placeAndSummon(
                        a,
                        tName,
                    ).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    )).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    )).then(() => Summoner.placeAndSummon(
                        a,
                        tName,
                    ))
                        .then(() => reName(end, a.data.name, tName, "2d4"));
                }
            },
        }
    }).render(true);
};