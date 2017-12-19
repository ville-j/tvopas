import React, { Component } from "react"
import "./ToolBar.css"

class ToolBar extends Component {
  render() {
    return (
      <div className="ToolBar">
        <a href="" title="Pick channels" onClick={(e) => this.openChannelPicker(e)}><i className="fas fa-list-alt fa-2x"></i></a>
        <a href="https://github.com/ville-j/tvopas" title="Fork me on GitHub" target="_blank"><i className="fab fa-github fa-2x"></i></a>
      </div>
    )
  }
  openChannelPicker(e) {
    e.preventDefault()
    this.props.openChannelPicker()
  }
}

export default ToolBar
