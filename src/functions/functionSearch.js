
export function search(arr, id) {
  let log = []
  let find = false;
  (function x(arr) {
    arr.forEach(el => {
      if (!find) log.push(arr.indexOf(el))
      if (el.text === id && !find) { find = true }
      else if (el.subNotes.length) { x(el.subNotes) }
      if (!find) log.pop()
    });
  })(arr, id)
  return log
}