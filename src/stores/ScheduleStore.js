import { types } from "mobx-state-tree";

const Program = types.model("Program", {
  id: types.string,
  name: types.string,
  startTime: types.integer,
  endTime: types.integer,
  longDescription: types.string
});

export const ScheduleStore = types.model("ScheduleStore", {
  programs: types.map(Program)
});
