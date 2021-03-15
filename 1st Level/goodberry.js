//The spell has to expire for the goodberries to be deleted. Otherwise the effect must be deleted on the character sheet (not toggled)
if (game.user.targets.size != 1) {
    ui.notifications.error("Please target a single token.");
    return;
};
var t = Array.from(game.user.targets)[0];
if (args[0] === "on") {
    let data = {};
    await t.actor.createOwnedItem(
        {
            "name": "Goodberries",
            "type": "consumable",
            "data": {
                "quantity": 10,
                "activation": {
                    "type": "action",
                    "cost": 1,
                    "condition": ""
                },
                "duration": {
                    "value": 24,
                    "units": "hour"
                },
                "target": {
                    "value": 1,
                    "width": null,
                    "units": "",
                    "type": "creature"
                },
                "range": {
                    "value": null,
                    "long": null,
                    "units": "creature"
                },
                "uses": {
                    "autodestroy": true,
                    "autouse": true,
                    "value": 10,
                    "max": 10,
                    "per": "charges"
                },
                "consume": {
                    "type": "",
                    "target": "",
                    "amount": null
                },
                "ability": "",
                "actionType": "heal",
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            "1",
                            "healing"
                        ]
                    ],
                },
            },
            "img": "media/images/WoW/Miscellaneous/Organ_06.webp",
        }
    );
} else {
    let item = t.actor.data.items.find(i => i.name === "Goodberries" && i.type === "consumable")
    t.actor.deleteOwnedItem(item._id)
};