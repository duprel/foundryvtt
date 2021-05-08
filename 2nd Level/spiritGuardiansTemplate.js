(async () => {
    let t = canvas.tokens.get(args[1].tokenId);
    const offset = 50;
    const textr = "modules/jb2a_patreon/Library/3rd_Level/Spirit_Guardians/SpiritGuardians_01_Light_BlueYellow_600x600.webm";
    const size = 20;
    if (args[0] === "on") {
        let xPos = (t._validPosition.x + offset);
        let yPos = (t._validPosition.y + offset);
        await MeasuredTemplate.create({
            t: "circle",
            user: game.user._id,
            x: xPos,
            y: yPos,
            distance: size,
            borderColor: "#FF0000",
            fillColor: "#FF3366",
            texture: textr,
            flags: {
                DAESRD: {
                    SpiritGuardians: {
                        ActorId: t.actor.id
                    }
                }
            },
        });
        let template = canvas.templates.placeables.find(i => i.data.flags.DAESRD?.SpiritGuardians?.ActorId === t.actor.id);
        console.log("##############:    ", template, xPos);
        await tokenAttacher.attachElementToToken(template, t, false);
    };
    if (args[0] === "off") {
        let template = canvas.templates.placeables.find(i => i.data.flags.DAESRD?.SpiritGuardians?.ActorId === t.actor.id);
        await canvas.templates.get(template.data._id).delete();
    };
})();