import { getOpen, getRelCell } from "./cellPath";
import * as R from "ramda";

// When formatting updates, answers that have been ruled out are applied
// to the removal argument in the "formatUpdate" function. Occasionally we 
// instead only know which answers it must be, so this function takes those 
// and returns a list of the now excluded answers (reversing it, basically)
export function isOnly(answerOption) {
    const valid = [].concat(answerOption); // coerce to array if needed
    return [1,2,3,4,5,6,7,8,9].filter(x => !valid.includes(x));
}

// generate object to store cell update info 
export function formatUpdate(index, sudokuGrid, removal) {
    const remArray = [].concat(removal); // coerce to array if needed
    return {
        index,
        removal: remArray,
        currentAnswer: sudokuGrid[index],
        updatedAnswer: sudokuGrid[index].filter(x => !remArray.includes(x))
    };
}

// format solution object
export function formatSolution(strategy, cellInit, updateCollection) {
    const updates = [].concat(updateCollection); // coerce to array if single object
    const narrow = updates.filter(x => x.updatedAnswer.length > 1);
    const solved = updates.filter(x => x.updatedAnswer.length === 1);
    const { removal } = updates[0];
    return { strategy, cellInit, removal, updates, narrow, solved };
}

// pick the simplest singleOption solutions available from the current set
// (multiple can be selected if matching complexity)
function filterBestSingleOption(solutionList) {
    // find solutions that only require checking a single parameter 
    // Ex: (row, column, box), and don't require narrowing options
    // by previously using a more advanced strategy
  const onlySingleParam = solutionList
  .filter(x => !x.strategy.match(/MultiParam|Narrowing/) );

  if (onlySingleParam.length > 0) {
    return onlySingleParam;
  }
  // if none above, find solutions that solve with multiple parameters
  // but no advanced narrowing
  const onlyMultiParam = solutionList
  .filter(x => !x.strategy.match(/Narrowing/) );

  if (onlyMultiParam.length > 0) {
    return onlyMultiParam;
  }
  // else, simply return what was found
  return solutionList;
}

// pick the best solution from list of those currently possible
export function filterBest(solutionList) {
    if (solutionList === false) {
        return false;
      }
      if (solutionList.length === 1) {
        return solutionList[0];
      }
      //"singleOption" solution will be attempted first 
      // and be at start of solitionList if found
      // this will prioritize some singleOption answers over others
      if (solutionList[0].strategy.match("singleOption")) {
        return filterBestSingleOption(solutionList);
      }
      if (solutionList[0].strategy.match("singleParam")) {
        return solutionList[0];
      }
    
      // check for which, if any, of the solutions found solve more cells than another
      const highestSolved = Math.max(...solutionList.map(x => x.solved.length));
      const mostSolved = solutionList.filter(x => x.solved.length === highestSolved);
      if (mostSolved.length === 1) {
        return mostSolved[0];
      }
    
      // check for greater amount of narrowing if none were solved
      const highestNarrowed = Math.max(...mostSolved.map(x => x.narrow.length));
      const mostNarrowed = mostSolved.filter(x => x.narrow.length === highestNarrowed);
      if (mostNarrowed.length === 1) {
        return mostNarrowed[0];
      }
    
      // if same  amount of narrowing, then prioritize narowing cells that
      // are closer to being solved
      const proximityToSolve = mostNarrowed.map( item => item.narrow
        .reduce( (sum, current) => sum + current.updatedAnswer.length, 0) );
      
      const leastLeft = proximityToSolve.indexOf( Math.min(...proximityToSolve) );
      return mostNarrowed[leastLeft];
}

// update answer options for related cells after solving a cell
function updateRelCell(solvedIndex, sudokuGrid) {
    const removeAnswer = sudokuGrid[solvedIndex];
    const removeAnswerFrom = getOpen(getRelCell(solvedIndex), sudokuGrid).filter(x => x !== solvedIndex);
  
    return sudokuGrid.map((item, index) => {
        if (removeAnswerFrom.includes(index)) {
            return item.filter(x => x !== removeAnswer);
        }
        return item;
    });
  }

// update the sudokuGrid by applying the solution and returning a new grid
export function applySolutionSingle(solution, sudokuGrid) {
    const updatedGrid = solution.updates.reduce( (grid, item) => 
      item.updatedAnswer.length === 1 ?
          R.update(item.index, item.updatedAnswer[0], grid) :
          R.update(item.index, grid[item.index].filter(x => // filter is used for multiple passthroughs
              item.updatedAnswer.includes(x)), grid)
      , sudokuGrid);

  const solvedCells = solution.solved.map(x => x.index);
  return solvedCells.reduce( (grid, solvedIndex) => 
      updateRelCell(solvedIndex, grid), updatedGrid);
}

// compose function for...
const applyAll = fn => (arr, sudokuGrid) => 
  arr.reduce( (grid, item) =>
      fn(item, grid), sudokuGrid);

// apply solution used on array of multiple solutions
const applySolutionMultiple = applyAll(applySolutionSingle);

// checks if multiple solutions found and apply
export const applySolution = (solution, sudokuGrid) => {
  return solution.length ? 
    applySolutionMultiple(solution, sudokuGrid) : 
    applySolutionSingle(solution, sudokuGrid);
}