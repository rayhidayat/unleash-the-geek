import Vec from './util/vector';

export const RadarRange = 5;
export const TrapRange = 1;
export const MovementSpeed = 4;

export interface World {
    tick: number;
    numRobots: number;
    width: number;
    height: number;
    teams: Team[];
    map: Cell[][];
    entities: Entity[];
    actions: Action[];
}

export interface Team {
    teamId: number
    score: number;
    radarCooldown: number;
    trapCooldown: number;
}

export interface Cell {
    pos: Vec;
    ore: number | null;
    hole: boolean;
}

export interface Entity {
    id: number;
    type: ItemType;
    pos: Vec;
    carrying?: number;
    dead?: boolean;
}

export enum ItemType {
    None = -1,
    RobotTeam0 = 0,
    RobotTeam1 = 1,
    Radar = 2,
    Trap = 3,
    Ore = 4,
}

export type Action =
    WaitAction
    | MoveAction
    | DigAction
    | RequestAction

export interface ActionBase {
    entityId: number;
    type: string;
    tag?: string;
}

export interface WaitAction extends ActionBase {
    type: "wait";
}

export interface MoveAction extends ActionBase {
    type: "move";
    target: Vec;
}

export interface DigAction extends ActionBase {
    type: "dig";
    target: Vec;
}

export interface RequestAction extends ActionBase {
    type: "request";
    item: ItemType;
}


export function initialWorld(width: number, height: number): World {
    return {
        tick: 0,
        numRobots: 5,
        width,
        height,
        teams: [initialTeam(0), initialTeam(1)],
        map: initialMap(width, height),
        entities: [],
        actions: [],
    };
}

function initialTeam(teamId: number): Team {
    return {
        teamId,
        score: 0,
        radarCooldown: 0,
        trapCooldown: 0,
    };
}

function initialMap(width: number, height: number): Cell[][] {
    const map = new Array<Cell[]>();
    for (let y = 0; y < height; ++y) {
        const row = new Array<Cell>();
        for (let x = 0; x < width; ++x) {
            row.push({
                pos: new Vec(x, y),
                ore: null,
                hole: false,
            });
        }
        map.push(row);
    }
    return map;
}

export function clone(world: World): World {
    return {
        ...world,
        teams: world.teams.map(cloneTeam),
        map: world.map.map(row => row.map(cloneCell)),
        entities: world.entities.map(cloneEntity),
        actions: [...world.actions],
    };
}

function cloneTeam(team: Team): Team {
    return {
        ...team,
    };
}

function cloneCell(cell: Cell): Cell {
    return {
        ...cell,
    };
}

function cloneEntity(entity: Entity): Entity {
    return {
        ...entity,
    };
}