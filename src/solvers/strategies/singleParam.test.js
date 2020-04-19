import { assert } from "chai";
import {
    getRow,
    getColumn,
    getBox,
    formatGrid,
    toGridArray
} from "../cellPath";
import solveSingleParam from "./singleParam";

describe("2. Solve Single Param", function() {
    const rowCheckGrid = "000000000260000531000004000000016289700000000000000000000000000147023000000000008";
    const rowCheckArray = formatGrid(toGridArray(rowCheckGrid));
    const columnCheckGrid = "000000000000000000009300400000030020040000030050000000900025004000000003000060000";
    const columnCheckArray = formatGrid(toGridArray(columnCheckGrid));
    const boxCheckGrid = "104056000078000000003020900000800103000000657000004000090000000000000000000000000";
    const boxCheckArray = formatGrid(toGridArray(boxCheckGrid));

    const gridString1 = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
    const gridArray1 = toGridArray(gridString1);

    it("valid solution for answer option only in single cell of row", function() {
        const solution1 = solveSingleParam(rowCheckArray, getRow(30))[0];
        assert.equal(solution1.strategy, "singleParam-Row");
        assert.equal(solution1.cellInit, 30);
        assert.equal(solution1.updates[0].index, 30);
        assert.sameOrderedMembers(solution1.updates[0].updatedAnswer, [7]);
        assert.equal(solution1.narrow.length, 0);
        assert.equal(solution1.solved[0].index, 30);
        assert.sameOrderedMembers(solution1.solved[0].updatedAnswer, [7]);

        const solution2 = solveSingleParam(rowCheckArray, getRow(11))[0];
        assert.equal(solution2.strategy, "singleParam-Row");
        assert.equal(solution2.cellInit, 11);
        assert.equal(solution2.updates[0].index, 11);
        assert.sameOrderedMembers(solution2.updates[0].updatedAnswer, [4]);
        assert.equal(solution2.narrow.length, 0);
        assert.equal(solution2.solved[0].index, 11);
        assert.sameOrderedMembers(solution2.solved[0].updatedAnswer, [4]);

        const solution3 = solveSingleParam(rowCheckArray, getRow(66))[0];
        assert.equal(solution3.strategy, "singleParam-Row");
        assert.equal(solution3.cellInit, 66);
        assert.equal(solution3.updates[0].index, 66);
        assert.sameOrderedMembers(solution3.updates[0].updatedAnswer, [8]);
        assert.equal(solution3.narrow.length, 0);
        assert.equal(solution3.solved[0].index, 66);
        assert.sameOrderedMembers(solution3.solved[0].updatedAnswer, [8]);
    });
    it("valid solution for answer option only in single cell of column", function() {
        const solution1 = solveSingleParam(columnCheckArray, getColumn(28))[0];
        assert.equal(solution1.strategy, "singleParam-Column");
        assert.equal(solution1.cellInit, 28);
        assert.equal(solution1.updates[0].index, 28);
        assert.sameOrderedMembers(solution1.updates[0].updatedAnswer, [9]);
        assert.equal(solution1.narrow.length, 0);
        assert.equal(solution1.solved[0].index, 28);
        assert.sameOrderedMembers(solution1.solved[0].updatedAnswer, [9]);
        
        const solution2 = solveSingleParam(columnCheckArray, getColumn(52))[0];
        assert.equal(solution2.strategy, "singleParam-Column");
        assert.equal(solution2.cellInit, 52);
        assert.equal(solution2.updates[0].index, 52);
        assert.sameOrderedMembers(solution2.updates[0].updatedAnswer, [4]);
        assert.equal(solution2.narrow.length, 0);
        assert.equal(solution2.solved[0].index, 52);
        assert.sameOrderedMembers(solution2.solved[0].updatedAnswer, [4]);
        
        const solution3 = solveSingleParam(columnCheckArray, getColumn(77))[0];
        assert.equal(solution3.strategy, "singleParam-Column");
        assert.equal(solution3.cellInit, 77);
        assert.equal(solution3.updates[0].index, 77);
        assert.sameOrderedMembers(solution3.updates[0].updatedAnswer, [3]);
        assert.equal(solution3.narrow.length, 0);
        assert.equal(solution3.solved[0].index, 77);
        assert.sameOrderedMembers(solution3.solved[0].updatedAnswer, [3]);
    });
    it("valid solution for answer option only in single cell of box", function() {
        const solution1 = solveSingleParam(boxCheckArray, getBox(9))[0];
        assert.equal(solution1.strategy, "singleParam-Box");
        assert.equal(solution1.cellInit, 9);
        assert.equal(solution1.updates[0].index, 9);
        assert.sameOrderedMembers(solution1.updates[0].updatedAnswer, [9]);
        assert.equal(solution1.narrow.length, 0);
        assert.equal(solution1.solved[0].index, 9);
        assert.sameOrderedMembers(solution1.solved[0].updatedAnswer, [9]);
        
        const solution2 = solveSingleParam(boxCheckArray, getBox(23))[0];
        assert.equal(solution2.strategy, "singleParam-Box");
        assert.equal(solution2.cellInit, 23);
        assert.equal(solution2.updates[0].index, 23);
        assert.sameOrderedMembers(solution2.updates[0].updatedAnswer, [8]);
        assert.equal(solution2.narrow.length, 0);
        assert.equal(solution2.solved[0].index, 23);
        assert.sameOrderedMembers(solution2.solved[0].updatedAnswer, [8]);
        
        const solution3 = solveSingleParam(boxCheckArray, getBox(34))[0];
        assert.equal(solution3.strategy, "singleParam-Box");
        assert.equal(solution3.cellInit, 34);
        assert.equal(solution3.updates[0].index, 34);
        assert.sameOrderedMembers(solution3.updates[0].updatedAnswer, [4]);
        assert.equal(solution3.narrow.length, 0);
        assert.equal(solution3.solved[0].index, 34);
        assert.sameOrderedMembers(solution3.solved[0].updatedAnswer, [4]);
    });
    it("valid rejection when answer option not limited to one cell in param", function() {
        assert.equal(solveSingleParam(formatGrid(gridArray1), getColumn(3)), false);
        assert.equal(solveSingleParam(formatGrid(gridArray1), getRow(72)), false);
        assert.equal(solveSingleParam(formatGrid(gridArray1), getBox(0)), false);
});
});