import React, { Component } from "react"
import "./ChannelPicker.css"

class ChannelPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  render() {
    if (!this.state.visible)
      return null
    return (
      <div className="ChannelPicker">
        <div className="channel-list">
          {
            this.props.channels.map((channel) => {
              const cssClass = "channel" + (this.props.userChannels.indexOf(channel) > -1 ? " active" : "")
              return <button key={ channel } onClick={ (e) => this.addRemoveChannel(channel, e) } onKeyPress={ (e) => this.addRemoveChannel(channel, e) } className={ cssClass }><i className="fas fa-check"></i> { channel }</button>
            })
          }
        </div>
      </div>
    )
  }
  addRemoveChannel(channel) {
    this.props.addRemoveChannel(channel)
  }
  open() {
    this.setState({
      visible: true
    })
  }
  close() {
    this.setState({
      visible: false
    })
  }
  toggle() {
    this.setState((prevState, props) => {
      return { visible: !prevState.visible }
    })
  }
}

export default ChannelPicker
