//Makes sure only one token is selected
if (canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
    ui.notifications.error("You must select only one token!");
    return;
};
// Remove all active effects from the selected token
let removeList = token?.actor?.effects.map(e=>e.id)
token?.actor?.deleteEmbeddedEntity("ActiveEffect", removeList)