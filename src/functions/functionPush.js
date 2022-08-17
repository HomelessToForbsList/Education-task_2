
export function push(obj, coordinates, str) {
  let i = 0;
  (function r(obj, i) {
    if (i === coordinates.length - 1) {
      obj[coordinates[i]].subNotes.push({id:Date.now(), text: str, subNotes: [] })
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}