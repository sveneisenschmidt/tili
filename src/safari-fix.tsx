/**
 * Prevents double-tap zooming on Safari by adding a touchstart event listener to the document body.
 * The event listener uses a timeout to distinguish between single and double taps.
 *
 * @remarks
 * This function is specifically designed to address the double-tap zoom issue on Safari browsers.
 *
 * @author https://discourse.threejs.org/u/aolagers
 *
 * @example
 * ```typescript
 * safariFix();
 * ```
 */
export function safariFix(): void {
  function createDoubleTapPreventer(timeout: number) {
    let timer: any = 0
    let status = false

    return function (e: TouchEvent) {
      if (timer) clearTimeout(timer)
      if (status) {
        e.preventDefault()
        status = false
      } else {
        status = true
        timer = setTimeout(() => {
          status = false
        }, timeout)
      }
    }
  }

  document.body.addEventListener('touchstart', createDoubleTapPreventer(500), { passive: false })
}
