(async () => {
    if (args[0] === "off") {
        let a = canvas.tokens.controlled[0].actor;
        let oldMax = a.data.flags.world.chasmeLifeDrain.value;
        a.update({ "data.attributes.hp.max": oldMax });
        a.unsetFlag('world', 'chasmeLifeDrain')
    };
})();