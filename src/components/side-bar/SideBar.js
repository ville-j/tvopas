import React from 'react'
import { observer, inject } from 'mobx-react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Icon } from '../icon/Icon'
import './SideBar.css'

export const SideBar = inject('store')(
  observer(({ store }) => {
    return (
      <div className={'SideBar' + (store.showSidebar ? ' expanded' : '')}>
        <div className="SideBar-toggle">
          {!store.showSidebar && <Icon name="search" />}
          <input
            type="text"
            className="SideBar-search"
            placeholder="Search channel"
            value={store.channelFilter}
            onFocus={() => {
              store.setSidebarVisibility(true)
            }}
            onChange={e => {
              store.setChannelFilter(e.target.value)
            }}
          />
          {store.showSidebar && (
            <span
              onClick={() => {
                store.setSidebarVisibility(false)
                store.setChannelFilter('')
              }}
            >
              <Icon name="x" />
            </span>
          )}
        </div>

        {store.showSidebar && (
          <div className="SideBar-content">
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              {store.channels
                .filter(c =>
                  c.name
                    .toLowerCase()
                    .includes(store.channelFilter.toLowerCase())
                )
                .sort((a, b) => {
                  return ('' + a.name).localeCompare(b.name)
                })
                .map(c => (
                  <div
                    key={c.id}
                    className={
                      'SideBar-content-item' + (c.saved ? ' saved-channel' : '')
                    }
                    onClick={() => {
                      store.savedChannels.findIndex(sc => sc.id === c.id) < 0
                        ? store.saveChannel(c.id)
                        : store.removeChannel(c.id)
                    }}
                  >
                    <Icon name="heart" />
                    {c.name}
                  </div>
                ))}
            </Scrollbars>
          </div>
        )}
      </div>
    )
  })
)
