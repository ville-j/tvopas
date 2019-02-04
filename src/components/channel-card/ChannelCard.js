import React from "react";
import { observer, inject } from "mobx-react";
import moment from "moment";
import "./ChannelCard.css";

const ChannelCard = observer(props => {
  return (
    <div className="ChannelCard">
      <h4>{props.data.name}</h4>
      {props.data.schedule.slice(0, 15).map((p, i) => (
        <div className="ChannelCard-program" key={p.id}>
          <div
            className={
              "ChannelCard-program-title" +
              (props.store.expandedProgram === p.id ? " expanded" : "")
            }
            onClick={() => {
              props.store.expandProgram(
                props.store.expandedProgram === p.id ? null : p.id
              );
            }}
          >
            <time dateTime={moment(p.startTime).format()}>
              {moment(p.startTime).format("HH:mm")}
            </time>
            <div>{p.name}</div>
          </div>
          {props.store.expandedProgram === p.id && (
            <div className="ChannelCard-program-description">
              {p.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default inject("store")(ChannelCard);
