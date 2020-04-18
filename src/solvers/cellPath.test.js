describe("Create cell references for related rows, columns, boxes", function() {
    const { assert } = require('chai');
    const pathways = require('../cellPathFP');
    const { getRow, getColumn, getBox, getRelCell } = pathways;
    const { getRowNumber, getColumnNumber, getBoxNumber } = pathways;
    const { toGridArray, toGridString, formatGrid } = pathways;
    const { getOpen, getSolved, getValues, getUniqueValues } = pathways;
    const { openValues, solvedValues, uniqueOpenValues, uniqueSolvedValues } = pathways;
    const { getExternal, openExternal, openExternalWith, openCellsWith } = pathways;
    const { cellPath} = pathways;

    const gridString1 = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
  
    // determine column numbers, etc.?
    describe("Find related cells in same parameters", function() {

        const cell0Row = [0,1,2,3,4,5,6,7,8];
        const cell40Row = [36,37,38,39,40,41,42,43,44];
        const cell80Row = [72,73,74,75,76,77,78,79,80];
        it("correct row indices", function() {
            assert.sameOrderedMembers(getRow(0), cell0Row);
            assert.sameOrderedMembers(getRow(40), cell40Row);
            assert.sameOrderedMembers(getRow(80), cell80Row);
        });

        const cell0Column = [0,9,18,27,36,45,54,63,72];
        const cell40Column = [4,13,22,31,40,49,58,67,76];
        const cell80Column = [8,17,26,35,44,53,62,71,80];
        it("correct column indices", function() {
            assert.sameOrderedMembers(getColumn(0), cell0Column);
            assert.sameOrderedMembers(getColumn(40), cell40Column);
            assert.sameOrderedMembers(getColumn(80), cell80Column);
        });

        const cell0Box = [0,1,2,9,10,11,18,19,20];
        const cell40Box = [30,31,32,39,40,41,48,49,50];
        const cell80Box = [60,61,62,69,70,71,78,79,80];
        it("correct box indices", function() {
            assert.sameOrderedMembers(getBox(0), cell0Box);
            assert.sameOrderedMembers(getBox(40), cell40Box);
            assert.sameOrderedMembers(getBox(80), cell80Box);
        });

        const cell0All = [0,1,2,3,4,5,6,7,8,9,18,27,36,45,54,63,72,10,11,19,20];
        const cell40All = [36,37,38,39,40,41,42,43,44,4,13,22,31,49,58,67,76,30,32,48,50];
        const cell80All = [72,73,74,75,76,77,78,79,80,8,17,26,35,44,53,62,71,60,61,69,70];
        it("correct all-related indices", function() {
            assert.sameOrderedMembers(getRelCell(0), cell0All);
            assert.sameOrderedMembers(getRelCell(40), cell40All);
            assert.sameOrderedMembers(getRelCell(80), cell80All);
        });
    });
    describe("Find row, column, and box number - CS numbering", function() {
        it("correct row number", function() {
            assert.equal(getRowNumber(4), 0);
            assert.equal(getRowNumber(40), 4);
            assert.equal(getRowNumber(71), 7);
        });
        it("correct column number", function() {
            assert.equal(getColumnNumber(1), 1);
            assert.equal(getColumnNumber(40), 4);
            assert.equal(getColumnNumber(71), 8);
        });
        it("correct box number", function() {
            assert.equal(getBoxNumber(4), 1);
            assert.equal(getBoxNumber(40), 4);
            assert.equal(getBoxNumber(71), 8);
        });
    });

    describe("Create cellPath to store cell mapping data", function() {
        const cell0Row = [0,1,2,3,4,5,6,7,8];
        const cell40Row = [36,37,38,39,40,41,42,43,44];
        const cell80Row = [72,73,74,75,76,77,78,79,80];
        it("correct row sets", function() {
            assert.sameOrderedMembers(cellPath.rowSets[0], cell0Row);
            assert.sameOrderedMembers(cellPath.rowSets[4], cell40Row);
            assert.sameOrderedMembers(cellPath.rowSets[8], cell80Row);
        });
        it("correct row indices", function() {
            assert.sameOrderedMembers(cellPath.rowIndex[0], cell0Row);
            assert.sameOrderedMembers(cellPath.rowIndex[40], cell40Row);
            assert.sameOrderedMembers(cellPath.rowIndex[80], cell80Row);
        });

        const cell0Column = [0,9,18,27,36,45,54,63,72];
        const cell40Column = [4,13,22,31,40,49,58,67,76];
        const cell80Column = [8,17,26,35,44,53,62,71,80];
        it("correct column sets", function() {
            assert.sameOrderedMembers(cellPath.columnSets[0], cell0Column);
            assert.sameOrderedMembers(cellPath.columnSets[4], cell40Column);
            assert.sameOrderedMembers(cellPath.columnSets[8], cell80Column);
        });
        it("correct column indices", function() {
            assert.sameOrderedMembers(cellPath.columnIndex[0], cell0Column);
            assert.sameOrderedMembers(cellPath.columnIndex[40], cell40Column);
            assert.sameOrderedMembers(cellPath.columnIndex[80], cell80Column);
        });

        const cell0Box = [0,1,2,9,10,11,18,19,20];
        const cell40Box = [30,31,32,39,40,41,48,49,50];
        const cell80Box = [60,61,62,69,70,71,78,79,80];
        it("correct box sets", function() {
            assert.sameOrderedMembers(cellPath.boxSets[0], cell0Box);
            assert.sameOrderedMembers(cellPath.boxSets[4], cell40Box);
            assert.sameOrderedMembers(cellPath.boxSets[8], cell80Box);
        });
        it("correct box indices", function() {
            assert.sameOrderedMembers(cellPath.boxIndex[0], cell0Box);
            assert.sameOrderedMembers(cellPath.boxIndex[40], cell40Box);
            assert.sameOrderedMembers(cellPath.boxIndex[80], cell80Box);
        });

        const cell0All = [0,1,2,3,4,5,6,7,8,9,18,27,36,45,54,63,72,10,11,19,20];
        const cell40All = [36,37,38,39,40,41,42,43,44,4,13,22,31,49,58,67,76,30,32,48,50];
        const cell80All = [72,73,74,75,76,77,78,79,80,8,17,26,35,44,53,62,71,60,61,69,70];
        it("correct all-related indices", function() {
            assert.sameOrderedMembers(cellPath.relCell[0], cell0All);
            assert.sameOrderedMembers(cellPath.relCell[40], cell40All);
            assert.sameOrderedMembers(cellPath.relCell[80], cell80All);
        });
        it("correct row number", function() {
            assert.equal(cellPath.rowNumber[4], 0);
            assert.equal(cellPath.rowNumber[40], 4);
            assert.equal(cellPath.rowNumber[71], 7);
        });
        it("correct column number", function() {
            assert.equal(cellPath.columnNumber[1], 1);
            assert.equal(cellPath.columnNumber[40], 4);
            assert.equal(cellPath.columnNumber[71], 8);
        });
        it("correct box number", function() {
            assert.equal(cellPath.boxNumber[4], 1);
            assert.equal(cellPath.boxNumber[40], 4);
            assert.equal(cellPath.boxNumber[71], 8);
        });
    });
    describe("Convert sudokuGrid from string to array and back", function() {
        it("convert to array", function() {
            const gridArray = toGridArray(gridString1);
            assert.equal(typeof gridArray, "object");
            assert.equal(gridArray.length, 81);
            assert.equal(gridArray[0], 5);
            assert.sameOrderedMembers(gridArray[2], []);
            assert.sameDeepOrderedMembers(gridArray.slice(9, 18), [6,[],[],1,9,5,[],[],[]]);
            assert.sameDeepOrderedMembers(gridArray.slice(78, 81), [[],7,9]);
        });
        it("convert to string", function() {
            const gridArray = toGridArray(gridString1);
            const stringRevert = toGridString(gridArray);
            assert.equal(stringRevert, gridString1);
            assert.equal(typeof stringRevert, "string");
            assert.equal(stringRevert.length, 81);
            assert.equal(stringRevert[0], "5");
            assert.equal(stringRevert.slice(9, 18), "600195000");
            assert.equal(stringRevert.slice(78, 81), "079");
        });
        it("reject if length of string/ array not equal 81", function() {
            assert.equal(toGridArray(gridString1.concat("0")), false);
            const gridArray = toGridArray(gridString1);
            assert.equal(toGridString(gridArray.slice(0, 80)), false);
        });
        it("convert subarrays to '0' in string format", function() {
            const gridArrayNested = toGridArray(gridString1)
                .slice(0,80)
                .concat([[1,2,3]]);
            assert.equal(gridArrayNested.length, 81);
            assert.equal(toGridString(gridArrayNested)[80], "0");
        });
    })
    describe("Format sudokuGrid to list possible answers for unanswered cells", function() {
        it("populate possible answers as subarray for cells marked 0", function() {
            const fmtGrid = formatGrid(toGridArray(gridString1));
            assert.equal(fmtGrid[0], 5);
            assert.sameOrderedMembers(fmtGrid[2], [1,2,4]);
            assert.equal(fmtGrid[39], 8);
            assert.sameOrderedMembers(fmtGrid[40], [5]);
            assert.equal(fmtGrid[80], 9);
            assert.sameOrderedMembers(fmtGrid[78], [1,3,4,6]);
        });
    });
    describe("Filter sudokuGrid to return open, solved, and cell answers", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));
            const row1 = [0,1,2,3,4,5,6,7,8];
            const row2 = [72,73,74,75,76,77,78,79,80];
            const column1 = [0,9,18,27,36,45,54,63,72];
            const column2 = [4,13,22,31,40,49,58,67,76];
            const box1 = [27,28,29,36,37,38,45,46,47];
            const box2 = [33,34,35,42,43,44,51,52,53];
        
        it("valid return of open cells", function() {
            
            assert.sameOrderedMembers(getOpen(row1, sudokuGrid), [2,3,5,6,7,8]);
            assert.sameOrderedMembers(getOpen(row2, sudokuGrid), [72,73,74,75,77,78]);

            assert.sameOrderedMembers(getOpen(column1, sudokuGrid), [18,54,63,72]);
            assert.sameOrderedMembers(getOpen(column2, sudokuGrid), [22,40,58]);
            
            assert.sameOrderedMembers(getOpen(box1, sudokuGrid), [28,29,37,38,46,47]);
            assert.sameOrderedMembers(getOpen(box2, sudokuGrid), [33,34,42,43,51,52]);

            assert.equal(getOpen([...sudokuGrid.keys()], sudokuGrid).length, 51);
        });
        it("valid return of solved cells", function() {
            
            assert.sameOrderedMembers(getSolved(row1, sudokuGrid), [0,1,4]);
            assert.sameOrderedMembers(getSolved(row2, sudokuGrid), [76,79,80]);
            
            assert.sameOrderedMembers(getSolved(column1, sudokuGrid), [0,9,27,36,45]);
            assert.sameOrderedMembers(getSolved(column2, sudokuGrid), [4,13,31,49,67,76]);
            
            assert.sameOrderedMembers(getSolved(box1, sudokuGrid), [27,36,45]);
            assert.sameOrderedMembers(getSolved(box2, sudokuGrid), [35,44,53]);

            assert.equal(getSolved([...sudokuGrid.keys()], sudokuGrid).length, 30);
        });
        it("valid return of answer sets(solved or possible answer arrays)", function() {
            
            // test answer sets for open and solved rows
            assert.sameOrderedMembers(openValues(row1, sudokuGrid)[0], [1,2,4]);
            assert.sameOrderedMembers(openValues(row1, sudokuGrid)[5], [2,4,8]);
            assert.sameOrderedMembers(openValues(row2, sudokuGrid)[0], [1,2,3]);
            assert.sameOrderedMembers(openValues(row2, sudokuGrid)[5], [1,3,4,6]);

            assert.equal(solvedValues(row1, sudokuGrid)[0], 5);
            assert.equal(solvedValues(row1, sudokuGrid)[2], 7);
            assert.equal(solvedValues(row2, sudokuGrid)[0], 8);
            assert.equal(solvedValues(row2, sudokuGrid)[2], 9);

            // test answer sets for open and solved columns
            assert.sameOrderedMembers(openValues(column1, sudokuGrid)[0], [1,2]);
            assert.sameOrderedMembers(openValues(column1, sudokuGrid)[3], [1,2,3]);
            assert.sameOrderedMembers(openValues(column2, sudokuGrid)[0], [3,4]);
            assert.sameOrderedMembers(openValues(column2, sudokuGrid)[2], [3,5]);

            assert.equal(solvedValues(column1, sudokuGrid)[0], 5);
            assert.equal(solvedValues(column1, sudokuGrid)[4], 7);
            assert.equal(solvedValues(column2, sudokuGrid)[0], 7);
            assert.equal(solvedValues(column2, sudokuGrid)[5], 8);

            // test answer sets for open and solved boxes
            assert.sameOrderedMembers(openValues(box1, sudokuGrid)[0], [1,2,5]);
            assert.sameOrderedMembers(openValues(box1, sudokuGrid)[5], [1,3,5,9]);
            assert.sameOrderedMembers(openValues(box2, sudokuGrid)[0], [4,5,7,9]);
            assert.sameOrderedMembers(openValues(box2, sudokuGrid)[5], [4,5,9]);

            assert.equal(solvedValues(box1, sudokuGrid)[0], 8);
            assert.equal(solvedValues(box1, sudokuGrid)[2], 7);
            assert.equal(solvedValues(box2, sudokuGrid)[0], 3);
            assert.equal(solvedValues(box2, sudokuGrid)[2], 6);
        });
        it("valid return of only unique possible answers - unsolved", function() {
            assert.sameOrderedMembers(uniqueOpenValues(row1, sudokuGrid), [1,2,4,6,8,9]);
            assert.sameOrderedMembers(uniqueOpenValues(row2, sudokuGrid), [1,2,3,4,5,6]);

            assert.sameOrderedMembers(uniqueOpenValues(column1, sudokuGrid), [1,2,3,9]);
            assert.sameOrderedMembers(uniqueOpenValues(column2, sudokuGrid), [3,4,5]);

            assert.sameOrderedMembers(uniqueOpenValues(box1, sudokuGrid), [1,2,3,5,6,9]);
            assert.sameOrderedMembers(uniqueOpenValues(box2, sudokuGrid), [2,4,5,7,8,9]);
        });
        it("valid return of only unique answers - solved", function() {
            assert.sameOrderedMembers(uniqueSolvedValues(row1, sudokuGrid), [3,5,7]);
            assert.sameOrderedMembers(uniqueSolvedValues(row2, sudokuGrid), [7,8,9]);

            assert.sameOrderedMembers(uniqueSolvedValues(column1, sudokuGrid), [4,5,6,7,8]);
            assert.sameOrderedMembers(uniqueSolvedValues(column2, sudokuGrid), [1,2,6,7,8,9]);

            assert.sameOrderedMembers(uniqueSolvedValues(box1, sudokuGrid), [4,7,8]);
            assert.sameOrderedMembers(uniqueSolvedValues(box2, sudokuGrid), [1,3,6]);
        });
    });
    describe("Cross-reference one grid parameter with another, removing overlapping values", function() {
        it("valid filtering of indexes", function() {
            assert.sameOrderedMembers(getExternal(getBox(0), getRow(0)), [3,4,5,6,7,8]);
            assert.sameOrderedMembers(getExternal(getBox(40), getColumn(40)), [4,13,22,58,67,76]);
            assert.sameOrderedMembers(getExternal(getBox(80), getRow(72)), [72,73,74,75,76,77]);
        });
        it("valid filtering of open indexes", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));

            const external1 = openExternal(getBox(0), getRow(0), sudokuGrid);
            assert.sameOrderedMembers(external1, [3,5,6,7,8]);
            const external2 = openExternal(getBox(40), getColumn(40), sudokuGrid);
            assert.sameOrderedMembers(external2, [22,58]);
            const external3 = openExternal(getBox(80), getRow(72), sudokuGrid);
            assert.sameOrderedMembers(external3, [72,73,74,75,77]);
        });
        it("valid filtering of open indexes containing specified values", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));

            const external1 = openExternalWith(getBox(0), getRow(0), sudokuGrid, [2,8]);
            assert.sameOrderedMembers(external1, [5,8]);
            const external2 = openExternalWith(getBox(40), getColumn(40), sudokuGrid, [5]);
            assert.sameOrderedMembers(external2, [58]);
            const external3 = openExternalWith(getBox(80), getRow(72), sudokuGrid, [2,6]);
            assert.sameOrderedMembers(external3, [75,77]);
        });
        it("valid handling of error when answer given as number rather than array", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));

            const external2 = openExternalWith(getBox(40), getColumn(40), sudokuGrid, 5);
            assert.sameOrderedMembers(external2, [58]);
        });
    });
    describe("Return array of open cells containing specific value(s)", function() {
        it("valid filtering of cells", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));

            const openWith1 = openCellsWith(getRow(0), sudokuGrid, [2,4]);
            assert.sameOrderedMembers(openWith1, [2,5,7,8]);
            const openWith2 = openCellsWith(getColumn(4), sudokuGrid, [5]);
            assert.sameOrderedMembers(openWith2, [40,58]);
            const openWith3 = openCellsWith(getBox(80), sudokuGrid, [3,6]);
            assert.sameOrderedMembers(openWith3, [69,78]);
        });
        it("valid handling of error when answer given as number rather than array", function() {
            const sudokuGrid = formatGrid(toGridArray(gridString1));

            const openWith2 = openCellsWith(getColumn(4), sudokuGrid, 5);
            assert.sameOrderedMembers(openWith2, [40,58]);
        });
    });

    });