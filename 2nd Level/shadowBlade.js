//Itemmacro DAE @item.level

(async () => {
    if (args[0] === "on") {
        var data = {};
        var weaponDamage;

        if (args[1] === 2) {
            weaponDamage = 2;
        };
        if (args[1] === 3 || args[1] === 4) {
            weaponDamage = 3;
        };
        if (args[1] === 5 || args[1] === 6) {
            weaponDamage = 4;
        };
        if (args[1] > 6) {
            weaponDamage = 5;
        };

        await actor.createOwnedItem(
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
    };

    if (args[0] === "off") {
        let item = actor.data.items.find(i => i.name === "Summoned Shadow Blade" && i.type === "weapon")
        actor.deleteOwnedItem(item._id)
    };
})();
