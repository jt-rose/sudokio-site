import {
    getOpen,
    getRow,
    getColumn,
    getBox,
    getUniqueSolvedValues,
    getRelCell
} from "../cellPath";

import {
    isOnly,
    formatUpdate,
    formatSolution
} from "../solutionObject";

// 1. Single Option: check if only one possible value for a cell remains open based on 
// related parameters and previously eliminated options from advanced strategies.
// Determine if single option came from just one parameter(ex: row), multiple parameters
// or multiple parameters together with using advanced strategies to eliminate options.
// Our sudoku solver will give preference to solving only those with the easier method
// before re-running this function - that way, we can always priortize the simplest route.

// Due to the data structure used, this function has to do a little more work than you 
// might expect. We retain only the viable answers for each cell, but when a single answer
// is left then we need to check if it came from singleOption, singleParam, boxNarrow, or others.
// This creates some additional work but also avoids having to recalculate viable answers for each 
// cell along with remembering what answer sets have been narrowed.
export default function solveSingleOption(sudokuGrid, i) {
    // note: will still need to check for prior narrowing for data analysis
    if (typeof sudokuGrid[i] === "object" && sudokuGrid[i].length === 1) {
      if (getOpen(getRow(i), sudokuGrid).length === 1) {
        const update = formatUpdate(i, sudokuGrid, isOnly(sudokuGrid[i]));
        const solution = formatSolution("singleOption-Row", i, update);
        return solution;
      }
      if (getOpen(getColumn(i), sudokuGrid).length === 1) {
        const update = formatUpdate(i, sudokuGrid, isOnly(sudokuGrid[i]));
        const solution = formatSolution("singleOption-Column", i, update);
        return solution;
      }
      if (getOpen(getBox(i), sudokuGrid).length === 1) {
        const update = formatUpdate(i, sudokuGrid, isOnly(sudokuGrid[i]));
        const solution = formatSolution("singleOption-Box", i, update);
        return solution;
      }
      if (getUniqueSolvedValues(getRelCell(i), sudokuGrid).length === 8) {
        const update = formatUpdate(i, sudokuGrid, isOnly(sudokuGrid[i]));
        const solution = formatSolution("singleOption-MultiParam", i, update);
        return solution;
      }
      const update = formatUpdate(i, sudokuGrid, isOnly(sudokuGrid[i]));
        const solution = formatSolution("singleOption-Narrowing", i, update);
        return solution; // realistically this should not be used => prior narrowing solution should get credit for solving
    }
  return false;
  };