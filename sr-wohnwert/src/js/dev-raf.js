/**
 * Nur Entwicklung (wird im Build entfernt):
 * Läuft die Seite in einem verdeckten Browser-Tab, pausiert der Browser requestAnimationFrame –
 * Animationen bleiben dann stehen. Dieser Ersatz hält sie für Tests am Laufen.
 */
if (import.meta.env.DEV) {
  const native = window.requestAnimationFrame.bind(window)
  const nativeCancel = window.cancelAnimationFrame.bind(window)
  const queue = new Map()
  let id = 0
  let last = 0
  let pumping = false
  const channel = new MessageChannel()

  const pump = () => {
    const now = performance.now()
    if (now - last >= 16) {
      last = now
      const jobs = [...queue.entries()]
      queue.clear()
      jobs.forEach(([, cb]) => cb(now))
    }
    if (queue.size) channel.port2.postMessage(0)
    else pumping = false
  }
  channel.port1.onmessage = pump

  window.requestAnimationFrame = (cb) => {
    if (!document.hidden) return native(cb)
    const handle = `h${++id}`
    queue.set(handle, cb)
    if (!pumping) {
      pumping = true
      channel.port2.postMessage(0)
    }
    return handle
  }
  window.cancelAnimationFrame = (handle) => {
    if (typeof handle === 'string') queue.delete(handle)
    else nativeCancel(handle)
  }
}
