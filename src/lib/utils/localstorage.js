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
    return name + ":0";
  }

  const [last] = seq.slice(-1);
  const splits = last.split(":");
  const num = splits.pop();
  const prefix = splits.join(":");
  const next = prefix + ":" + (parseInt(num) + 1);
  store(next, value);
  store("seq:" + name, seq.filter((address) => get(address)).concat(next));

  return next;
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

export function getSeq(name, withAddress = false) {
  const seq = get("seq:" + name);
  if (!seq) {
    return [];
  }
  return seq
    .map((address) => (withAddress ? [address, get(address)] : get(address)))
    .filter((value) => (withAddress ? value[1] : value));
}

export function remove(name) {
  localStorage.removeItem(name);
}
