//DAE Macro Execute, Effect Value = "Macro Name"

let t = canvas.tokens.controlled[0];
let data = {};
/**
 * Create Fire Breath item in inventory
 */
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
                "autoDestroy": true,
                "autoUse": true,
                "max": 3,
                "per": "charges",
                "value": 3,
            },
            "weaponType": "simpleM",
        },
        "flags": {
            "autoanimations": {
                "animName": "Fire Bolt",
                "animTint": "#ffffff",
                "animType": "t6",
                "auraOpacity": 0.75,
                "color": "orange",
                "ctaOption": false,
                "dtvar": "dt1",
                "explodeColor": "ec1",
                "explodeLoop": "1",
                "explodeRadius": "0",
                "explodeVariant": "ev1",
                "explosion": false,
                "hmAnim": "a1",
                "killAnim": false,
                "override": true,
                "selfRadius": "5",
            },
        },
        "img": "modules/plutonium/media/icon/spell/xge-dragons-breath.jpg",
        "name": "Fire Breath",
        "type": "weapon",
    }
);


