import { assert } from "chai";
import {
    getBox,
    formatGrid,
    toGridArray
} from "../cellPath";
import solveBoxNarrow from "./boxNarrow";

describe("3. Solve boxNarrow", function() {
    const boxNarrowGrid = "504670000672105000198042507850760400406850090013004800060000000087009000000000000";
    const boxNarrowGrid2 = "500678012672000308008340567850060023426853791700924856061030284280410635305286179";

    it("valid solutions list for single-row answers", function() {
        const grid1 = formatGrid(toGridArray(boxNarrowGrid));
        const solutionList = solveBoxNarrow(grid1, getBox(40));
        assert.equal(solutionList.length, 4);

        // check for valid solution content (single-row) at 2nd position of array
        assert.equal(solutionList[1].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList[1].cellInit, [48,49]);
        assert.equal(solutionList[1].narrow.length, 3);
        assert.equal(solutionList[1].narrow[0].index, 45);
        assert.sameOrderedMembers(solutionList[1].narrow[0].updatedAnswer, [7,9]);
        assert.equal(solutionList[1].narrow[1].index, 52);
        assert.sameOrderedMembers(solutionList[1].narrow[1].updatedAnswer, [5,6,7]);
        assert.equal(solutionList[1].narrow[2].index, 53);
        assert.sameOrderedMembers(solutionList[1].narrow[2].updatedAnswer, [5,6]);
        assert.equal(solutionList[1].solved.length, 0);

        // check for valid solution content (single-row) at 4th position of array
        assert.equal(solutionList[3].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList[3].cellInit, [48,49]);
        assert.equal(solutionList[3].narrow.length, 1);
        assert.equal(solutionList[3].narrow[0].index, 45);
        assert.sameOrderedMembers(solutionList[3].narrow[0].updatedAnswer, [2,7]);
        assert.equal(solutionList[3].solved.length, 0);

        // check for valid solution content (single-row) for 2nd example grid
        const grid2 = formatGrid(toGridArray(boxNarrowGrid2));
        const solutionList2 = solveBoxNarrow(grid2, getBox(0));
        assert.equal(solutionList2.length, 2);

        // check for valid solution content (single-row) at  start of array
        assert.equal(solutionList2[0].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList2[0].cellInit, [18,19]);
        assert.equal(solutionList2[0].narrow.length, 1);
        assert.equal(solutionList2[0].narrow[0].index, 23);
        assert.sameOrderedMembers(solutionList2[0].narrow[0].updatedAnswer, [2,9]);
        assert.equal(solutionList2[0].solved.length, 0);

        // check for valid solution content (single-row) at 2nd position of array
        assert.equal(solutionList2[1].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList2[1].cellInit, [1,2]);
        assert.equal(solutionList2[1].narrow.length, 0);
        assert.equal(solutionList2[1].solved.length, 1);
        assert.equal(solutionList2[1].solved[0].index, 6);
        assert.sameOrderedMembers(solutionList2[1].solved[0].updatedAnswer, [9]);
        });
    it("valid solutions list for single-column answers", function() {
        const grid1 = formatGrid(toGridArray(boxNarrowGrid));
        const solutionList = solveBoxNarrow(grid1, getBox(40));
        assert.equal(solutionList.length, 4);

        // check for valid solution content (single-column) at start of array
        assert.equal(solutionList[0].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList[0].cellInit, [32,41]);
        assert.equal(solutionList[0].narrow.length, 2);
        assert.equal(solutionList[0].narrow[0].index, 59);
        assert.sameOrderedMembers(solutionList[0].narrow[0].updatedAnswer, [3,7,8]);
        assert.equal(solutionList[0].narrow[1].index, 77);
        assert.sameOrderedMembers(solutionList[0].narrow[1].updatedAnswer, [3,6,7,8]);
        assert.equal(solutionList[0].solved.length, 0);

        // check for valid solution content (single-column) at 3rd position of array
        assert.equal(solutionList[2].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList[2].cellInit, [32,41]);
        assert.equal(solutionList[2].narrow.length, 2);
        assert.equal(solutionList[2].narrow[0].index, 59);
        assert.sameOrderedMembers(solutionList[2].narrow[0].updatedAnswer, [1,7,8]);
        assert.equal(solutionList[2].narrow[1].index, 77);
        assert.sameOrderedMembers(solutionList[2].narrow[1].updatedAnswer, [1,6,7,8]); 
        assert.equal(solutionList[2].solved.length, 1);
        assert.equal(solutionList[2].solved[0].index, 5);
        assert.sameOrderedMembers(solutionList[2].solved[0].updatedAnswer, [8]);

        // check for valid solution content (single-column) for 2nd example grid
        const grid2 = formatGrid(toGridArray(boxNarrowGrid2));
        const solutionList2 = solveBoxNarrow(grid2, getBox(76));
        assert.equal(solutionList2.length, 1);
        
        // check for valid solution content (single-row) at start of array
        assert.equal(solutionList2[0].strategy, "boxNarrow");
        assert.sameOrderedMembers(solutionList2[0].cellInit, [59,68]);
        assert.equal(solutionList[2].narrow.length, 2);
        assert.equal(solutionList2[0].narrow[0].index, 14);
        assert.sameOrderedMembers(solutionList2[0].narrow[0].updatedAnswer, [1,5]);
        assert.equal(solutionList2[0].narrow[1].index, 23);
        assert.sameOrderedMembers(solutionList2[0].narrow[1].updatedAnswer, [1,2]);
        assert.equal(solutionList2[0].solved.length, 0);
    });
    it("valid rejection when not solvable", function() {
        const unanswered = "000000000000000000000000000000000000000000000000000000000000000000000000000000000";
        const unansweredGrid = formatGrid(toGridArray(unanswered));

        const solutionList = solveBoxNarrow(unansweredGrid, getBox(80));
        assert.equal(solutionList, false);

        const solutionList2 = solveBoxNarrow(unansweredGrid, getBox(40));
        assert.equal(solutionList2, false);
    });
});