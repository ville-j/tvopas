import React, { Component } from "react"
import "./ProgressBar.css"
import Moment from "moment"

class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: this.getProgress()
    }
  }
  render() {
    const style = {
      width: this.state.progress + "%"
    }
    return (
      <div className="ProgressBar">
        <div className="bar">
          <div className="progress" style={style} />
        </div>
      </div>
    )
  }
  getProgress() {
    const now = Moment()
    return (
      (now - this.props.startTime) / (this.props.endTime - this.props.startTime) * 100
    )
  }
  tick() {
    const progress = this.getProgress()
    if (progress > 100) {
      this.props.updateData()
    }
    this.setState({
      progress: progress
    })
  }
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
}

export default ProgressBar
