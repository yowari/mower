#!/usr/bin/env node

import * as fs from 'fs';

import { Mower } from './mower';
import { Simulator } from './simulator';
import { parse } from './parse';

function main(): void {
    const inputFile = process.argv[2] || 'input.txt';

    const buffer = fs.readFileSync(inputFile);
    const content = buffer.toString('utf-8');

    const context = parse(content);

    const simulator = new Simulator(context.terrain, context.mowers);
    simulator.run(context.mowerInstructions);

    context.mowers.forEach(mower => {
        console.log(encode(mower));
    });
}

function encode(mower: Mower): string {
    const orientationSymbols = ['N', 'E', 'S', 'W'];

    return `${mower.x} ${mower.y} ${orientationSymbols[mower.orientation]}`;
}

main();
