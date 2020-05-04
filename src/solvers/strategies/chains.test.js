import { assert } from "chai";
import {
    formatGrid,
    toGridArray
} from "../cellPath";
import {
    applySolution
} from "../solutionObject";
import {
    solveXChain,
    solveXChainFullGrid
} from "./chains";

describe("Solve Force Chains", function() {
    it("correct force chain of length 2", function() {
        const xChainGrid = formatGrid(toGridArray("270060540050127080000400270000046752027508410500712908136274895785001024002000107"));
        // cellinit 30, update: cell 22 and 76 remove 3 and 9
        const xChainAnswer = solveXChain(xChainGrid, 30);
        assert.equal(xChainAnswer.updates[0].index, 22);
        assert.sameOrderedMembers(xChainAnswer.updates[0].currentAnswer, [3,5,8,9]);
        assert.sameOrderedMembers(xChainAnswer.updates[0].updatedAnswer, [5,8]);
        
        assert.equal(xChainAnswer.updates[1].index, 76);
        assert.sameOrderedMembers(xChainAnswer.updates[1].currentAnswer, [3,5,8,9]);
        assert.sameOrderedMembers(xChainAnswer.updates[1].updatedAnswer, [5,8]);

        const xChainFullGridAnswer = solveXChainFullGrid(xChainGrid);
        xChainFullGridAnswer.forEach(x => console.log(x))
        //console.log(xChainFullGridAnswer)
        //console.log(xChainFullGridAnswer[0].index)
        //console.log(xChainFullGridAnswer[0].updates)
        //console.log(xChainFullGridAnswer[1].index)
        //console.log(xChainFullGridAnswer[1].updates)
        
        //const firstUpdate = applySolution(xChainAnswer, xChainGrid);
        //const xChainAnswer2 = solveXChain(30, firstUpdate);
        //console.log(xChainAnswer2);
        //console.log(xChainAnswer2.updates);
        //const secondUpdate = applySolution(xChainAnswer2, firstUpdate);
        //const xChainAnswer3 = solveXChain(30, secondUpdate);
        //console.log(xChainAnswer3);
        //console.log(xChainAnswer3.updates.map(x => x.updatedAnswer));
        //const thirdUpdate = applySolution(xChainAnswer3, secondUpdate);
        //const xChainAnswer4 = solveXChain(30, thirdUpdate);
        //console.log(xChainAnswer4);
        //console.log(xChainAnswer4.updates.map(x => x.updatedAnswer));
        //const fourthUpdate = applySolution(xChainAnswer4, thirdUpdate);
        //const xChainAnswer5 = solveXChain(30, fourthUpdate);
        //console.log(xChainAnswer5);
        //console.log(xChainAnswer5.updates.map(x => x.updatedAnswer));
        //const fifthUpdate = applySolution(xChainAnswer5, fourthUpdate);
        //const xChainAnswer6 = solveXChain(30, fifthUpdate);
        //console.log(xChainAnswer6);
        //console.log(xChainAnswer6.updates.map(x => x.updatedAnswer));
        //const sixthUpdate = applySolution(xChainAnswer6, fifthUpdate);
        //const xChainAnswer7 = solveXChain(30, sixthUpdate);
        //console.log(xChainAnswer7);
        //console.log(xChainAnswer7.updates.map(x => x.updatedAnswer));
        //const seventhUpdate = applySolution(xChainAnswer7, sixthUpdate);
        //const xChainAnswer8 = solveXChain(30, seventhUpdate);
        //console.log(xChainAnswer8);
        //console.log(xChainAnswer8.updates.map(x => x.updatedAnswer));
        //const eighthUpdate = applySolution(xChainAnswer8, seventhUpdate);
        //const xChainAnswer9 = solveXChain(30, eighthUpdate);
        //console.log(xChainAnswer9);
        //console.log(xChainAnswer9.updates.map(x => x.updatedAnswer));
    });
    it("correct rejection", function() {
        //
    });
});