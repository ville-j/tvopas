import React, { Component } from 'react'
import './App.css'
import Schedule from './components/Schedule'
import * as API from './ApiEndpoints'
import ToolBar from './components/ToolBar'
import ChannelPicker from './components/ChannelPicker'
import ProgramInfo from './components/ProgramInfo'

class App extends Component {
  constructor(props) {
    super(props)
    let userChannels = localStorage.getItem('userChannels')
    this.state = {
      channels: [],
      userChannels: userChannels != null ? JSON.parse(userChannels) : [],
      programId: 0
    }
    this.updateChannels()
  }

  displayProgramInfo = (programId, e) => {
    this.setState({
      programId: programId,
      attachProgramInfoElement: e.currentTarget
    })
  }

  render() {
    let i = 0
    return (
      <div className="App">
        <ProgramInfo programId={this.state.programId} attachElement={this.state.attachProgramInfoElement} />
        <div>
          {
            this.state.userChannels.map((channel) => {
              return [
                <Schedule displayProgramInfo={this.displayProgramInfo} key={channel} channel={channel} />,
                <div key={i++} className="selective-clear"></div>]
            })
          }
        </div>
        <ToolBar openChannelPicker={() => this.toggleChannelPicker()} />
        <ChannelPicker channels={this.state.channels} userChannels={this.state.userChannels} addRemoveChannel={(e) => this.addRemoveChannel(e)} ref={(cp) => { this.channelPicker = cp }} />

        {
          this.state.userChannels.length < 1 &&
          (<div className="start-notification"><div className="tail"></div>Start by picking your channels here</div>)
        }
      </div>
    )
  }

  addRemoveChannel(channel) {
    this.setState((prevState, props) => {
      let userChannels = prevState.userChannels
      const index = userChannels.indexOf(channel)

      if (index < 0)
        userChannels.push(channel)
      else
        userChannels.splice(index, 1)

      localStorage.setItem('userChannels', JSON.stringify(userChannels))
      return { userChannels: userChannels }
    })
  }

  toggleChannelPicker() {
    this.channelPicker.toggle()
  }

  async updateChannels() {
    const data = await (await fetch(API.channels)).json()
    this.setState({
      channels: data.channels
    })
  }
}

export default App
