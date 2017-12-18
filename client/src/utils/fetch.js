const CACHE = {}

export const fetchJson = url => {
  if (!CACHE[url]) {
    CACHE[url] = fetch(url).then(response => response.json())
  }
  return CACHE[url]
}

export const post = (url, data) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data,
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw Error(response.statusText)
    }
  })
