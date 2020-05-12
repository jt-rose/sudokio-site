import { 
    cellPath as CP, 
    getSolved,
    getSolvedValues, 
    formatGrid
} from "./cellPath";
import solveTraditional from "./strategies/recurSolve";

// These functions are applied to a sudoku puzzle before attempting to
// to apply the sudokio strategies. function args submitted as:

// gridString : "80230056..."
// gridArray : [8,0,2,3,0,0,5,6,...]
// sudokuGrid : [8, [3,4], 2,3,[5,6],[7,8],5,6,...]   **formatted grid


// confirm user-submitted grid is a string or non-nested array
export const checkGridDataType = gridString => typeof gridString === "string";

// confirm gridString has 81 characters
export const checkGridLength = gridString => {
    return gridString.length === 81;
}

// confirm only numbers, no other characters
export const checkOnlyNumbers = gridString => {
    return gridString.match(/[0-9]/g).length === 81;
}

// confirm at least 16 cells have been answered
export const checkMinimumAnswered = gridString => {
    return gridString.match(/[^0]/g).length >= 16; 
}

// confirm no contradictions EX: two 9's in same row
export const checkNoObviousErrors = sudokuGrid => {
    return CP.allSets.every(set => {
        const setValues = getSolvedValues(set, sudokuGrid);
        return setValues.length === [...new Set(setValues)].length;
    });
}

//checkDB - build after db setup


// combine checks to confirm puzzle is valid before starting the solver
export const checkValid = gridString => {
    if (!checkGridDataType(gridString)) {
        return {
            valid: false,
            errorType: "The submitted grid must be submitted as an 81 character string with 0 representing unsolved cells"
        };
    }
    if (!checkGridLength(gridString)) {
        return {
            valid: false,
            errorType: "The submitted grid is not the right length and should have exactly 81 characters"
        };
    }
    if (!checkMinimumAnswered(gridString)) {
        return {
            valid: false,
            errorType: "The submitted grid should have at least 16 cells answered to eb a valid sudoku puzzle"
        };
    }
    if (!checkOnlyNumbers(gridString)) {
        return {
            valid: false,
            errorType: "The submitted grid should only have numbers 0-9, with 0 representing an unsolved cell"
        };
    }

    const formattedGrid = formatGrid(gridString);
    if (!checkNoObviousErrors(formattedGrid)) {
        return {
            valid: false,
            errorType: "The submitted grid has an error, with a number occuring more than once in the same row, column, or box"
        };
    }
    // checkDB - will add after DB set up
    /*
    const DBEntryFound = checkDB(formattedGrid);
    if (DBEntryFound) {
        return {
            valid: true,
            gridString,
            formattedGrid,
            solution: DBEntryFound
        };
    }*/
    const solution = solveTraditional(formattedGrid);
    if (solution) {
        return {
            valid: true,
            gridString,
            formattedGrid,
            solution
        };
    } else {
        return {
            valid: false,
            errorType: "Our solver has shown that this puzzle is invalid and has an error"
        };
    }
}


// The following functions can be applied during and after to solving a puzzle 
// to confirm it is correct and/or complete

// checks that all cells of grid have answers
// but doesn't check for correct answers
export const isComplete = sudokuGrid => {
    return sudokuGrid.every(x => typeof x === "number" && x !== 0);
  }
    
// checks that all current answers don't cause conflicts
// does not check that all are answered or will be correct in a full grid
export const isCorrectSoFar = sudokuGrid => {
    const currentAnswerSets = CP.allSets.map(set => getSolved(set, sudokuGrid)
    .map(x => sudokuGrid[x]) );
    
    return currentAnswerSets.every(set => 
      set.length === [...new Set(set)].length && !set.includes(0));
  }
    
// checks grid is complete and correct
export const isCompleteAndCorrect = sudokuGrid => 
    isComplete(sudokuGrid) && isCorrectSoFar(sudokuGrid);