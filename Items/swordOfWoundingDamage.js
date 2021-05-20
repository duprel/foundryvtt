(async () => {
    let t = canvas.tokens.get(args[2].tokenId).actor;
    if (args[0] === "on") {
        if (t.data.flags.world === undefined || t.data.flags.world === null) {
            t.setFlag('world', 'swordOfWounding');
        };
        if (t.data.flags.world.swordOfWounding === undefined || t.data.flags.world.swordOfWounding === null) {
            t.setFlag('world', 'swordOfWounding', { maxHP: t.data.data.attributes.hp.max, });
        };
        let currMax = t.data.data.attributes.hp.max - args[1];
        await t.update({ "data.attributes.hp.max": currMax });
    };
    if (args[0] === "off") {
        console.log("###########", t.data.flags.world.swordOfWounding.maxHP);
        await t.update({ "data.attributes.hp.max": t.data.flags.world.swordOfWounding.maxHP });
        await t.unsetFlag('world', 'swordOfWounding');
    };
})();