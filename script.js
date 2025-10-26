function deepEquals(a, b) {
  // Case 1: If both are strictly equal (covers primitives and same reference objects)
  if (a === b) {
    // Handles everything except NaN (since NaN !== NaN)
    return true;
  }

  // Case 2: Handle NaN equality (NaN === NaN should be true)
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // Case 3: Handle null and undefined explicitly
  if (a === null || b === null || a === undefined || b === undefined) {
    return a === b;
  }

  // Case 4: If types are different
  if (typeof a !== typeof b) {
    return false;
  }

  // Case 5: If both are arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // Case 6: If one is array and other is not
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  // Case 7: If both are objects
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!b.hasOwnProperty(key) || !deepEquals(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  // Fallback for any unmatched cases
  return false;
}

module.exports = deepEquals;
