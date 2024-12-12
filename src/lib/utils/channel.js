import { writable } from "svelte/store";
import { lock } from "./mutex";

const nullValue = { state: null, args: null };
const channels = {};

function createChannel(channelName) {
  if (!channels[channelName]) {
    channels[channelName] = writable(nullValue);
  }
}

export function pub(channelName, state, args = null) {
  lock("channel-" + channelName).then((unlock) => {
    createChannel(channelName);
    channels[channelName].set({ state, args });
    unlock();
  });
}

export function sub(channelName, triggerState, action) {
  createChannel(channelName);
  const runner = ({ state, args }) => {
    if (
      Array.isArray(triggerState)
        ? triggerState.includes(state)
        : state === triggerState
    ) {
      action(args);
    }
  };
  channels[channelName].subscribe(runner);
}

export function reset(channelName) {
  pub(channelName, nullValue.state, nullValue.args);
}
