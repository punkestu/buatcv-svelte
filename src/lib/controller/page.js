import { navigate } from "svelte-routing";
import { sub } from "../utils/channel";

const base = import.meta.env.VITE_BASE;

export default () => {
  sub("page", "open:structure", () => navigate(base + "/structure"));
  sub("page", "open:bio-input", () => navigate(base + "/bio/input"));
  sub("page", "open:section-input", () => navigate(base + "/section/input"));
  sub("page", "open:item-input", (sectionID) =>
    navigate(base + "/item/input/" + sectionID)
  );
  sub("page", "open:preview", () => navigate(base + "/preview"));
};
