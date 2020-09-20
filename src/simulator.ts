import { Terrain } from './terrain';
import { Mower } from './mower';
import { MowerInstructions } from './mower-instructions';
import { Instruction } from './instruction';
import { Orientation } from './orientation';

enum TurnDirection {
    Left = -1,
    Right = 1
}

export class Simulator {

    constructor(
        private _terrain: Terrain,
        private _mowers: Mower[]
    ) {
    }

    run(mowerInstructions: MowerInstructions[]): void {
        const steps = Math.max(...mowerInstructions.map(m => m.instructions.length));

        for (let i = 0; i < steps; i++) {
            for (const mowerInstruction of mowerInstructions) {
                if (i < mowerInstruction.instructions.length) {
                    this.execute(mowerInstruction.instructions[i], this._mowers[mowerInstruction.mowerIndex]);
                }
            }
        }
    }

    execute(instruction: Instruction, mower: Mower): void {
        switch (instruction) {
            case Instruction.Forward:
                this.moveForward(mower);
                break;
            case Instruction.Left:
                this.turn(mower, TurnDirection.Left);
                break;
            case Instruction.Right:
                this.turn(mower, TurnDirection.Right);
                break;
        }
    }

    moveForward(mower: Mower): void {
        switch (mower.orientation) {
            case Orientation.North:
                if (this.canMoveTo(mower.x, mower.y + 1)) {
                    mower.y++;
                }
                break;
            case Orientation.South:
                if (this.canMoveTo(mower.x, mower.y - 1)) {
                    mower.y--;
                }
                break;
            case Orientation.East:
                if (this.canMoveTo(mower.x + 1, mower.y)) {
                    mower.x++;
                }
                break;
            case Orientation.West:
                if (this.canMoveTo(mower.x - 1, mower.y)) {
                    mower.x--;
                }
                break;
        }
    }

    turn(mower: Mower, turnDirection: TurnDirection): void {
        mower.orientation = ((mower.orientation + turnDirection) + 4) % 4
    }

    canMoveTo(x: number, y: number): boolean {
        return (x >= 0) &&
            (x <= this._terrain.width) &&
            (y >= 0) &&
            (y <= this._terrain.height) &&
            (!this._mowers.some(m => (m.x === x) && (m.y === y)));
    } 
}