//DAE Macro Execute, Effect Value = "Macro Name" @target @item.level
let target = canvas.tokens.get(args[1]);
let data = {}
const lastArg = args[args.length - 1];
const item = lastArg.efData.flags.dae.itemData;
if (args[0] === "on") {
    let image = item.img;
    let damage = Math.floor((parseInt(args[2]) / 2));
    await target.actor.createOwnedItem(
        {
            "name": "Summoned Spiritual Weapon",
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
                "attackBonus": "0",
                "chatFlavor": "",
                "critical": null,
                "damage": {
                    "parts": [
                        [
                            `${damage}d8+@mod`,
                            "force"
                        ]
                    ],
                },
                "weaponType": "simpleM",
                "proficient": true
            },
            "flags": {
                "DAESRD": {
                    "SpiritualWeapon":
                        target.actor.id
                }
            },
            "img": `${image}`,
        },
    );
    ui.notifications.notify("Weapon created in your inventory");
    await Summoner.placeAndSummon(
        target.actor,
        "Summoned Spiritual Weapon",
    );
} else {
    let item = target.actor.items.find(i => i.data.flags?.DAESRD?.SpiritualWeapon === target.actor.id)
    let template = canvas.templates.placeables.filter(i => i.data.flags.DAESRD?.SpiritualWeapon?.ActorId === target.actor.id)
    await target.actor.deleteOwnedItem(item.id);
    await Summoner.dismiss("Summoned Spiritual Weapon");
};


