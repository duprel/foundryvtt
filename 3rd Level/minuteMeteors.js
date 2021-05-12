/**args[1] = @spellLevel, dae item macro **/

let a = game.actors.get(args[2].actorId);
if (args[0] === "on") {
    let numMeteors = args[1] * 2;
    await a.createOwnedItem(
        {
            "data": {
                "actionType": "save",
                "activation": {
                    "condition": "",
                    "cost": 1,
                    "type": "bonus"
                },
                "damage": {
                    "parts": [
                        [
                            "2d6",
                            "fire"
                        ]
                    ],
                },
                "duration": {
                    "units": "inst",
                },
                "equipped": true,
                "identified": true,
                "proficient": true,
                "properties": {
                    "halfdam": true
                },
                "quantity": 1,
                "range": {
                    "units": "ft",
                    "value": 120
                },
                "save": {
                    "ability": "dex",
                    "dc": `${a.data.data.attributes.spelldc}`,
                    "scaling": "flat"
                },
                "target": {
                    "type": "cube",
                    "units": "ft",
                    "value": 15
                },
                "uses": {
                    "max": `${numMeteors}`,
                    "per": "charges",
                    "value": `${numMeteors}`
                },
            },
            "img": "modules/plutonium/media/icon/spell/xge-melfs-minute-meteors.jpg",
            "name": "Minute Meteors",
            "type": "weapon"
        }
    );
};
if (args[0] === "off") {
    let item = a.data.items.find(i => i.name === "Minute Meteors" && i.type === "weapon")
    a.deleteOwnedItem(item._id);
};