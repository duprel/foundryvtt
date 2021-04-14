(async () => {
    let t = canvas.tokens.controlled[0];
    if (args[0] === "on") {
        t.update({
            dimLight: 60,
            brightLight: 30,
            lightAnimation: { type: "torch", speed: 2, intensity: 2 },
            lightAlpha: 0.15,
            lightColor: "#f8c377"
        });    
    } else {
        t.update({
            dimLight: 0,
            brightLight: 0,
        });
    };
})();

