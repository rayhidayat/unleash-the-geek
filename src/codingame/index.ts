import * as angles from '../util/angles';
import * as agent from '../agent';
import * as model from '../model';
import * as w from '../model/world';
import { Vec } from '../util/vector';

function readInitial(): w.World {
    const inputs = readline().split(' ');
    const width = parseInt(inputs[0]);
    const height = parseInt(inputs[1]); // size of the map
    return model.initialWorld(width, height);
}

function readNext(world: w.World) {
    {
        const inputs = readline().split(' ');
        world.teams[0].score = parseInt(inputs[0]); // Amount of ore delivered
        world.teams[1].score = parseInt(inputs[1]);
    }

    for (let i = 0; i < world.height; i++) {
        const inputs = readline().split(' ');
        for (let j = 0; j < world.width; j++) {
            const cell = world.map[i][j];

            const ore = inputs[2*j];// amount of ore or "?" if unknown
            const hole = parseInt(inputs[2*j+1]);// 1 if cell has a hole

            if (ore !== '?') {
                cell.seen = world.tick;
                cell.ore = parseInt(ore);
            }

            cell.hole = hole === 1;
        }
    }

    let entityCount: number;
    {
        const inputs = readline().split(' ');
        entityCount = parseInt(inputs[0]); // number of entities visible to you
        world.teams[0].radarCooldown = parseInt(inputs[1]); // turns left until a new radar can be requested
        world.teams[0].trapCooldown = parseInt(inputs[2]); // turns left until a new trap can be requested
    }

    const entities = new Array<w.Entity>();
    for (let i = 0; i < entityCount; i++) {
        const inputs = readline().split(' ');
        const id = parseInt(inputs[0]); // unique id of the entity
        const type = parseInt(inputs[1]); // 0 for your robot, 1 for other robot, 2 for radar, 3 for trap
        const x = parseInt(inputs[2]);
        const y = parseInt(inputs[3]); // position of the entity
        const carrying = parseInt(inputs[4]); // if this entity is a robot, the item it is carrying (-1 for NONE, 2 for RADAR, 3 for TRAP, 4 for ORE)

        entities.push({
            id,
            type,
            x,
            y,
            carrying,
        });
    }
    world.entities = entities;
}

function formatAction(action: w.Action) {
    let str = formatActionIntent(action);
    if (action.tag) {
        str += " " + action.tag;
    }
    return str;
}

function formatActionIntent(action: w.Action) {
    if (action.type === "wait") {
        return `WAIT`;
    } else {
        return "NULL";
    }
}

// initialisation
let world = readInitial();

// game loop
while (true) {
    readNext(world);

    for (let i = 0; i < 5; i++) {

        // Write an action using console.log()
        // To debug: console.error('Debug messages...');

        const action = agent.choose(world, i);
        console.log(formatAction(action));
    }

    world.tick++;
}