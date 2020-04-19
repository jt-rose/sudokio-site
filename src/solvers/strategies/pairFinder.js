// Find all groupings of unique combinations by group length, ignoring order
// Ex: unique pairs of [1,2,3,4] => [1,2], [1,3], [1,4], [2,3], [2,4], [3,4] 

export const findGroups = groupLen => base => {
    const fn = (update=[], counter=1) => {
      if (counter === groupLen) {
        return update;
      }
      if (counter === 1) {
        const updateArray = base.flatMap( (x,i) => base.slice(i + 1).map(y => [x,y]));
        return fn(updateArray, counter + 1);
      }
        const updateArray = update.flatMap( x => 
          base.slice(base.indexOf(x[x.length - 1]) + 1).map(y => [...x,y]) );
        return fn(updateArray, counter + 1);
    };
    return fn(base);
  }
  
  export const pairs = findGroups(2);
  export const triples = findGroups(3);
  export const quads = findGroups(4);