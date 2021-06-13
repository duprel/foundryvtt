//ItemMacro

(async () => {
    if (args[0].failedSaves.length === 0) {
        console.log("Passed save or no target");
        return;
    };
    let a = game.actors.get(args[0].actor._id);
    let hpHealed = Math.floor(args[0].damageTotal / 2);
    let currHP = a.data.data.attributes.hp.value;
    let maxHP = a.data.data.attributes.hp.max;
    if (currHP + hpHealed > maxHP) {
        a.update({ "data.attributes.hp.value": maxHP });
    };
    if (a.data.data.attributes.hp.value < a.data.data.attributes.hp.max) {
        a.update({ "data.attributes.hp.value": currHP + hpHealed });
    };
})();