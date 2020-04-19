import { assert } from "chai";
import {
    getRow,
    formatGrid,
    toGridArray
} from "../cellPath";
import { filterBest } from "../solutionObject";
import {
    solveNakedPair,
    solveNakedTriple,
    solveNakedQuad
} from "./nakedPairings";

describe("Solve Naked Pairings", function() {

    const invalid = "990000000002000000003000000004000000005000000006000000007000000008000000001000000";
    const invalidGrid = toGridArray(invalid);
    
    describe("Solve Naked Pairs", function() {
        it("correct solution for single pair", function() {
            const singlePairGrid = formatGrid(toGridArray("000000000000000000000450000000540000000000000000000000123000089000000000000000000"));
            const solution = solveNakedPair(singlePairGrid, getRow(54))[0];

            assert.equal(solution.strategy, "nakedPair");
            assert.sameOrderedMembers(solution.cellInit, [57,58]);
            assert.sameOrderedMembers(solution.removal, [6,7]);

            assert.equal(solution.updates[0].index, 59);
            assert.sameOrderedMembers(solution.updates[0].removal, [6,7]);
            assert.sameOrderedMembers(solution.updates[0].currentAnswer, [4,5,6,7]);
            assert.sameOrderedMembers(solution.updates[0].updatedAnswer, [4,5]);

            assert.equal(solution.updates[1].index, 60);
            assert.sameOrderedMembers(solution.updates[1].removal, [6,7]);
            assert.sameOrderedMembers(solution.updates[1].currentAnswer, [4,5,6,7]);
            assert.sameOrderedMembers(solution.updates[1].updatedAnswer, [4,5]);
            
        });
        it("correct solution for multiple pairs", function() {
            const multiPairGrid = formatGrid(toGridArray("000001600000009000000450900000540100000000000000000000023000080000000700000067000"));
            const solutionList = solveNakedPair(multiPairGrid, getRow(54));
            const SL1 = solutionList[0];
            const SL2 = solutionList[1];

            assert.equal(solutionList.length, 2);

            assert.equal(SL1.strategy, "nakedPair");
            assert.sameOrderedMembers(SL1.cellInit, [57,58]);
            assert.sameOrderedMembers(SL1.removal, [1,9]);

            assert.equal(SL1.updates[0].index, 54);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,4,5,6,7,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [4,5,6,7]);

            assert.equal(SL1.updates[1].index, 62);
            assert.sameOrderedMembers(SL1.updates[1].removal, [1,9]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [1,4,5,6,9]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [4,5,6]);

            assert.equal(SL2.strategy, "nakedPair");
            assert.sameOrderedMembers(SL2.cellInit, [59,60]);
            assert.sameOrderedMembers(SL2.removal, [4,5]);

            assert.equal(SL2.updates[0].index, 54);
            assert.sameOrderedMembers(SL2.updates[0].removal, [4,5]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [1,4,5,6,7,9]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [1,6,7,9]);

            assert.equal(SL2.updates[1].index, 62);
            assert.sameOrderedMembers(SL2.updates[1].removal, [4,5]);
            assert.sameOrderedMembers(SL2.updates[1].currentAnswer, [1,4,5,6,9]);
            assert.sameOrderedMembers(SL2.updates[1].updatedAnswer, [1,6,9]);

            const bestSolution = filterBest(solutionList);
            assert.equal(bestSolution.updates[0].index, 54);
            assert.sameOrderedMembers(bestSolution.updates[0].removal, [1,9]);
            assert.sameOrderedMembers(bestSolution.updates[0].currentAnswer, [1,4,5,6,7,9]);
            assert.sameOrderedMembers(bestSolution.updates[0].updatedAnswer, [4,5,6,7]);

            assert.equal(bestSolution.updates[1].index, 62);
            assert.sameOrderedMembers(bestSolution.updates[1].removal, [1,9]);
            assert.sameOrderedMembers(bestSolution.updates[1].currentAnswer, [1,4,5,6,9]);
            assert.sameOrderedMembers(bestSolution.updates[1].updatedAnswer, [4,5,6]);
        });
        it("correct rejection when none found", function() {
            const reject = solveNakedPair(invalidGrid, getRow(0));
            assert.equal(reject, false);
        });
    });
    describe("Solve Naked Triples", function() {
        it("correct solution for single Triple", function() {
            const singleTripleGrid = formatGrid(toGridArray("000000000456000789123000456000000000000000000000000000000000000000000000000000123"));
            const solution = solveNakedTriple(singleTripleGrid, getRow(0))[0];

            assert.equal(solution.strategy, "nakedTriple");
            assert.sameOrderedMembers(solution.cellInit, [0,1,2]);
            assert.sameOrderedMembers(solution.removal, [7,8,9]);

            assert.equal(solution.updates[0].index, 3);
            assert.sameOrderedMembers(solution.updates[0].removal, [7,8,9]);
            assert.sameOrderedMembers(solution.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(solution.updates[0].updatedAnswer, [1,2,3,4,5,6]);

            assert.equal(solution.updates[1].index, 4);
            assert.sameOrderedMembers(solution.updates[1].removal, [7,8,9]);
            assert.sameOrderedMembers(solution.updates[1].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(solution.updates[1].updatedAnswer, [1,2,3,4,5,6]);

            assert.equal(solution.updates[2].index, 5);
            assert.sameOrderedMembers(solution.updates[2].removal, [7,8,9]);
            assert.sameOrderedMembers(solution.updates[2].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(solution.updates[2].updatedAnswer, [1,2,3,4,5,6]);
        });
        it("correct solution for multiple Triples", function() {
            const multiTripleGrid = formatGrid(toGridArray("000000000456000789123000456000000000000000000000000000000000000000000000000009000"));
            const solutionList = solveNakedTriple(multiTripleGrid, getRow(0));
            assert.equal(solutionList.length, 2);
            const SL1 = solutionList[0];
            const SL2 = solutionList[1];


            assert.equal(SL1.strategy, "nakedTriple");
            assert.sameOrderedMembers(SL1.cellInit, [0,1,2]);
            assert.sameOrderedMembers(SL1.removal, [7,8,9]);

            assert.equal(SL1.updates[0].index, 3);
            assert.sameOrderedMembers(SL1.updates[0].removal, [7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [1,2,3,4,5,6]);

            assert.equal(SL1.updates[1].index, 4);
            assert.sameOrderedMembers(SL1.updates[1].removal, [7,8,9]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [1,2,3,4,5,6]);

            assert.equal(SL1.updates[2].index, 5);
            assert.sameOrderedMembers(SL1.updates[2].removal, [7,8,9]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [1,2,3,4,5,6]);


            assert.equal(SL2.strategy, "nakedTriple");
            assert.sameOrderedMembers(SL2.cellInit, [6,7,8]);
            assert.sameOrderedMembers(SL2.removal, [1,2,3]);

            assert.equal(SL2.updates[0].index, 3);
            assert.sameOrderedMembers(SL2.updates[0].removal, [1,2,3]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [4,5,6,7,8,9]);

            assert.equal(SL2.updates[1].index, 4);
            assert.sameOrderedMembers(SL2.updates[1].removal, [1,2,3]);
            assert.sameOrderedMembers(SL2.updates[1].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[1].updatedAnswer, [4,5,6,7,8,9]);

            assert.equal(SL2.updates[2].index, 5);
            assert.sameOrderedMembers(SL2.updates[2].removal, [1,2,3]);
            assert.sameOrderedMembers(SL2.updates[2].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL2.updates[2].updatedAnswer, [4,5,6,7,8]);

            assert.deepEqual(filterBest(solutionList), solutionList[1]);
        });
        it("correct rejection when none found", function() {
            const reject = solveNakedTriple(invalidGrid, getRow(0));
            assert.equal(reject, false);
        });
    });
    describe("Solve Naked Quads", function() {
        it("correct solution for single Quad", function() {
            const quadSingleGrid = formatGrid(toGridArray("103056000000000000000700000000000000000000000000000700000000000000000070070000000"));
            const solution = solveNakedQuad(quadSingleGrid, getRow(0))[0];

            assert.equal(solution.strategy, "nakedQuad");
            assert.sameOrderedMembers(solution.cellInit, [1,3,6,7]);
            assert.equal(solution.updates[0].index, 8);
            assert.sameOrderedMembers(solution.removal, [2,4,8,9]);
            assert.sameOrderedMembers(solution.updates[0].removal, [2,4,8,9]);
            assert.sameOrderedMembers(solution.updates[0].currentAnswer, [2,4,7,8,9]);
            assert.sameOrderedMembers(solution.updates[0].updatedAnswer, [7]);
        });
        it("correct solution for multiple Quads", function() {
            const quadMultiGrid = formatGrid(toGridArray("000209000000608000000090600000105000000306000000407060000000000406000705123000689"));
            const solutionList = solveNakedQuad(quadMultiGrid, getRow(54));
            const SL1 = solutionList[0];
            const SL2 = solutionList[1];

            assert.equal(solutionList.length, 2);

            assert.equal(SL1.strategy, "nakedQuad");
            assert.sameOrderedMembers(SL1.cellInit, [54,55,56,57]);
            assert.equal(SL1.updates[0].index, 58);
            assert.sameOrderedMembers(SL1.removal, [5,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].removal, [5,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [1,2,3,4,6]);

            assert.equal(SL2.strategy, "nakedQuad");
            assert.sameOrderedMembers(SL2.cellInit, [59,60,61,62]);
            assert.equal(SL2.updates[0].index, 58);
            assert.sameOrderedMembers(SL2.removal, [1,2,3,4]);
            assert.sameOrderedMembers(SL2.updates[0].removal, [1,2,3,4]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [5,6,7,8]);

            const bestSolution = filterBest(solutionList);
            assert.equal(bestSolution.strategy, "nakedQuad");
            assert.sameOrderedMembers(bestSolution.cellInit, [59,60,61,62]);
            assert.equal(bestSolution.updates[0].index, 58);
            assert.sameOrderedMembers(bestSolution.removal, [1,2,3,4]);
            assert.sameOrderedMembers(bestSolution.updates[0].removal, [1,2,3,4]);
            assert.sameOrderedMembers(bestSolution.updates[0].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(bestSolution.updates[0].updatedAnswer, [5,6,7,8]);

        });
        it("correct rejection when none found", function() {
            const reject = solveNakedQuad(invalidGrid, getRow(0));
            assert.equal(reject, false);
        });
    });
    describe("Solve Naked Cascading Triples", function() {
        it("correct single solution", function() {
            const singleAnswerGrid = formatGrid(toGridArray("000000000759000000684000000312000000000000000000000000000000000000000000000000009"));
            const solution = solveNakedTriple(singleAnswerGrid, getRow(0));
            const SL1 = solution[0];
            assert.equal(solution.length, 1);
            
            assert.equal(SL1.strategy, "cascadingTriple");
            assert.sameOrderedMembers(SL1.cellInit, [0,1,2]);
            assert.sameOrderedMembers(SL1.removal, [1,2,3]);
            assert.equal(SL1.updates.length, 6);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 6);

            assert.equal(SL1.updates[0].index, 3);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,3]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [4,5,6,7,8,9]);

            assert.equal(SL1.updates[5].index, 8);
            assert.sameOrderedMembers(SL1.updates[5].removal, [1,2,3]);
            assert.sameOrderedMembers(SL1.updates[5].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL1.updates[5].updatedAnswer, [4,5,6,7,8]);
        });
        it("correct multiple solutions", function() {
            const multiAnswerGrid = formatGrid(toGridArray("000000000759000461684000532312000000000000000000000000000009008000000070000000900"));
            const solutionList = solveNakedTriple(multiAnswerGrid, getRow(0));
            const SL1 = solutionList[0];
            const SL2 = solutionList[1];
            assert.equal(solutionList.length, 2);


            assert.equal(SL1.strategy, "cascadingTriple");
            assert.sameOrderedMembers(SL1.cellInit, [0,1,2]);
            assert.sameOrderedMembers(SL1.removal, [1,2,3]);
            assert.equal(SL1.updates.length, 3);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 3);

            assert.equal(SL1.updates[0].index, 3);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,3]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [4,5,6,7,8,9]);

            assert.equal(SL1.updates[2].index, 5);
            assert.sameOrderedMembers(SL1.updates[2].removal, [1,2,3]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [4,5,6,7,8]);


            assert.equal(SL2.strategy, "cascadingTriple");
            assert.sameOrderedMembers(SL2.cellInit, [6,7,8]);
            assert.sameOrderedMembers(SL2.removal, [7,8,9]);
            assert.equal(SL2.updates.length, 3);
            assert.equal(SL2.solved.length, 0);
            assert.equal(SL2.narrow.length, 3);

            assert.equal(SL2.updates[0].index, 3);
            assert.sameOrderedMembers(SL2.updates[0].removal, [7,8,9]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [1,2,3,4,5,6]);

            assert.equal(SL2.updates[2].index, 5);
            assert.sameOrderedMembers(SL2.updates[2].removal, [7,8,9]);
            assert.sameOrderedMembers(SL2.updates[2].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL2.updates[2].updatedAnswer, [1,2,3,4,5,6]);
        });
        it("correct rejection", function() {
            const reject = solveNakedTriple(invalidGrid, getRow(0));
            assert.equal(reject, false);
        });
    });
    describe("Solve Naked Cascading Quads", function() {
        it("correct single solution", function() {
            const singleAnswerGrid = formatGrid(toGridArray("000000000759000000684000000312500000000100000000900000000709000000800000000600000"));
            const solution = solveNakedQuad(singleAnswerGrid, getRow(0));
            const SL1 = solution[0];
            assert.equal(solution.length, 1);
            
            assert.equal(SL1.strategy, "cascadingQuad");
            assert.sameOrderedMembers(SL1.cellInit, [0,1,2,3]);
            assert.sameOrderedMembers(SL1.removal, [1,2,3,4]);
            assert.equal(SL1.updates.length, 5);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 5);

            assert.equal(SL1.updates[0].index, 4);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,3,4]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [5,6,7,8,9]);

            assert.equal(SL1.updates[1].index, 5);
            assert.sameOrderedMembers(SL1.updates[1].removal, [1,2,3,4]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [1,2,3,4,5,6,7,8]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [5,6,7,8]);
        });
        it("correct multiple solutions", function() {
            const multiAnswerGrid = formatGrid(toGridArray("000000000759000412684000953312506080000103000000902000000701000000804000000605000"));
            const solutionList = solveNakedQuad(multiAnswerGrid, getRow(0));
            const SL1 = solutionList[0];
            const SL2 = solutionList[1];
            assert.equal(solutionList.length, 2);


            assert.equal(SL1.strategy, "cascadingQuad");
            assert.sameOrderedMembers(SL1.cellInit, [0,1,2,3]);
            assert.sameOrderedMembers(SL1.removal, [1,2,3,4]);
            assert.equal(SL1.updates.length, 1);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 1);

            assert.equal(SL1.updates[0].index, 4);
            assert.sameOrderedMembers(SL1.updates[0].removal, [1,2,3,4]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [5,6,7,8,9]);


            assert.equal(SL2.strategy, "cascadingQuad");
            assert.sameOrderedMembers(SL2.cellInit, [5,6,7,8]);
            assert.sameOrderedMembers(SL2.removal, [6,7,8,9]);
            assert.equal(SL2.updates.length, 1);
            assert.equal(SL2.solved.length, 0);
            assert.equal(SL2.narrow.length, 1);

            assert.equal(SL2.updates[0].index, 4);
            assert.sameOrderedMembers(SL2.updates[0].removal, [6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [1,2,3,4,5,6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [1,2,3,4,5]);
        });
        it("correct rejection", function() {
            const reject = solveNakedQuad(invalidGrid, getRow(0));
            assert.equal(reject, false);
        });
    })
});