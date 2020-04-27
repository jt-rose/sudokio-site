import { assert } from "chai";
import {
    toGridArray,
    toGridString,
    formatGrid
} from "./cellPath"
import {
    applyStrats,
    limitStratsTo,
    applyStratsUntilDone,
    isComplete,
    correctSoFar,
    completeAndCorrect
} from "./applyStrats";

const gridString1 = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
const gridArray1 = formatGrid(toGridArray(gridString1));
const gridString1Answer = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
const gridArray1Answer = toGridArray(gridString1Answer);
const invalid = "990000000002000000003000000004000000005000000006000000007000000008000000001000000";
const invalidGrid = toGridArray(invalid);

describe("Apply singleParam-focused solution to multiple params", function() {
    it("valid multiple returns", function() {
        const multiGrid = formatGrid(toGridArray(gridString1));
        const solutionList = applyStrats(limitStratsTo("solveSingleOption"))(multiGrid);
        assert.equal(solutionList.length, 4);

        const cellsFound = solutionList.map(x => x.cellInit);
        assert.sameMembers(cellsFound, [40,59,62,70])
    });
});
describe("Check that sudokuGrid is complete and correct", function() {
    it("complete", function() {
        assert.equal(isComplete(formatGrid(gridArray1Answer)), true);
        assert.equal(isComplete(formatGrid(gridArray1)), false);
        assert.equal(isComplete(invalidGrid), false);
    });
    it("correct", function() {
        assert.equal(correctSoFar(formatGrid(gridArray1Answer)), true);
        assert.equal(correctSoFar(formatGrid(gridArray1)), true);
        assert.equal(correctSoFar(invalidGrid), false);

        const incorrectGrid = formatGrid(toGridArray("550070000600195000098000060800060003400803001700020006060000280000419005000080079"));
        assert.equal(correctSoFar(incorrectGrid), false);
    });
    it("complete and correct", function() {
        assert.equal(completeAndCorrect(formatGrid(gridArray1Answer)), true);
        assert.equal(completeAndCorrect(formatGrid(gridArray1)), false);
        assert.equal(completeAndCorrect(invalidGrid), false);

        const incorrectGrid = formatGrid(toGridArray("550070000600195000098000060800060003400803001700020006060000280000419005000080079"));
        assert.equal(completeAndCorrect(incorrectGrid), false);
    });
});
describe("Apply series of strategies to grid", function() {
    it("correctly find first solution in list", function() {
        const stratCycle = applyStrats();

        assert.equal(stratCycle(invalidGrid), false);

        const singleOptionFound = stratCycle(formatGrid(toGridArray(gridString1)));
        assert.equal(singleOptionFound.length, 4);
        assert.equal(singleOptionFound[0].strategy, "singleOption-MultiParam");
        assert.sameMembers(singleOptionFound.flatMap(x => x.cellInit), [40,59,62,70]);

        const rowCheckGrid = "000000000260000531000004000000016289700000000000000000000000000147023000000000008";
        const rowCheckArray = formatGrid(toGridArray(rowCheckGrid));
        const singleParamFound = stratCycle(formatGrid(rowCheckArray));
        assert.equal(singleParamFound.length, 3);
        assert.equal(singleParamFound[0].strategy, "singleParam-Row");
        assert.equal(singleParamFound[0].cellInit, 11);

        const boxNarrowGrid = formatGrid(toGridArray("504670000672105000198042507850760400406850090013004800060000000087009000000000000"));
        const boxNarrowFound = stratCycle(boxNarrowGrid);
        // singleOption found first, recommended before boxNarrow
        assert.equal(boxNarrowFound.length, 4);
        assert.equal(boxNarrowFound[0].strategy, "singleOption-Box");
        assert.sameMembers(boxNarrowFound.flatMap(x => x.cellInit), [1,21,29,37]);


        const swordfishGrid = formatGrid(toGridArray("529410703006003002003200000052300076637050200190627530300069420200830600960742305"));
        const upToSingleParam = applyStrats(limitStratsTo("solveSingleParam"));
        const boxNarrowNotFound = upToSingleParam(swordfishGrid);
        assert.equal(boxNarrowNotFound, false);
        const answerFound = stratCycle(swordfishGrid);
        assert.equal(answerFound.length, 2);
        assert.equal(answerFound[0].strategy, "boxNarrow");
    });

    it("continuously apply found solutions until none left", function() {
        // test basic puzzle
        const stratCycle = applyStratsUntilDone();
        const stratResult = stratCycle(formatGrid(toGridArray(gridString1)));
        assert.equal(toGridString(stratResult.updatedGrid), gridString1Answer);
        assert.equal(stratResult.solutions.length, 51);
        assert.equal(stratResult.solutions[50].round, 14);

        const onlySO = stratResult.solutions
        .filter(x => x.strategy.match("singleOption"));
        assert.equal(onlySO.length, 51);

        const stratsFound = [...new Set(onlySO.map(x => x.strategy))];
        assert.equal(stratsFound.length, 4);
        
        // test puzzle containing xWing
        const xWingGrid = formatGrid(toGridArray("000400602006000100090500080050300000301206405000007020030002060004000900507009000"));
        const xWingResult = stratCycle(xWingGrid);
        const xWingAnswer = "715498632486723159293561784952314876371286495648957321139842567824675913567139248";
        assert.equal(toGridString(xWingResult.updatedGrid), xWingAnswer);
        assert.isTrue(xWingResult.solutions.map(x => x.strategy).includes("X-Wing"));

        // test puzzle with swordfish strategy, not complete
        const swordfishGrid = formatGrid(toGridArray("050749080089003000600001390040007060000400809000002000060004010500210047010005030"));
        const swordfishResult = stratCycle(swordfishGrid);
        assert.isTrue(swordfishResult.solutions.map(x => x.strategy).includes("Swordfish"));
        assert.equal(isComplete(swordfishResult.updatedGrid), false);
    });
})