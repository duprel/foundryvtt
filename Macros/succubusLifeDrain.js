(async () => {
    const lastArg = args[args.length - 1];
    let tarTok = canvas.tokens.get(lastArg.tokenId);
    let tarAct = tarTok.actor;
    if (args[0] === "on") {
        let maxHP = tarAct.data.data.attributes.hp.max;
        if (tarAct.data.flags.world === undefined || tarAct.data.flags.world === null) {
            tarAct.setFlag('world', 'sucLifeDrain');
        };
        if (tarAct.data.flags.world.sucLifeDrain === undefined || tarAct.data.flags.world.sucLifeDrain === null) {
            tarAct.setFlag('world', 'sucLifeDrain', { maxHP: maxHP });
        };
        let currMax = tarAct.data.data.attributes.hp.max - args[1];
        await tarAct.update({ "data.attributes.hp.max": currMax });
    };
    if (args[0] === "off") {
        await tarAct.update({ "data.attributes.hp.max": tarAct.data.flags.world.sucLifeDrain.maxHP });
        await tarAct.unsetFlag('world', 'sucLifeDrain');
    };
})();