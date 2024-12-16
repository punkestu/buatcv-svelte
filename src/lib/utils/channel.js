import { writable } from "svelte/store";
import { lock } from "./mutex";

const nullValue = { state: null, args: null };
const channels = {};
const once = {};

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

export function sub(channelName, triggerState, action, isonce = false) {
  if (Array.isArray(once[channelName]) && once[channelName].includes(triggerState)) {
    return;
  }
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
  const subscriber = channels[channelName].subscribe(runner);
  once[channelName] = isonce ? (once[channelName] || []).concat(triggerState) : null;

  return subscriber;
}

export function reset(channelName) {
  pub(channelName, nullValue.state, nullValue.args);
}
