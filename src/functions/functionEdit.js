
export function edit(obj, coordinates, str, newNote) {
  let i = 0;
  (function r(obj, i) {
    if (i === coordinates.length - 2) {
      const index = obj[coordinates[i]].subNotes.findIndex(el => el.text === str)
      obj[coordinates[i]].subNotes[index].text = newNote
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}