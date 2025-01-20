import { pub, sub } from "../utils/channel";
import {
  get,
  getSeq,
  pushSeq,
  remove,
  removeSeq,
  store,
} from "../utils/localstorage";

export default () => {
  sub("localstorage", "set:used-sections", (sections) => {
    store("used-sections", sections);
    pub("localstorage", "update:used-sections", sections);
  });
  sub("localstorage", "set:bio", (bio) => {
    store("bio", bio);
    pub("localstorage", "update:bio", bio);
  });
  sub("localstorage", "push:sections", (sectionName) => {
    pushSeq("sections", sectionName);
    pub("localstorage", "update:sections", getSeq("sections", true));
  });
  sub("localstorage", "remove:section", (sectionID) => {
    remove(sectionID);
    pub("localstorage", "remove:used-sections", sectionID);
    pub("localstorage", "update:sections", getSeq("sections", true));
  });
  sub("localstorage", "push:items", (item) => {
    pushSeq("items", item);
    pub("localstorage", "update:items", getSeq("items", true));
  });
  sub("localstorage", "remove:item", (itemID) => {
    remove(itemID);
    pub("localstorage", "update:items", getSeq("items", true));
  });
  sub("localstorage", "push:used-items", ({ itemID, sectionID }) => {
    pushSeq("used-items:" + sectionID, itemID);
    pub(
      "localstorage",
      "update:used-items:" + sectionID,
      getSeq("used-items:" + sectionID, true)
    );
  });
  sub("localstorage", "remove:used-items", ({ itemID, sectionID }) => {
    remove(itemID);
    pub(
      "localstorage",
      "update:used-items:" + sectionID,
      getSeq("used-items:" + sectionID, true)
    );
  });
  sub("localstorage", "set:hidden-items", (hiddenItems) => {
    store("hidden-items", hiddenItems);
    pub("localstorage", "update:hidden-items", hiddenItems);
  });
  sub("localstorage", "push:used-sections", (sectionID) => {
    const sections = get("used-sections") || [];
    sections.push(sectionID)
    store("used-sections", sections);
    pub("localstorage", "update:used-sections", sections);
  });
  sub("localstorage", "remove:used-sections", (sectionID) => {
    removeSeq("used-items:" + sectionID);
    const sec = get("used-sections") || [];
    store(
      "used-sections",
      sec.filter((address) => address != sectionID)
    );
    pub("localstorage", "update:used-sections", get("used-sections"));
  });
  sub("localstorage", "push:skills", (skill) => {
    pushSeq("skills", skill);
    pub("localstorage", "update:skills", getSeq("skills", true));
  });
  sub("localstorage", "remove:skill", (skillID) => {
    remove(skillID);
    pub("localstorage", "update:skills", getSeq("skills", true));
  });
};
