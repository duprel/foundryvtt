//ItemMacro

(async () => {
    if (args[0].failedSaves.length === 0) {
        console.log("Passed save or no target");
        return;
    };
    let a = game.actors.get(args[0].actor._id);
    let hpHealed = Math.floor(args[0].damageTotal / 2);
})();