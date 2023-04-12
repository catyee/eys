export const markText = {
  handleMove (e) {
    const x = e.clientX
    const y = e.clientY

    let offsetNode
    let offset

    const sel = window.getSelection()
    sel.removeAllRanges()

    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y)
      if (!pos) { return }
      offsetNode = pos.offsetNode
      offset = pos.offset
    } else if (document.caretRangeFromPoint) {
      const pos = document.caretRangeFromPoint(x, y)
      if (!pos) { return }
      offsetNode = pos.startContainer
      offset = pos.startOffset
    } else {
      return
    }

    if (offsetNode.nodeType === Node.TEXT_NODE) {
      const textNode = offsetNode
      const content = textNode.data
      const head = (content.slice(0, offset) || [''])[0]
      // const head = (content.slice(0, offset).match(/[-_a-z]+$/i) || [''])[0]
      const tail = (content.slice(offset) || [''])[0]
      // const tail = (content.slice(offset).match(/^([-_a-z]+|[\u4e00-\u9fa5])/i) || [''])[0]
      if (head.length <= 0 && tail.length <= 0) {
        return
      }

      const range = document.createRange()
      range.setStart(textNode, offset - head.length)
      range.setEnd(textNode, offset + tail.length)
      const rangeRect = range.getBoundingClientRect()

      if (rangeRect.left <= x &&
          rangeRect.right >= x &&
          rangeRect.top <= y &&
          rangeRect.bottom >= y
      ) {
        sel.addRange(range)
        // this.highlighter.fromRange(sel.getRangeAt(0))
      }

      range.detach()
    }
  }
}
