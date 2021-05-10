// args[1] = token id
let t = canvas.tokens.get(args[1]);
if (args[0] === "on") {
    let newInfections = new Roll("d6").roll();
    if (t.actor.data.flags.world.rotGrubs === undefined || t.actor.data.flags.world.rotGrubs === null)  {
        await t.actor.setFlag("world", "rotGrubs", { value: newInfections._total });
        newInfections.toMessage({ flavor: `${t.data.name} total Rot Grub Infections: ${newInfections._total}` });
    };
};








//Roll for number of rot grub infections

|| infections === 0
//check rotgrub flag

 /** check rotgrub flag
  * if null, undefined or 0
    * set to 0
        *     else
 * current number + new infections
 **/
  

/***
 * 
 * roll 1d6 = number of infections
 

 *roll damage [nmber infections]d6
        
***/

let t = canvas.tokens.get(args[1]);
t.actor.unsetFlag('world', 'rotGrubs',);
console.log("FART: ", t.actor.data.flags.world);