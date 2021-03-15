//The spell has to expire for the Magic Stones to be deleted. Otherwise the effect must be deleted on the character sheet (not toggled)
// args[1] = @target
if (game.user.targets.size != 1) {
    ui.notifications.error("Please target a single token.");
    return;
};
var t = Array.from(game.user.targets).find(i => i.data._id == args[1]);
console.log("@@@@@@@@@@@@@@@@@@@:    ", t);
if (args[0] === "on") {
    let data = {};
    await t.actor.createOwnedItem(
        {
            "name": "Magic Stones",
            "type": "weapon",
            "data": {
                "quantity": 1,
                "activation": {
                    "type": "action",
                    "cost": 1,
                    "condition": ""
                },
                "duration": {
                    "value": null,
                    "units": ""
                },
                "target": {
                    "value": 1,
                    "width": null,
                    "units": "",
                    "type": "creature"
                },
                "range": {
                    "value": null,
                    "long": 60,
                    "units": "feet"
                },
                "uses": {
                    "autodestroy": true,
                    "autouse": true,
                    "value": 3,
                    "max": 3,
                    "per": "charges"
                },
                "consume": {
                    "type": "",
                    "target": "",
                    "amount": null
                },
                "ability": "wis",
                "actionType": "rsak",
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            "1d6 + @abilities.wis.mod",
                            "bludgeoning"
                        ]
                    ],
                },
                "weaponType": "simpleR",
                "proficient": true,
                "equipped": true,
            },
            "img": "modules/plutonium/media/icon/spell/xge-magic-stone.jpg",
        }
    );
} else {
    console.log("@@@@@@@@@@@@@@@@@@@:    ", t);
    let item = t.actor.data.items.find(i => i.name === "Magic Stones" && i.type === "weapon")
    t.actor.deleteOwnedItem(item._id)
};