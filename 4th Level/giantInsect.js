//Change TableNameHere 
let tableNamesBeasts = game.tables.entities.find(t => t.name === "Giant Insect");
let rollNamesBeasts = tableNamesBeasts.roll().results[0].text;


async function quickDialog({ data, title = `Quick Dialog` } = {}) {
    data = data instanceof Array ? data : [data];

    return await new Promise((resolve) => {
        let content = `
    <table style="width:100%">
      ${data.map(({ type, label, options }, i) => {
            if (type.toLowerCase() === `select`) {
                return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><select id="${i}qd">${options.map((e, i) => `<option value="${e}">${e}</option>`).join(``)}</td></tr>`;
            } else if (type.toLowerCase() === `checkbox`) {
                return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" ${options || ``}/></td></tr>`;
            } else {
                return `<tr><th style="width:50%"><label>${label}</label></th><td style="width:50%"><input type="${type}" id="${i}qd" value="${options instanceof Array ? options[0] : options}"/></td></tr>`;
            }
        }).join(``)}
    </table>`;

        new Dialog({
            title, content,
            buttons: {
                Ok: {
                    label: `Ok`, callback: (html) => {
                        resolve(Array(data.length).fill().map((e, i) => {
                            let { type } = data[i];
                            if (type.toLowerCase() === `select`) {
                                return html.find(`select#${i}qd`).val();
                            } else {
                                switch (type.toLowerCase()) {
                                    case `text`:
                                    case `password`:
                                    case `radio`:
                                        return html.find(`input#${i}qd`)[0].value;
                                    case `checkbox`:
                                        return html.find(`input#${i}qd`)[0].checked;
                                    case `number`:
                                        return html.find(`input#${i}qd`)[0].valueAsNumber;
                                }
                            }
                        }));
                    }
                }
            }
        }).render(true);
    });
}

function getMousePosition() {
    const mouse = canvas.app.renderer.plugins.interaction.mouse;
    return mouse.getLocalPosition(canvas.app.stage);
}

function getCenterGrid(point = {}) {
    const arr = canvas.grid.getCenter(point.x, point.y);
    return { x: arr[0], y: arr[1] };
}

/*
  Capture Click
 */
let gNumSpawned = 0;
let gNeedSpawn = 0;
let gCurrentActor;
async function handleClick(event) {
    if (gNumSpawned < gNeedSpawn) {
        await spawnActor(gCurrentActor);
        gNumSpawned++
    }

    if (gNumSpawned >= gNeedSpawn) {
        $(document.body).off("click");
    }

}

function captureClick() {
    $(document.body).on("click", handleClick);
}

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function sleepWhilePlacing() {
    while (gNumSpawned < gNeedSpawn) {
        await wait(100);
    }
}

//global current token to spawn

async function spawnActor(actorName) {
    const scene = game.scenes.get(game.user.viewedScene);
    let protoToken = duplicate(game.actors.getName(actorName).data.token);

    let location = getCenterGrid(getMousePosition());

    protoToken.x = location.x;
    protoToken.y = location.y;

    // Increase this offset for larger summons
    protoToken.x -= (scene.data.grid / 2 + (protoToken.width - 1) * scene.data.grid);
    protoToken.y -= (scene.data.grid / 2 + (protoToken.height - 1) * scene.data.grid);

    return canvas.tokens.createMany(protoToken, {});
}

(async () => {
    let attackdata = [
        { type: `select`, label: `<option value="${rollNamesBeasts}">${rollNamesBeasts}</option>`, options: [1, 2, 3, 4, 5] },
    ];

    const [summonNum] = await quickDialog({ data: attackdata, title: `Summon Configuration` });
    await wait(500);

    gCurrentActor = rollNamesBeasts;
    gNumSpawned = 0;
    gNeedSpawn = parseInt(summonNum);
    captureClick();

    await sleepWhilePlacing();



    ui.notifications.info("Done!");



})();