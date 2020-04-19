import { assert } from "chai";
import * as R from "ramda";
import {
    formatGrid,
    toGridArray
} from "../cellPath";
import solveSingleOption from "./singleOption";

describe("1. Solve Single Option", function() {
    const gridString2 = "123450789400000203500000146600000000700000000200030000300070000000090000900080000";
    const gridArray2 = formatGrid(toGridArray(gridString2));
    it("valid solution for single parameter - row", function() {

        const solution = solveSingleOption(gridArray2, 5);
        assert.sameOrderedMembers(gridArray2[5], [6]);
        assert.equal(solution.solved[0].index, 5);
        assert.sameOrderedMembers(solution.solved[0].updatedAnswer, [6]);
        assert.equal(solution.strategy, "singleOption-Row");
    });
    it("valid solution for single parameter - column", function() {
        const solution = solveSingleOption(gridArray2, 63);
        assert.sameOrderedMembers(gridArray2[63], [8]);
        assert.equal(solution.solved[0].index, 63);
        assert.sameOrderedMembers(solution.solved[0].updatedAnswer, [8]);
        assert.equal(solution.strategy, "singleOption-Column");
    });
    it("valid solution for single parameter - box", function() {
        const solution = solveSingleOption(gridArray2, 16);
        assert.sameOrderedMembers(gridArray2[16], [5]);
        assert.equal(solution.solved[0].index, 16);
        assert.sameOrderedMembers(solution.solved[0].updatedAnswer, [5]);
        assert.equal(solution.strategy, "singleOption-Box");
    });
    it("valid solution for multiple parameters", function() {
        const solution = solveSingleOption(gridArray2, 22);
        assert.sameOrderedMembers(gridArray2[22], [2]);
        assert.equal(solution.solved[0].index, 22);
        assert.sameOrderedMembers(solution.solved[0].updatedAnswer, [2]);
        assert.equal(solution.strategy, "singleOption-MultiParam");
    });
    it("valid solution for multiple parameters assisted by advanced strategy narrowing", function() {
        const gridArray3 = R.update(80, [1], gridArray2);
        //const gridArray3 = gridArray2.map((x, index) => index === 80 ? [1] : x);
        
        const solution = solveSingleOption(gridArray3, 80);
        assert.equal(solution.solved[0].index, 80);
        assert.sameOrderedMembers(solution.solved[0].updatedAnswer, [1]);
        assert.equal(solution.strategy, "singleOption-Narrowing");
    });
    it("valid rejections for cells already solved/ not solvable", function() {
        assert.equal(solveSingleOption(gridArray2, 0), false);
        assert.equal(solveSingleOption(gridArray2, 75), false);

    });
});