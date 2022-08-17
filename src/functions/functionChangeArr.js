
export function changeArr(arr, index, direction) {
  //debugger
  let item = arr[index]
  item.id = Date.now()
  //let firstPart
  //let lastPart
  let temp
  if (direction === 'up') {
    // firstPart = arr.slice(0, index)
    // lastPart = arr.slice(index)
    // lastPart[0] = firstPart[firstPart.length - 1]
    // firstPart[firstPart.length - 1].id = Date.now()
    // firstPart[firstPart.length - 1] = item
    temp = arr[index - 1]
    temp.id = Date.now() - 1
    arr[index - 1] = item
    arr[index] = temp
  }
  else {
    // firstPart = arr.slice(0, index + 1)
    // lastPart = arr.slice(index + 1)
    // firstPart[firstPart.length - 1] = lastPart[0]
    // firstPart[firstPart.length - 1].id = Date.now()
    // lastPart[0] = item
    temp = arr[index + 1]
    temp.id = Date.now() + 1
    arr[index + 1] = item
    arr[index] = temp
  }
  // let newArr = firstPart.concat(lastPart)
  // return newArr
  return arr
}