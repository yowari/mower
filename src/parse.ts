import { Instruction } from './instruction';
import { Orientation } from './orientation';
import { Terrain } from './terrain';
import { Mower } from './mower';
import { MowerInstructions } from './mower-instructions';

export interface Context {
    terrain: Terrain;
    mowers: Mower[];
    mowerInstructions: MowerInstructions[];
}

export function parse(content: string): Context {
    const lines = content.split('\n');

    const terrain = parseTerrain(lines[0]);
    const mowers: Mower[] = [];
    const mowerInstructions: MowerInstructions[] = [];

    let mowerIndex = 0;
    let lineIndex = 1;
    while (lineIndex < lines.length) {
        mowers.push(parseMower(lines[lineIndex++]));

        mowerInstructions.push({
            mowerIndex: mowerIndex,
            instructions: parseInstructions(lines[lineIndex++])
        });

        mowerIndex++;
    }

    return {
        terrain,
        mowers,
        mowerInstructions
    }
}

export function parseTerrain(line: string): Terrain {
    const terrainData = line.split(' ');

    return {
        width: parseInt(terrainData[0], 10),
        height: parseInt(terrainData[1], 10),
    };
}

export function parseMower(line: string): Mower {
    const mowerData = line.split(' ');

    return {
        x: parseInt(mowerData[0], 10),
        y: parseInt(mowerData[1], 10),
        orientation: parseOrientation(mowerData[2])
    }
}

export function parseInstructions(line: string): Instruction[] {
    const intructionsData = line.split('');

    return intructionsData.map(instruction => parseInstruction(instruction));
}

export function parseOrientation(orientation: string): Orientation {
    switch (orientation) {
        case 'N':
            return Orientation.North;
        case 'E':
            return Orientation.East;
        case 'S':
            return Orientation.South;
        case 'W':
            return Orientation.West;
        default:
            throw new Error('Cannot parse orientation');
    }
}

export function parseInstruction(instruction: string): Instruction {
    switch (instruction) {
        case 'F':
            return Instruction.Forward;
        case 'L':
            return Instruction.Left;
        case 'R':
            return Instruction.Right;
        default:
            throw new Error('Cannot read instruction');
    }
}