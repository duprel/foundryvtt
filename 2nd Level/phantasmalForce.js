﻿//The spell has to expire for the Phantasmal Force to be deleted. Otherwise the effect must be deleted on the character sheet (not toggled)
// args[1] = @target
if (canvas.tokens.controlled.length != 1) {
    ui.notifications.error("Please select a single token.");
    return;
}
let t = canvas.tokens.controlled;
if (args[0] === "on") {
    let data = {};
    await t.actor.createOwnedItem(
        {
            "name": "Phantasmal Force Damage",
            "type": "weapon",
            "data": {
                "quantity": 1,
                "activation": {
                    "type": "bonus",
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
                    "value": 0,
                    "max": 0,
                    "per": ""
                },
                "consume": {
                    "type": "",
                    "target": "",
                    "amount": null
                },
                "ability": "",
                "actionType": "util",
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            "1d6",
                            "psychic"
                        ]
                    ],
                },
                "weaponType": "simpleM",
                "proficient": true,
                "equipped": true,
            },
            "img": "modules/plutonium/media/icon/spell/phb-phantasmal-force.jpg",
        }
    );
} else {
    let item = t.actor.data.items.find(i => i.name === "Phantasmal Force Damage" && i.type === "weapon")
    t.actor.deleteOwnedItem(item._id)
};