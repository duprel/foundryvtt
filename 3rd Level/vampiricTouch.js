//args[1] = spell level
(async () => {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    }
    var t = canvas.tokens.controlled[0];
    if (args[0] === "on") {
        let diceNum = args[1];
        let data = {};
        await t.actor.createOwnedItem(
            {
                "name": "Vampiric Touch Attack",
                "type": "weapon",
                "data": {
                    "quantity": 1,
                    "activation": {
                        "type": "action",
                        "cost": 1,
                        "condition": ""
                    },
                    "duration": {
                        "value": 1,
                        "units": "minute"
                    },
                    "target": {
                        "value": 1,
                        "width": null,
                        "units": "",
                        "type": "creature"
                    },
                    "range": {
                        "value": 5,
                        "long": null,
                        "units": "ft"
                    },
                    "ability": "",
                    "actionType": "msak",
                    "attackBonus": "0",
                    "chatFlavor": "",
                    "equipped": true,
                    "critical": null,
                    "damage": {
                        "parts": [
                            [
                                `${diceNum}d8`,
                                "necrotic"
                            ]
                        ],
                    },
                },
                "img": "systems/dnd5e/icons/spells/rip-sky-2.jpg",
            }
        );
    } else {
        let item = t.actor.data.items.find(i => i.name === "Vampiric Touch Attack" && i.type === "weapon")
        t.actor.deleteOwnedItem(item._id)
    };
})();
