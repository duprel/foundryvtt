//DAE Macro Execute, Effect Value = "Macro Name" @target 
let target = canvas.tokens.get(args[1]);
let data = {}
const lastArg = args[args.length - 1];
const item = lastArg.efData.flags.dae.itemData;
if (args[0] === "on") {
    let image = item.img;
    let damage = Math.floor((parseInt(args[2]) / 2));
    await target.actor.createOwnedItem(
        {
            "name": "Quaal's Feather Token: Whip",
            "type": "weapon",
            "data": {
                "equipped": true,
                "identified": true,
                "activation": {
                    "type": "bonus",
                },
                "target": {
                    "value": 1,
                    "width": null,
                    "type": "creature"
                },
                "range": {
                    "value": 5,
                    "units": "ft"
                },
                "ability": "",
                "actionType": "msak",
                "attackBonus": "9",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            "1d6+5",
                            "force"
                        ]
                    ],
                },
                "weaponType": "simpleM",
                "proficient": false
            },
            "flags": {
                "DAESRD": {
                    "FeatherToken":
                        target.actor.id
                }
            },
            "img": `${image}`,
        },
    );
    ui.notifications.notify("Weapon created in your inventory");
    await Summoner.placeAndSummon(
        target.actor,
        "Summoned Feather Token",
    );
} else {
    let item = target.actor.items.find(i => i.data.flags?.DAESRD?.FeatherToken === target.actor.id)
    let template = canvas.templates.placeables.filter(i => i.data.flags.DAESRD?.FeatherToken?.ActorId === target.actor.id)
    await target.actor.deleteOwnedItem(item.id);
    await Summoner.dismiss("Summoned Feather Token");
};


