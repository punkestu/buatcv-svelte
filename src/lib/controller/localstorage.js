import { pub, sub } from "../utils/channel";
import { getSeq, pushSeq, remove, store } from "../utils/localstorage";

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
    const newSectionID = pushSeq("sections", sectionName);
    pub("section-list", "set:new-section-id", newSectionID);
    pub("localstorage", "update:sections", getSeq("sections", true));
  });
  sub("localstorage", "remove:section", (sectionID) => {
    remove(sectionID);
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
};
