

export function replaceElem(array, index, value) {
   return [
      ...array.slice(0, index),
      value,
      ...array.slice(index + 1)
   ]
}