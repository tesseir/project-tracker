// Function to change key name in array of objects

function changeKeyName(arr, oldKey, newKey) {
  arr.forEach((obj) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  });
  return arr;
}
