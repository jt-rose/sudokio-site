import { assert } from "chai";
import {
    getRow,
    getColumn,
    getBox,
    getOpen,
    formatGrid,
    toGridArray
} from "../cellPath";
import { applySolution } from "../solutionObject";
import {
    solveHiddenPair,
    solveHiddenTriple,
    solveHiddenQuad
} from "./hiddenPairings";
describe("Solve Hidden Pairings", function() {

    const invalid = "990000000002000000003000000004000000005000000006000000007000000008000000001000000";
    const invalidGrid = toGridArray(invalid);

    describe("Solve Hidden Pairs", function() {
        it("correct single solution", function() {
            const singlePairGrid = formatGrid(toGridArray("164000000250000000370000000000007000000000047000000056000000000806000000945000000"));
            const solution = solveHiddenPair(singlePairGrid, getColumn(0));
            const SL1 = solution[0];
    
            assert.equal(solution.length, 1);
    
            assert.equal(SL1.strategy, "hiddenPair");
            assert.sameOrderedMembers(SL1.cellInit, [27,36]);
            assert.sameOrderedMembers(SL1.removal, [1,2,3,4,7,8,9]);
            assert.equal(SL1.updates.length, 1);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 1);
    
            assert.equal(SL1.updates[0].index, 27);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,3,4,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [4,5,6]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [5,6]);
    
        });
        it("correct rejection", function() {
            const reject = solveHiddenPair(invalidGrid, getRow(0));
            assert.equal(reject, false);
    
            const hiddenTripleGrid = formatGrid(toGridArray("907020030002900800061050729105000670009700000746315982694580017513000068278000095"));
            const rejectTriple = solveHiddenPair(hiddenTripleGrid, getRow(9));
            assert.equal(rejectTriple, false);
    
            const hiddenQuadGrid = formatGrid(toGridArray("048397000060085090090026000702863049984512070036974000409738060820609037673201980"));
            const rejectQuad = solveHiddenPair(hiddenQuadGrid, getBox(15));
            assert.equal(rejectQuad, false);
        });
    });
    describe("Solve Hidden /Cascading Triples", function() {
        it("correct single solution", function() {
            const hiddenTripleGrid = formatGrid(toGridArray("907020030002900800061050729105000670009700000746315982694580017513000068278000095"));
            const solution = solveHiddenTriple(hiddenTripleGrid, getRow(9));
            const SL1 = solution[0];
    
            assert.equal(solution.length, 1);
    
            assert.equal(SL1.strategy, "hiddenCascadingTriple");
            assert.sameOrderedMembers(SL1.cellInit, [13,14,17]);
            assert.sameOrderedMembers(SL1.removal, [2,3,4,5,8,9]);
            assert.equal(SL1.updates.length, 3);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 3);
    
            assert.equal(SL1.updates[0].index, 13);
            assert.sameOrderedMembers(SL1.updates[0].removal, [2,3,4,5,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [3,4,6,7]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [6,7]);
    
            assert.equal(SL1.updates[1].index, 14);
            assert.sameOrderedMembers(SL1.updates[1].removal, [2,3,4,5,8,9]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [1,3,4,6,7]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [1,6,7]);
    
            assert.equal(SL1.updates[2].index, 17);
            assert.sameOrderedMembers(SL1.updates[2].removal, [2,3,4,5,8,9]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [1,4,6]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [1,6]);
    
            const updatedGrid = applySolution(SL1, hiddenTripleGrid);
            const count3s = getOpen(getBox(23),updatedGrid).filter(x => updatedGrid[x].includes(3));
            assert.equal(count3s.length, 1);
        });
        it("correct rejection", function() {
            const reject = solveHiddenTriple(invalidGrid, getRow(0));
            assert.equal(reject, false);
    
            const hiddenQuadGrid = formatGrid(toGridArray("048397000060085090090026000702863049984512070036974000409738060820609037673201980"));
            const rejectQuad = solveHiddenTriple(hiddenQuadGrid, getBox(15));
            assert.equal(rejectQuad, false);
        });
    });
    describe("Solve Hidden /Cascading Quads", function() {
        it("correct single solution", function() {
            const hiddenQuadGrid = formatGrid(toGridArray("048397000060085090090026000702863049984512070036974000409738060820609037673201980"));
            const solution = solveHiddenQuad(hiddenQuadGrid, getBox(15));
            const SL1 = solution[0];
    
            assert.equal(solution.length, 1);
    
            assert.equal(SL1.strategy, "hiddenCascadingQuad");
            assert.sameOrderedMembers(SL1.cellInit, [15,17,24,26]);
            assert.sameOrderedMembers(SL1.removal, [1,2,5,6,9]);
            assert.equal(SL1.updates.length, 4);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 4);
    
            assert.equal(SL1.updates[0].index, 15);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,5,6,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,7]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [3,4,7]);
    
            assert.equal(SL1.updates[1].index, 17);
            assert.sameOrderedMembers(SL1.updates[1].removal, [1,2,5,6,9]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [1,2,3,4]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [3,4]);
    
            assert.equal(SL1.updates[2].index, 24);
            assert.sameOrderedMembers(SL1.updates[2].removal, [1,2,5,6,9]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [1,3,4,5,7,8]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [3,4,7,8]);
    
            assert.equal(SL1.updates[3].index, 26);
            assert.sameOrderedMembers(SL1.updates[3].removal, [1,2,5,6,9]);
            assert.sameOrderedMembers(SL1.updates[3].currentAnswer, [1,3,4,5,8]);
            assert.sameOrderedMembers(SL1.updates[3].updatedAnswer, [3,4,8]);
    
            const updatedGrid = applySolution(SL1, hiddenQuadGrid);
            const count2s = getOpen(getRow(9),updatedGrid).filter(x => updatedGrid[x].includes(2));
            assert.equal(count2s.length, 1);
        });
        it("correct rejection", function() {
            const reject = solveHiddenQuad(invalidGrid, getRow(0));
            assert.equal(reject, false);
    
            const singlePairGrid = formatGrid(toGridArray("164000000250000000370000000000007000000000047000000056000000000806000000945000000"));
            const rejectPair = solveHiddenQuad(singlePairGrid, getColumn(0));
            assert.equal(rejectPair, false);
    
            const hiddenTripleGrid = formatGrid(toGridArray("907020030002900800061050729105000670009700000746315982694580017513000068278000095"));
            const rejectTriple = solveHiddenQuad(hiddenTripleGrid, getRow(9));
            assert.equal(rejectTriple, false);
        });
    });
});
