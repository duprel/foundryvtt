var a = canvas.tokens.controlled[0];
if (args[0] === "on") {
    if (canvas.tokens.controlled.length != 1) {
        ui.notifications.error("Please select a single token.");
        return;
    };
    let data = {};
    if (args[0] === "on") {
        if (args[1] == 2) {
            var weaponDamage = 2;
        } else if (args[1] > 6) {
            var weaponDamage = 5;
        } else {
            if (args[1] % 2 == 0) {
                var weaponDamage = 1 + Math.floor(args[1] / 2);
            } else {
                var weaponDamage = 2 + Math.floor(args[1] / 2);
            }
        };
    };
    await a.actor.createOwnedItem(
        {
            "name": "Summoned Shadow Blade",
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
                    "value": 5,
                    "long": null,
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
                "actionType": "mwak",
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            `${weaponDamage}d8`,
                            "psychic"
                        ]
                    ],
                    "versatile": ""
                },
                "weaponType": "simpleM",
                "proficient": true,
                "equipped": true,
                "properties": {
                    "fin": true,
                    "lgt": true,
                    "thr": true
                },
            },
            "img": "modules/plutonium/media/icon/spell/xge-shadow-blade.jpg",
        }
    );
} else {
    let item = a.actor.data.items.find(i => i.name === "Summoned Shadow Blade" && i.type === "weapon")
    a.actor.deleteOwnedItem(item._id)
};