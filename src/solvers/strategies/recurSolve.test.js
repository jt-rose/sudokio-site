import { assert } from "chai";
import {
    toGridArray,
    formatGrid
} from "../cellPath";
import solveTraditional from "./recurSolve";

const gridString1 = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
const gridArray1 = toGridArray(gridString1);
const formattedGrid = formatGrid(gridArray1);
const gridString1Answer = "534678912672195348198342567859761423426853791713924856961537284287419635345286179";
const gridArray1Answer = toGridArray(gridString1Answer);
const invalid = "990000000002000000003000000004000000005000000006000000007000000008000000001000000";
const invalidGrid = toGridArray(invalid);
const formattedInvalid = formatGrid(invalidGrid);

describe("Test traditional CS method - recursive backtracking", function() {
    it("correct answer", function() {
        const solved = solveTraditional(formattedGrid);
        assert.sameOrderedMembers(solved, gridArray1Answer);
    });
    it("correct rejection", function() {
        assert.equal(solveTraditional(formattedInvalid), false);
    });
});