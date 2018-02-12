import React, { Component } from 'react'
import './ProgramInfo.css'
import * as API from '../ApiEndpoints'

class ProgramInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "Loading..",
      bounds: null
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: "Loading..",
      bounds: {
        top: (nextProps.attachElement && nextProps.attachElement.offsetTop + 17) || 0,
        left: (nextProps.attachElement && nextProps.attachElement.offsetLeft) || 0,
        width: (nextProps.attachElement && nextProps.attachElement.offsetWidth - 15) || 0
      }
    })
    this.loadProgramInfo(nextProps.programId)
  }
  componentWillMount() {
    window.addEventListener("resize", this.rebound)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.rebound)
  }
  rebound = () => {
    this.setState({
      bounds: {
        top: (this.props.attachElement && this.props.attachElement.offsetTop + 17) || 0,
        left: (this.props.attachElement && this.props.attachElement.offsetLeft) || 0,
        width: (this.props.attachElement && this.props.attachElement.offsetWidth - 15) || 0
      }
    })
  }
  async loadProgramInfo(id) {
    try {
      const data = await (await fetch(API.programInfo + id)).json()

      this.setState({
        text: decodeURIComponent(data.description) || "n/a"
      })
    } catch (e) {

    }
  }
  render() {
    if (!this.props.attachElement)
      return null
    return (
      <div className="ProgramInfo" style={{
        top: this.state.bounds.top,
        left: this.state.bounds.left,
        width: this.state.bounds.width
      }}>
        <span>{this.state.text}</span>
      </div>
    )
  }
}

export default ProgramInfo