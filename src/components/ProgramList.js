import React, { Component } from "react"
import "./ProgramList.css"
import Moment from "moment"
import * as Constants from "../Constants"
import ProgressBar from "./ProgressBar"

class ProgramList extends Component {
  render() {
    const now = Moment()
    const schedule = this.props.data.filter(item => {
      return Moment(item.end_time, Constants.timeformat) > now
    })

    if (this.props.showMax) schedule.splice(this.props.showMax)

    return (
      <div className="ProgramList">
        <ol>
          {schedule.map(item => {
            const startTime = Moment(item.start_time, Constants.timeformat)
            const endTime = Moment(item.end_time, Constants.timeformat)

            return (
              <li key={item.id}>
                <div className="program-title-row">
                  <a role="button" tabIndex="0" onClick={(e) => this.props.displayProgramInfo(item.id, e)} onKeyUp={(e) => this.props.displayProgramInfo(item.id, e)}>
                    <time>{item.simple_start_time}</time>
                    {decodeURIComponent(item.name)}
                  </a>
                </div>
                {now >= startTime &&
                  now < endTime && (
                    <ProgressBar
                      updateData={() => this.updateData()}
                      startTime={startTime}
                      endTime={endTime}
                    />
                  )}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  updateData() {
    this.props.updateData()
  }
}

export default ProgramList
