(async () => {
    let t = canvas.tokens.controlled[0];
    console.log("##########: ", t)
    if (args[0] === "on") {
        t.update({
            dimLight: 30,
            brightLight: 15,
            lightAnimation: { type: "pulse", speed: 2, intensity: 2 },
            lightAlpha: 0.15,
            lightColor: "#f8c377"
        }); 
    };
    if (args[0] === "off") {
        t.update({
            dimLight: 0,
            brightLight: 0,
            lightAnimation: { type: "pulse", speed: 2, intensity: 2 }
        });
    };
})();