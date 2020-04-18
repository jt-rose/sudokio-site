import {
    cellPath as CP,
    getSolved
} from "./cellPath";

import {
    filterBest,
    applySolution
} from "./solutionObject";

import solveSingleOption from "./strategies/singleOption";
import solveSingleParam from "./strategies/singleParam";
import solveBoxNarrow from "./strategies/boxNarrow";
import {
    solveNakedPair,
    solveNakedTriple,
    solveNakedQuad
} from "./strategies/nakedPairings";
import {
    solveHiddenPair,
    solveHiddenTriple,
    solveHiddenQuad
} from "./strategies/hiddenPairings";
import {
    solveXWing,
    solveSwordfish,
    solveJellyfish
} from "./strategies/fish";
import solveXChain from "./strategies/chains";
  
// Strategies were originally written to apply to isolated parameters
// (ex: rows, boxes, etc.). This function stores the strategy and applies it
// to all relevant params across the sudokuGrid to scan the full grid.
// Example: solveSingleParam can be applied to a signle row, column, or box
// but using this function can apply it to all rows, all columns, all boxes
// and produce every result across the current grid
// we can then use the filterBest function to find which is the next 
// preferable (easiest or most effective) step across many similar options
const solveEach = strategy => arr => sudokuGrid => {
  const allSolutions = arr.reduce( (solutionList, item) => {
    const solution = strategy(sudokuGrid, item);
    if (solution) {
      return solutionList.concat(solution);
    }
    return solutionList;
  }, []);
  return allSolutions.length > 0 ? allSolutions : false;
};
  
// Apply strategies to full grid for a "standard" search
// fish strategies are already built to scan full grid and don't need this
const solveSingleOptionFullGrid = solveEach(solveSingleOption)(CP.allIndex);
const solveSingleParamFullGrid = solveEach(solveSingleParam)(CP.allSets);
const solveBoxNarrowFullGrid = solveEach(solveBoxNarrow)(CP.boxSets);
const solveNakedPairFullGrid = solveEach(solveNakedPair)(CP.allSets);
const solveNakedTripleFullGrid = solveEach(solveNakedTriple)(CP.allSets);
const solveNakedQuadFullGrid = solveEach(solveNakedQuad)(CP.allSets);
const solveHiddenPairFullGrid = solveEach(solveHiddenPair)(CP.allSets);
const solveHiddenTripleFullGrid = solveEach(solveHiddenTriple)(CP.allSets);
const solveHiddenQuadFullGrid = solveEach(solveHiddenQuad)(CP.allSets);
const solveXChainFullGrid = solveEach(solveXChain)(CP.allIndex);
  
// store "standard" strategies that will be applied across the full grid
// sequentially until a hit is found
// On the site, non-fullGrid strategies can be applied 
// to specific cells or params if needed with the original strategy
const strategyList = {
  solveSingleOptionFullGrid,
  solveSingleParamFullGrid,
  solveBoxNarrowFullGrid,
  solveNakedPairFullGrid,
  solveNakedTripleFullGrid,
  solveNakedQuadFullGrid,
  solveHiddenPairFullGrid,
  solveHiddenTripleFullGrid,
  solveHiddenQuadFullGrid,
  solveXWing,
  solveSwordfish,
  solveJellyfish,
  solveXChainFullGrid
};

// take the strategyList defined above and provide string-format name
// of strategy to cut off sequence of strategies applied to sudoku grid
// for example, providing "solveBoxNarrowFullGrid" will reduce sequence of
// strategies applied to being just singleOption, singleParam, and BoxNarrow
export function limitStratsTo(strategyString) {
  const upTo = (Object.keys(strategyList).findIndex(x => 
    x.match(strategyString))) + 1;
      
  if (upTo === 0) {
    return false;
  }
  return Object.values(strategyList).slice(0, upTo);
}

  
// apply each strategy in succesion until a hit is found for one round
export const applyStrats = (stratsUsed = Object.values(strategyList)) => sudokuGrid => {
  // check if any of the given strategies result in solution - single sweep of grid
  return stratsUsed.reduce( (prev, strategy) => {
    if (prev !== false) {
      return prev; 
      // first strategy found successful will pass over later strategies
    }
    return strategy(sudokuGrid);
  }, false);
  // if none found successful, return false
};

// continue using applyStrats while updating grid with solutions found each round
// until grid is completed or found unsolvable
// applyStratsCurried will default to the full strategyList
// but can be supplied with a limited list if desired
export const applyStratsUntilDone = (applyStratsCurried = applyStrats()) => 
  (sudokuGrid, solutionList = [], round = 1) => {
    // recursively transform until no further transformations available - multi sweep
    if (isComplete(sudokuGrid)) {
      return {updatedGrid: sudokuGrid, solutions: solutionList};
    }
    const currentSolution = filterBest(applyStratsCurried(sudokuGrid));
    if (currentSolution === false) {
      return {updatedGrid: sudokuGrid, solutions: solutionList, solved: false};
  }
  // add round found for each solution found during that sweep
    const solutionWithRound = [].concat(currentSolution)
        .map(solution => ({
          ...solution,
          round
        }) );
  const updatedGrid = applySolution(currentSolution, sudokuGrid);
  return applyStratsUntilDone(applyStratsCurried)(updatedGrid, [...solutionList, solutionWithRound].flat(), round + 1 );
};



// checks that all cells of grid have answers
// but doesn't check for correct answers
export function isComplete(sudokuGrid) {
  return sudokuGrid.every(x => typeof x === "number" && x !== 0);
}
  
// checks that all current answers don't cause conflicts
// does not check that all are answered or will be correct in a full grid
export function correctSoFar(sudokuGrid) {
  const currentAnswerSets = CP.allSets.map(set => getSolved(set, sudokuGrid)
  .map(x => sudokuGrid[x]) );
  
  return currentAnswerSets.every(set => 
    set.length === [...new Set(set)].length && !set.includes(0));
}
  
// checks grid is complete and correct
export const completeAndCorrect = sudokuGrid => 
  isComplete(sudokuGrid) && correctSoFar(sudokuGrid);