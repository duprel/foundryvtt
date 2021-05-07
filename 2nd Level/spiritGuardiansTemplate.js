(async () => {
    let t = canvas.tokens.get(args[1].tokenId);
    if (args[0] === "on") {
        let xPos = (t._validPosition.x + 50);
        let yPos = (t._validPosition.y + 50);
        await MeasuredTemplate.create({
            t: "circle",
            user: game.user._id,
            x: xPos,
            y: yPos,
            distance: 15,
            borderColor: "#FF0000",
            fillColor: "#FF3366",
            texture: "modules/jb2a_patreon/Library/3rd_Level/Spirit_Guardians/SpiritGuardians_01_Light_BlueYellow_600x600.webm",
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
        await tokenAttacher.attachElementToToken(template, t, false)
    };
})();