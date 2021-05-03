let a = game.actors.get(args[0].actor._id);
let tName = "Flaming Sphere";
let end = 14;
let aName = a.data.name;
let fName = aName + "'s " + tName;
await Summoner.placeAndSummon(
    a,
    tName,
);
for (let token of canvas.tokens.placeables) {
    if (token.data.name.substring(0, end) === tName) {
        await token.update({ name: fName })
        await token.update({ disposition: '1' })
    }
};
let nameSphere = canvas.tokens.placeables.find(i => i.data.name == fName);

let weaponDamage = args[0].spellLevel;
let spellDC = args[0].actor.data.attributes.spelldc;

await nameSphere.actor.createOwnedItem(
    {
        "name": "Flaming Sphere Attack",
        "type": "weapon",
        "data": {
            "actionType": "save",
            "activation": {
                "type": "special",
                "cost": 0,
                "condition": "enemy within 5 ft"
            },
            "damage": {
                "parts": [
                    [
                        `${weaponDamage}d6`,
                        "fire"
                    ]
                ],
                "versatile": ""
            },
            "description": {
                "value": " <p> A 5-foot - diameter Sphere of fire appears in an unoccupied space of your choice within range and lasts for the Duration.Any creature that ends its turn within 5 feet of the sp⁠here must make a Dexterity saving throw.The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one.</p><p>As a Bonus Action, you can move the Sphere up to 30 feet. If you ram the sphe⁠re into a creature, that creature must make the saving throw against the sphere&rsquo;s damage, and the sp⁠here stops moving this turn.</p><p>When you move the Sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. The sp⁠here ignites flammable Objects not being worn or carried, and it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.</p><p><strong>At Higher Levels.</strong>&nbsp;When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.</p>"
            },
            "equipped": true,
            "indentified": true,
            "proficient": true,
            "properties": {
                "halfdam": true,
                "mgc": true
            },
            "quantity": 1,
            "range": {
                "value": 30,
                "long": null,
                "units": "feet"
            },
            "save": {
                "ability": "dex",
                "dc": `${spellDC}`,
                "scaling": "flat"
            },
            "target": {
                "value": 8,
                "width": null,
                "units": "",
                "type": "creature"
            },
        },
        "img": "systems/dnd5e/icons/spells/light-air-fire-3.jpg",
    }
);