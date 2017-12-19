import React, { Component } from 'react'
import './Schedule.css'
import ProgramList from './ProgramList'
import * as API from '../ApiEndpoints'

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedule: []
    }
    this.updateSchedule()
  }
  render() {
    return (
      <div className="Schedule">
        <h3>{this.props.channel}</h3>
        <ProgramList data={this.state.schedule} showMax={10} updateData={() => this.updateSchedule()} />
      </div>
    )
  }

  async updateSchedule() {
    const data = await (await fetch(API.schedule + this.props.channel)).json()
    this.setState({
      schedule: data.programs
    })
  }
}

export default Schedule