
export function changeArr(arr, index, direction) {
  let item = arr[index]
  let firstPart
  let lastPart
  if (direction === 'up') {
    firstPart = arr.slice(0, index)
    lastPart = arr.slice(index)
    lastPart[0] = firstPart[firstPart.length - 1]
    firstPart[firstPart.length - 1] = item
  }
  else {
    firstPart = arr.slice(0, index + 1)
    lastPart = arr.slice(index + 1)
    firstPart[firstPart.length - 1] = lastPart[0]
    lastPart[0] = item
  }
  let newArr = firstPart.concat(lastPart)
  return newArr
}