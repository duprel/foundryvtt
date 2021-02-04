(() => {
    if (args[0] == "on") {
        let slotLevel = args[1];
        let numDice = (4 + 2 * slotLevel);
        let r = new Roll(`${numDice}d10`).roll().toMessage({flavor: "Color Spray: HP affected"});
        console.log(r);
    } else {
        return;
    }
})();