import { changeArr } from "./functionChangeArr";

export function move(obj, coordinates, direction) {
  let i = 0;
  (function r(obj, i) {
    if (i === coordinates.length - 2) {
      obj[coordinates[i]].subNotes = changeArr(obj[coordinates[i]].subNotes, coordinates[coordinates.length - 1], direction)
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}