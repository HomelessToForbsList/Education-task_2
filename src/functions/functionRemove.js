export function remove(obj, coordinates, str) {
  let i = 0;
  (function r(obj, i) {
    if (i === coordinates.length - 2) {
      obj[coordinates[i]].subNotes = obj[coordinates[i]].subNotes.filter(el => el.text !== str)
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}