export function remove(obj, coordinates, id) {
  let i = 0;
  (function r(obj, i) {
    if (i === coordinates.length - 2) {
      obj[coordinates[i]].subNotes = obj[coordinates[i]].subNotes.filter(el => el.id !== id)
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}