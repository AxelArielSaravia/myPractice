
/**
 * @param  {...Set} sets 
 * @returns {Set}
 */
function union(...sets) {
  if (sets.length < 2) return;
  const unionSet = new Set();
  for (let i = 0; i < sets.length; i++) {
    sets[i].forEach(value => unionSet.add(value));
  }
  return unionSet;
}
/**
 * @param {Set} set1 
 * @param {Set} set2 
 * @returns {Set}
 */
const _union = (set1, set2) => new Set([...set1, ...set2]);

/**
 * @param  {...Set} sets 
 * @returns {Set}
 */
function intersection(...sets) {
  if (sets.length < 2) return;
  const intersectionSet = new Set();
  let smallerSet = sets[0];
  for (let set of sets) {
    if (set < smallerSet) smallerSet = set;
  }
  let setsArr  = sets.filter(s => s !== smallerSet);

  smallerSet.forEach(value => {
    let isIntersected = true; 
    for (let i = 1; i < setsArr.length && isIntersected; i++) {
      if (!setsArr[i].has(value)) isIntersected = false;
    }
    if (isIntersected) intersectionSet.add(value);
  });
  return intersectionSet;
}

const _intersection = (set1, set2) => new Set([...set1].filter(x => set2.has(x)));



/**
 * @param {Set} set1 
 * @param {Set} set2 
 * @returns {Set}
 */
function difference(set1, set2) {
  if (sets.length < 2) return;
  const differenceSet = new Set();
  set1.forEach(value => {
    if (!set2.has(value)) differenceSet.add(value);
  });
  return differenceSet;
}
const _difference = (set1, set2) => new Set([...set1].filter(x => !set2.has(x)));


function isSubsetOf(set, subset) {
  if (set.length < subset.length) return false;
  for (let value of subset) {
    if (!set.has(value)) return false;
  }
  return true;
}