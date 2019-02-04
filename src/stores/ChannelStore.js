import { values } from "mobx";
import {
  types,
  getParent,
  onPatch,
  applySnapshot,
  getSnapshot
} from "mobx-state-tree";

const Channel = types
  .model("Channel", {
    name: types.string,
    id: types.identifier,
    programs: types.optional(types.array(types.frozen()), [])
  })
  .views(self => ({
    get saved() {
      return (
        getParent(self, 2).savedChannels.findIndex(c => c === self.id) > -1
      );
    },
    get schedule() {
      const data = getParent(self, 2).schedules.get(self.id);
      return data ? values(data.programs) : [];
    }
  }));

const Schedule = types.model("Schedule", {
  channelId: types.identifier,
  programs: types.optional(types.array(types.frozen()), [])
});

export const ChannelStore = types
  .model("ChannelStore", {
    channels: types.map(Channel),
    savedChannels: types.optional(types.array(types.string), []),
    schedules: types.map(Schedule)
  })
  .views(self => ({
    get app() {
      return getParent(self);
    }
  }))
  .actions(self => ({
    afterCreate() {
      onPatch(self.savedChannels, patch => {
        patch.op === "add" && self.loadSchedule(patch.value);
        localStorage.setItem(
          "savedChannels",
          JSON.stringify(getSnapshot(self.savedChannels))
        );
      });
      try {
        const savedChannels = localStorage.getItem("savedChannels");
        if (savedChannels)
          applySnapshot(self.savedChannels, JSON.parse(savedChannels));
      } catch (e) {
        console.warn(e);
      }
    },
    loadChannels() {
      self.app.API.get("livechannels/?deviceType=WEB").then(res => {
        self.setChannels(res.data.liveChannels);
      });
    },
    loadSchedule(channelId) {
      self.app.API.get(
        `livechannels/${channelId}/epg?deviceType=WEB&fromTime=${Math.floor(
          Date.now() / 3600000
        ) * 3600000}&hoursForward=24`
      ).then(res => {
        const programs = res.data.liveChannels[0].programs.programs.map(p => ({
          id: p.id,
          name: p.name,
          startTime: p.startTime,
          endTime: p.endTime,
          description: p.longdescription
        }));

        self.setSchedule(channelId, programs);
      });
    },
    setSchedule(channelId, programs) {
      self.schedules.put({
        channelId: channelId,
        programs: programs
      });
    },
    setChannels(channelData) {
      channelData.map(c =>
        self.channels.put({
          name: c.name,
          id: `${c.id}`
        })
      );
    },
    saveChannel(channelId) {
      if (self.savedChannels.findIndex(c => c === channelId) > -1)
        throw Error("Can't save channel, channel already saved");

      self.savedChannels.push(channelId);
    },
    removeChannel(channelId) {
      const index = self.savedChannels.findIndex(c => c === channelId);
      if (index < 0) throw Error("Can't remove channel, channel not saved");
      self.savedChannels.splice(index, 1);
    }
  }));
