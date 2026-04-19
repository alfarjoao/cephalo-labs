import { useEffect } from 'react'

export function useMeta(title, description) {
  useEffect(() => {
    document.title = title
    let el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', description)
  }, [title, description])
}
