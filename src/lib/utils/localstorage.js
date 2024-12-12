export function store(name, value) {
  const ty = typeof value;
  if (ty === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(name, ty + "|" + value);
}

export function pushSeq(name, value) {
  const seq = get("seq:" + name);
  if (!seq) {
    store(name + ":0", value);
    store("seq:" + name, [name + ":0"]);
  }

  const [last] = seq.slice(-1);
  const [prefix, num] = last.split(":");
  const next = prefix + ":" + (parseInt(num) + 1);
  store(next, value);
}

export function get(name) {
  const item = localStorage.getItem(name);
  if (!item) {
    return null;
  }
  const [ty, ...value] = item.split("|");
  if (ty === "object") {
    return JSON.parse(value.join("|"));
  }
  return value.join("|");
}

export function getSeq(name) {
  const seq = get("seq:" + name);
  if (!seq) {
    return [];
  }
  return seq
    .map((name) => {
      const value = get(name);
      if (!value) {
        store(
          "seq:" + name,
          seq.filter((a) => a !== name)
        );
      }
      return value;
    })
    .filter((value) => value);
}
