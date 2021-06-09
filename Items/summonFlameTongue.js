//DAE Macro Execute,Item Macro
let a = game.actors.get(args[1].actorId);

/**
 * Create Flame Tongue item in inventory
 */
if (args[0] === "on") {
    await a.createOwnedItem(
        {           
            "data": {
                "ability": "",
                "actionType": "mwak",
                "activation": {
                    "condition": "",
                    "cost": 1,
                    "type": "action"                  
                },
                "attackBonus": 0,
                "attuned": false,
                "attunement": 0,
                "chatFlavor": "",
                "consume": {
                    "type": "",
                    "target": "",
                    "amount": null
                },
                "critical": "null",
                "damage": {
                    "parts": [
                        [
                            "1d8 + @mod",
                            "slashing"
                        ],
                        [
                            "2d6",
                            "fire"
                        ]
                    ],
                    "versatile": "1d10 + @mod"
                },
                "duration": {
                    "value": null,
                    "units": ""
                },
                "equipped": true,
                "identified": true,
                "proficient": true,
                "properties": {
                    "mgc": true,
                    "ver": true
                },
                "quantity": 1,
                "range": {
                    "long": null,
                    "units": "ft",
                    "value": 5
                },
                "target": {
                    "type": "creature",
                    "units": "",
                    "value": 1,
                    "width": null                  
                },
                "uses": {
                    "max": 0,
                    "per": "",
                    "value": 0
                },
                "weaponType": "martialM",
            },
            "img": "systems/dnd5e/icons/skills/fire_13.jpg",
            "name": "Summoned Flame Tongue",
            "type": "weapon",
        }
    );
}

// Delete Flame Tongue
if (args[0] === "off") {
    let item = a.data.items.find(i => i.name === "Summoned Flame Tongue" && i.type === "weapon");
    a.deleteOwnedItem(item._id)
}