
export function push(obj, coordinates, str) {
  let i = 0;
  let unique = true;
  (function r(obj, i) {
    if (i === coordinates.length - 1) {
      obj[coordinates[i]].subNotes.forEach(el => {
        if (el.text === str) unique = false
      })
      if (unique) obj[coordinates[i]].subNotes.push({id:Date.now(), text: str, subNotes: [] })
      else alert('такая заметка уже существует!')
    }
    else { r(obj[coordinates[i]].subNotes, i + 1) }
  })(obj, i)
  return obj
}