const mutexes = {};

export async function lock(code) {
  if (!mutexes[code]) {
    mutexes[code] = {
      queue: [],
      locked: false,
    };
  }
  return await new Promise((resolve) => {
    mutexes[code].queue.push(resolve);
    if (!mutexes[code].locked) {
      mutexes[code].locked = true;
      if (mutexes[code].queue[0]) {
        mutexes[code].queue.shift()();
      }
    }
  }).then(() => {
    return unlock(code);
  });
}

function unlock(code) {
  return function () {
    if (mutexes[code].queue[0]) {
      mutexes[code].queue.shift()();
    }
    mutexes[code].locked = false;
  }
}
