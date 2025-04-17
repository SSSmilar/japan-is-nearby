import { useEffect, useState } from "react"

/**
 * Hook для определения, является ли текущее устройство мобильным
 * @param breakpoint - Ширина экрана, при которой устройство считается мобильным (по умолчанию 768px)
 * @returns boolean - true, если устройство мобильное, false в противном случае
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", handleResize)

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakpoint])

  return isMobile
}
