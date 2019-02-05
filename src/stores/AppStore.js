import { values } from "mobx";
import { types, getEnv } from "mobx-state-tree";
import { ChannelStore } from "./ChannelStore";

const UIStore = types
  .model("UIStore", {
    expandedProgram: types.maybeNull(types.number, null),
    showSidebar: types.optional(types.boolean, false)
  })
  .actions(self => ({
    expandProgram(programId) {
      self.expandedProgram = programId;
    },
    setSidebarVisibility(visible) {
      self.showSidebar = visible;
    }
  }));

export const AppStore = types
  .model("AppStore", {
    channelStore: types.optional(ChannelStore, { channels: {} }),
    uiStore: types.optional(UIStore, {}),
    now: types.optional(types.number, Date.now())
  })
  .views(self => ({
    get API() {
      return getEnv(self).API;
    },
    get channels() {
      return values(self.channelStore.channels);
    },
    get savedChannels() {
      return values(self.channelStore.channels).filter(
        c => self.channelStore.savedChannels.findIndex(ci => ci === c.id) > -1
      );
    },
    get expandedProgram() {
      return self.uiStore.expandedProgram;
    },
    get showSidebar() {
      return self.uiStore.showSidebar;
    }
  }))
  .actions(self => {
    let interval = null;
    return {
      afterCreate() {
        self.channelStore.loadChannels();
        interval = setInterval(() => {
          self.updateNow(Date.now());
        }, 5000);
      },
      beforeDestroy() {
        clearInterval(interval);
      },
      saveChannel(channelId) {
        self.channelStore.saveChannel(channelId);
      },
      removeChannel(channelId) {
        self.channelStore.removeChannel(channelId);
      },
      expandProgram(programId) {
        self.uiStore.expandProgram(programId);
      },
      setSidebarVisibility(visible) {
        return self.uiStore.setSidebarVisibility(visible);
      },
      updateNow(time) {
        self.now = time;
      }
    };
  });
