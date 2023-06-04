import { RefObject, useEffect } from "react"

type useIntersectionProps = {
  ref: RefObject<HTMLDivElement>
  callback: () => void
  options?: IntersectionObserverInit
}

function useIntersection({ ref, callback, options }: useIntersectionProps) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    }, options)
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref, callback, options])
}

export default useIntersection
