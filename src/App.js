import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { TopBar } from './components/top-bar/TopBar'
import ChannelCard from './components/channel-card/ChannelCard'
import { Layout } from './components/layout/Layout'
import './App.css'

class App extends Component {
  render() {
    const { savedChannels } = this.props.store
    return (
      <div className="App">
        <TopBar />
        <Layout>
          {savedChannels
            .sort((a, b) => {
              return ('' + a.name).localeCompare(b.name)
            })
            .map(c => {
              return <ChannelCard key={c.id} data={c} />
            })}
        </Layout>
      </div>
    )
  }
}

export default inject('store')(observer(App))
