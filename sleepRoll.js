(() => {
    if (args[0] == "on") {
        let slotLevel = args[1];
        let numDice = (3 + 2 * slotLevel);
        let r = new Roll(`${numDice}d8`).roll().toMessage({flavor: "Sleep: HP affected"});
        console.log(r);
    } else {
        return;
    }
})();