//This macro plays the animation on selected targets with no trajectory
//It works for animations like Cure Wounds, Healing Ability and Dizzy Stars 
//Import this macro, duplicate it and change its name making sure it's unique by adding the colour (i.e. "Cure Wounds Blue").
//If it has the exact same name as the spell or item you want to trigger it from, you'll encounter an issue.
//folder 01 is the directory path to the assets
let folder01 = "modules/jb2a_patreon/Library/Generic/Magic_Signs/";
//anFile is the name of the file used for the animation
let anFile = `${folder01}Conjuration_01_Yellow_Circle_800x800.webm`;

//another example would be:
//let folder01 = "modules/jb2a_patreon/Library/Generic/Healing/"
//let anFile = `${folder01}HealingAbility_01_Green_200x200.webm`;


if (game.user.targets.size == 0) ui.notifications.error('You must target at least one token');
///Check if Module dependencies are installed or returns an error to the user
if (!canvas.fxmaster) ui.notifications.error("This macro depends on the FXMaster module. Make sure it is installed and enabled");


const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function Cast() {
    var myStringArray = Array.from(game.user.targets)[0];
    var arrayLength = game.user.targets.size;
    for (var i = 0; i < arrayLength; i++) {

        let mainTarget = Array.from(game.user.targets)[i];
        let tarScale = ((mainTarget.data.width + mainTarget.data.height) / 10);


        let spellAnim =
        {
            file: anFile,
            position: mainTarget.center,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            angle: 0,
            scale: {
                x: tarScale,
                y: tarScale
            }
        };
        canvas.fxmaster.playVideo(spellAnim);
        game.socket.emit('module.fxmaster', spellAnim);
        await wait(75);
    }
}
Cast();