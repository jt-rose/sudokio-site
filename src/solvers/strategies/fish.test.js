import { assert } from "chai";
import {
    getRow,
    formatGrid,
    toGridArray
} from "../cellPath";
import {
    solveXWing,
    solveSwordfish,
    solveJellyfish
} from "./fish";

describe("Solve Fish Strategies", function() {

    const invalid = "990000000002000000003000000004000000005000000006000000007000000008000000001000000";
    const invalidGrid = toGridArray(invalid);

    describe("Solve X-Wing", function() {
        it("correct solution", function() {
            const XWingGrid = formatGrid(toGridArray("900051730107398205500076091810724350200165007075983012021537000758649123390812570"));
            const solution = solveXWing(XWingGrid);
            const SL1 = solution[0];
            const SL2 = solution[1];

            assert.equal(solution.length, 2);

            assert.equal(SL1.strategy, "X-Wing");
            assert.sameOrderedMembers(SL1.cellInit, [29,35,74,80]);
            assert.sameOrderedMembers(SL1.removal, [6]);
            assert.equal(SL1.updates.length, 3);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 3);

            assert.equal(SL1.updates[0].index, 2);
            assert.sameOrderedMembers(SL1.updates[0].removal, [6]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [2,4,6]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [2,4]);

            assert.equal(SL1.updates[1].index, 8);
            assert.sameOrderedMembers(SL1.updates[1].removal, [6]);
            assert.sameOrderedMembers(SL1.updates[1].currentAnswer, [4,6,8]);
            assert.sameOrderedMembers(SL1.updates[1].updatedAnswer, [4,8]);

            assert.equal(SL1.updates[2].index, 62);
            assert.sameOrderedMembers(SL1.updates[2].removal, [6]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [4,6,8,9]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [4,8,9]);


            assert.equal(SL2.strategy, "X-Wing");
            assert.sameOrderedMembers(SL2.cellInit, [45,54,51,60]);
            assert.sameOrderedMembers(SL2.removal, [6]);
            assert.equal(SL2.updates.length, 2);
            assert.equal(SL2.solved.length, 0);
            assert.equal(SL2.narrow.length, 2);

            assert.equal(SL2.updates[0].index, 61);
            assert.sameOrderedMembers(SL2.updates[0].removal, [6]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [4,6,8]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [4,8]);

            assert.equal(SL2.updates[1].index, 62);
            assert.sameOrderedMembers(SL2.updates[1].removal, [6]);
            assert.sameOrderedMembers(SL2.updates[1].currentAnswer, [4,6,8,9]);
            assert.sameOrderedMembers(SL2.updates[1].updatedAnswer, [4,8,9]);

            const XWingGrid2 = formatGrid(toGridArray("100000569492056108056109240009640801064010000218035604040500016905061402621000005"));
            const solution2 = solveXWing(XWingGrid2);
            const SL3 = solution2[0];

            assert.equal(solution2.length, 1);

            assert.equal(SL3.strategy, "X-Wing");
            assert.sameOrderedMembers(SL3.cellInit, [12,16,48,52]);
            assert.sameOrderedMembers(SL3.removal, [7]);
            assert.equal(SL3.updates.length, 8);
            assert.equal(SL3.solved.length, 0);
            assert.equal(SL3.narrow.length, 8);

            assert.equal(SL3.updates[0].index, 3);
            assert.sameOrderedMembers(SL3.updates[0].removal, [7]);
            assert.sameOrderedMembers(SL3.updates[0].currentAnswer, [2,3,4,7,8]);
            assert.sameOrderedMembers(SL3.updates[0].updatedAnswer, [2,3,4,8]);

            assert.equal(SL3.updates[2].index, 66);
            assert.sameOrderedMembers(SL3.updates[2].removal, [7]);
            assert.sameOrderedMembers(SL3.updates[2].currentAnswer, [3,7,8]);
            assert.sameOrderedMembers(SL3.updates[2].updatedAnswer, [3,8]);

            assert.equal(SL3.updates[7].index, 79);
            assert.sameOrderedMembers(SL3.updates[7].removal, [7]);
            assert.sameOrderedMembers(SL3.updates[7].currentAnswer, [3,7,8,9]);
            assert.sameOrderedMembers(SL3.updates[7].updatedAnswer, [3,8,9]);
        });
        it("correct rejection", function() {
            const reject = solveXWing(getRow(0), invalidGrid);
            assert.equal(reject, false);
        });
    });
    describe("Solve Swordfish", function() {
        it("correct solution", function() {
            const swordfishGrid = formatGrid(toGridArray("529410703006003002003200000052300076637050200190627530300069420200830600960742305"));
            const solution = solveSwordfish(swordfishGrid);
            const SL1 = solution[0];

            assert.equal(solution.length, 1);

            assert.equal(SL1.strategy, "Swordfish");
            assert.sameOrderedMembers(SL1.cellInit, [9,18,27,13,22,31,15,24,33]);
            assert.sameOrderedMembers(SL1.removal, [8]);
            assert.equal(SL1.updates.length, 7);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 7);

            assert.equal(SL1.updates[0].index, 10);
            assert.sameOrderedMembers(SL1.updates[0].removal, [8]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,4,7,8]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [1,4,7]);

            assert.equal(SL1.updates[2].index, 19);
            assert.sameOrderedMembers(SL1.updates[2].removal, [8]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [1,4,7,8]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [1,4,7]);

            assert.equal(SL1.updates[4].index, 25);
            assert.sameOrderedMembers(SL1.updates[4].removal, [8]);
            assert.sameOrderedMembers(SL1.updates[4].currentAnswer, [1,4,5,6,8,9]);
            assert.sameOrderedMembers(SL1.updates[4].updatedAnswer, [1,4,5,6,9]);


            const swordfishGrid2 = formatGrid(toGridArray("926000100537010428841000603259734816714060030368120040102000084485071360603000001"));
            const solution2 = solveSwordfish(swordfishGrid2);
            const SL2 = solution2[0];

            assert.equal(solution2.length, 1);

            assert.equal(SL2.strategy, "Swordfish");
            assert.sameOrderedMembers(SL2.cellInit, [55,73,22,58,76,25,79]);
            assert.sameOrderedMembers(SL2.removal, [9]);
            assert.equal(SL2.updates.length, 8);
            assert.equal(SL2.solved.length, 0);
            assert.equal(SL2.narrow.length, 8);

            assert.equal(SL2.updates[6].index, 21);
            assert.sameOrderedMembers(SL2.updates[6].removal, [9]);
            assert.sameOrderedMembers(SL2.updates[6].currentAnswer, [2,5,9]);
            assert.sameOrderedMembers(SL2.updates[6].updatedAnswer, [2,5]);

            assert.equal(SL2.updates[1].index, 59);
            assert.sameOrderedMembers(SL2.updates[1].removal, [9]);
            assert.sameOrderedMembers(SL2.updates[1].currentAnswer, [3,5,6,9]);
            assert.sameOrderedMembers(SL2.updates[1].updatedAnswer, [3,5,6]);

            assert.equal(SL2.updates[5].index, 78);
            assert.sameOrderedMembers(SL2.updates[5].removal, [9]);
            assert.sameOrderedMembers(SL2.updates[5].currentAnswer, [2,5,7,9]);
            assert.sameOrderedMembers(SL2.updates[5].updatedAnswer, [2,5,7]);
        });
        it("correct rejection", function() {
            const reject = solveSwordfish(getRow(0), invalidGrid);
            assert.equal(reject, false);
        });
    });
    describe("Solve JellyFish", function() {
        it("correct solution", function() {
            const jellyfishGrid = formatGrid(toGridArray("050749080089003000600001390040007060000400809000002000060004010500210047010005030"));
            const solution = solveJellyfish(jellyfishGrid);
            const SL1 = solution[0];

            assert.equal(solution.length, 1);

            assert.equal(SL1.strategy, "Jellyfish");
            assert.sameOrderedMembers(SL1.cellInit, [0,2,6,8,27,29,33,35,54,56,60,62,72,74,78,80]);
            assert.sameOrderedMembers(SL1.removal, [2]);
            assert.equal(SL1.updates.length, 7);
            assert.equal(SL1.solved.length, 0);
            assert.equal(SL1.narrow.length, 7);

            assert.equal(SL1.updates[0].index, 9);
            assert.sameOrderedMembers(SL1.updates[0].removal, [2]);
            assert.sameOrderedMembers(SL1.updates[0].currentAnswer, [1,2,4,7]);
            assert.sameOrderedMembers(SL1.updates[0].updatedAnswer, [1,4,7]);

            assert.equal(SL1.updates[2].index, 20);
            assert.sameOrderedMembers(SL1.updates[2].removal, [2]);
            assert.sameOrderedMembers(SL1.updates[2].currentAnswer, [2,4,7]);
            assert.sameOrderedMembers(SL1.updates[2].updatedAnswer, [4,7]);

            assert.equal(SL1.updates[6].index, 26);
            assert.sameOrderedMembers(SL1.updates[6].removal, [2]);
            assert.sameOrderedMembers(SL1.updates[6].currentAnswer, [2,4,5]);
            assert.sameOrderedMembers(SL1.updates[6].updatedAnswer, [4,5]);


            const jellyfishGrid2 = formatGrid(toGridArray("000000000070030920019025630004000210000000000057090460095140370700000040042367590"));
            const solution2 = solveJellyfish(jellyfishGrid2);
            const SL2 = solution2[0];
            const SL3 = solution2[1];

            assert.equal(solution2.length, 2);

            assert.equal(SL2.strategy, "Jellyfish");
            assert.sameOrderedMembers(SL2.cellInit, [18,21,26,45,48,50,53,54,59,62,72,80]);
            assert.sameOrderedMembers(SL2.removal, [8]);
            assert.equal(SL2.updates.length, 19);
            assert.equal(SL2.solved.length, 0);
            assert.equal(SL2.narrow.length, 19);

            assert.equal(SL2.updates[0].index, 0);
            assert.sameOrderedMembers(SL2.updates[0].removal, [8]);
            assert.sameOrderedMembers(SL2.updates[0].currentAnswer, [2,3,4,5,6,8]);
            assert.sameOrderedMembers(SL2.updates[0].updatedAnswer, [2,3,4,5,6]);

            assert.equal(SL2.updates[4].index, 3);
            assert.sameOrderedMembers(SL2.updates[4].removal, [8]);
            assert.sameOrderedMembers(SL2.updates[4].currentAnswer, [4,6,7,8,9]);
            assert.sameOrderedMembers(SL2.updates[4].updatedAnswer, [4,6,7,9]);

            assert.equal(SL2.updates[18].index, 68);
            assert.sameOrderedMembers(SL2.updates[18].removal, [8]);
            assert.sameOrderedMembers(SL2.updates[18].currentAnswer, [2,8,9]);
            assert.sameOrderedMembers(SL2.updates[18].updatedAnswer, [2,9]);

            assert.equal(SL2.updates[13].index, 71);
            assert.sameOrderedMembers(SL2.updates[13].removal, [8]);
            assert.sameOrderedMembers(SL2.updates[13].currentAnswer, [1,2,6,8]);
            assert.sameOrderedMembers(SL2.updates[13].updatedAnswer, [1,2,6]);


            assert.sameMembers(SL3.cellInit, [1,28,37,64,4,31,40,67,6,42,69,7,43]);
            assert.sameMembers(SL3.removal, [8]);
        });
        it("correct rejection", function() {
            const reject = solveJellyfish(getRow(0), invalidGrid);
            assert.equal(reject, false);
        });
    });
});