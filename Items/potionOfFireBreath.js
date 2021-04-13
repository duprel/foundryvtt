//DAE Macro Execute, Effect Value = "Macro Name"

let t = canvas.tokens.controlled[0];
let data = {}
/**
 * Create Fire Breath item in inventory
 */
if (args[0] === "on") {
    await t.actor.createOwnedItem(
        {   
            "data": {
                "actionType": "save",
                "damage": {
                    "parts": [
                        [
                            "4d6",
                            "fire"
                        ]
                    ],
                },
                "equipped": true,
                "quantity": 1,
                
                "activation": {
                    "type": "action",
                    "cost": 1,
                    "condition": ""
                },
                "proficient": true,
                "properties": {
                    "halfdam": true,
                },
                "range": {
                    "value": 30,
                    "long": null,
                    "units": "feet"
                },
                "save": {
                    "ability": "dex",
                    "dc": 13,
                    "scaling": "flat"
                },
                "target": {
                    "value": 1,
                    "type": "creature"
                },
                "uses": {
                    "max": 3,
                    "per": "charges",
                    "value": 0 
                },
                "weaponType": "simpleM",
            },
            "img": "modules/plutonium/media/icon/spell/xge-dragons-breath.jpg",
            "name": "Fire Breath",
            "type": "weapon",
        }
    );
}

// Delete Flame Blade
if (args[0] === "off") {
    let item = target.actor.data.items.find(i => i.name === "Summoned Flame Blade" && i.type === "weapon");
    target.actor.deleteOwnedItem(item._id)
}