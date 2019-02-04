import React from "react";
import { observer, inject } from "mobx-react";
import { Scrollbars } from "react-custom-scrollbars";
import { Icon } from "../icon/Icon";
import "./SideBar.css";

let searchInput;

export const SideBar = inject("store")(
  observer(({ store }) => {
    return (
      <div className={"SideBar" + (store.showSidebar ? " expanded" : "")}>
        <div className="SideBar-toggle">
          <Icon name="search" />
          <input
            type="text"
            className="SideBar-search"
            ref={el => {
              searchInput = el;
            }}
            onBlur={() => {
              setTimeout(() => {
                document.activeElement !== searchInput &&
                  store.setSidebarVisibility(false);
              }, 100);
            }}
            onFocus={() => {
              store.setSidebarVisibility(true);
            }}
          />
        </div>

        {store.showSidebar && (
          <div className="SideBar-content">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              {store.channels
                .sort((a, b) => {
                  return ("" + a.name).localeCompare(b.name);
                })
                .map(c => (
                  <div
                    key={c.id}
                    className={
                      "SideBar-content-item" + (c.saved ? " saved-channel" : "")
                    }
                    onClick={() => {
                      searchInput.focus();
                      store.savedChannels.findIndex(sc => sc.id === c.id) < 0
                        ? store.saveChannel(c.id)
                        : store.removeChannel(c.id);
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
    );
  })
);
