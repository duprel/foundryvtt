(async () => {
    let tok = canvas.tokens.get(args[2].tokenId);
    let dimSight = tok.data.dimSight;
    let brightSight = tok.data.brightSight;
    let dimLight = tok.data.dimLight;
    let brightLight = tok.data.brightLight;
    let lightAngle = tok.data.lightAngle;
    let lockRotation = tok.data.lockRotation;
    let lightAnimation = tok.data.lightAnimation;
    let lightAlpha = tok.data.lightAlpha;
    let lightColor = tok.data.lightColor;
    var lightArr = [dimSight, brightSight, dimLight, brightLight, lightAngle, lockRotation, lightAnimation, lightAlpha, lightColor];
    if (tok.data.flags.world === undefined || tok.data.flags.world === null) {
        tok.setFlag('world', 'visionArray');
    };
    if (tok.data.flags.world.visionArray === undefined || tok.data.flags.world.visionArray === null) {
        tok.setFlag('world', 'visionArray', { lightArr });
    };
    if (args[0] === "on") {
        switch (args[1]) {
            case "candleInv":
                dimLight = 30;
                brightLight = 0;
                lightAngle = 360;
                lockRotation = false;
                lightAnimation = { type: "torch", speed: 2, intensity: 5 };
                lightAlpha = 0.16;
                lightColor = "#e8f29c";
                break;
            case "frostBrand":
                dimLight = 20;
                brightLight = 10;
                lightAngle = 360;
                lockRotation = false;
                lightAnimation = { type: "torch", speed: 2, intensity: 5 };
                lightAlpha = 0.16;
                lightColor = "#05e6e2";
                break;
            case "HoB":
                dimLight = 30;
                brightLight = 0;
                lightAngle = 360;
                lockRotation = false;
                lightAnimation = { type: "chroma", speed: 2, intensity: 5 };
                lightAlpha = 0.16;
                lightColor = "#faf319";
                break;
        };
        tok.update({
            dimSight: dimSight,
            brightSight: brightSight,
            dimLight: dimLight,
            brightLight: brightLight,
            lightAngle: lightAngle,
            lockRotation: lockRotation,
            lightAnimation: lightAnimation,
            lightAlpha: lightAlpha,
            lightColor: lightColor
        });

    };
    if (args[0] === "off") {
        tok.update({
            dimSight: tok.data.flags.world.visionArray.lightArr[0],
            brightSight: tok.data.flags.world.visionArray.lightArr[1],
            dimLight: tok.data.flags.world.visionArray.lightArr[2],
            brightLight: tok.data.flags.world.visionArray.lightArr[3],
            lightAngle: tok.data.flags.world.visionArray.lightArr[4],
            lockRotation: tok.data.flags.world.visionArray.lightArr[5],
            lightAnimation: tok.data.flags.world.visionArray.lightArr[6],
            lightAlpha: tok.data.flags.world.visionArray.lightArr[7],
            lightColor: tok.data.flags.world.visionArray.lightArr[8]
        });
        tok.unsetFlag('world', 'visionArray');
    };
})();