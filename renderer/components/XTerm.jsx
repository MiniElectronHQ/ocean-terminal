import * as React from 'react'
import { Terminal } from 'xterm'

export default class Xterm extends React.Component {
  constructor(props) {
    super(props)

    React.RefObject = React.createRef()

    this.onData = this.onData.bind(this)
    this.onCursorMove = this.onCursorMove.bind(this)
    this.onKey = this.onKey.bind(this)
    this.onBinary = this.onBinary.bind(this)
    this.onLineFeed = this.onLineFeed.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onRender = this.onRender.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)

    this.setupTerminal()
  }

  setupTerminal() {
    this.terminal = new Terminal(this.props.options)

    if (this.props.addons) {
      this.props.addons.forEach((addon) => {
        this.terminal.loadAddon(addon)
      })
    }

    this.terminal.onBinary(this.onBinary)
    this.terminal.onCursorMove(this.onCursorMove)
    this.terminal.onData(this.onData)
    this.terminal.onKey(this.onKey)
    this.terminal.onLineFeed(this.onLineFeed)
    this.terminal.onScroll(this.onScroll)
    this.terminal.onSelectionChange(this.onSelectionChange)
    this.terminal.onRender(this.onRender)
    this.terminal.onResize(this.onResize)
    this.terminal.onTitleChange(this.onTitleChange)

    if (this.props.customKeyEventHandler) {
      this.terminal.attachCustomKeyEventHandler(
        this.props.customKeyEventHandler
      )
    }
  }

  componentDidMount() {
    if (React.RefObject.current) {
      this.terminal.open(React.RefObject.current)
    }
  }

  componentWillUnmount() {
    this.terminal.dispose()
  }

  onBinary(data) {
    if (this.props.onBinary) this.props.onBinary(data)
  }

  onCursorMove() {
    if (this.props.onCursorMove) this.props.onCursorMove()
  }

  onData(data) {
    if (this.props.onData) this.props.onData(data)
  }

  onKey(key, domEvent) {
    if (this.props.onKey) this.props.onKey(event)
  }

  onLineFeed() {
    if (this.props.onLineFeed) this.props.onLineFeed()
  }

  onScroll(newPosition) {
    if (this.props.onScroll) this.props.onScroll(newPosition)
  }

  onSelectionChange() {
    if (this.props.onSelectionChange) this.props.onSelectionChange()
  }

  onRender(start, end) {
    if (this.props.onRender) this.props.onRender(event)
  }

  onResize(cols, rows) {
    if (this.props.onResize) this.props.onResize(event)
  }

  onTitleChange(newTitle) {
    if (this.props.onTitleChange) this.props.onTitleChange(newTitle)
  }

  render() {
    return <div className={this.props.className} ref={React.RefObject} />
  }
}
