import { pub, sub } from "../utils/channel";

export default () => {
  sub("feature", "store:bio", (bio) => {
    pub("localstorage", "set:bio", bio);
    pub("bio-structure", "set:bio", bio);
  });
  sub("feature", "store:section", (sectionName) => {
    pub("localstorage", "push:sections", sectionName);
  });
  sub("feature", "destroy:section", (sectionID) => {
    pub("localstorage", "remove:section", sectionID);
  });
  sub("feature", "store:item", (item) => {
    pub("localstorage", "push:items", item);
  });
  sub("feature", "destroy:item", (itemID) => {
    pub("localstorage", "remove:item", itemID);
  });
  sub("feature", "use:item", ({ itemID, sectionID }) => {
    pub("localstorage", "push:used-items", { itemID, sectionID });
  });
  sub("feature", "unuse:item", ({ itemID, sectionID }) => {
    pub("localstorage", "remove:used-items", { itemID, sectionID });
  });
  sub("feature", "set:hidden-items", (hiddenItems) => {
    pub("localstorage", "set:hidden-items", hiddenItems);
  });
  sub("feature", "use:section", (sectionID) => {
    pub("localstorage", "push:used-sections", sectionID);
  });
  sub("feature", "unuse:section", (sectionID) => {
    pub("localstorage", "remove:used-sections", sectionID);
  });
  sub("feature", "store:skill", (skill) => {
    pub("localstorage", "push:skills", skill);
  });
  sub("feature", "destroy:skill", (skillID) => {
    pub("localstorage", "remove:skill", skillID);
  });
  sub("feature", "store:links", (links) => {
    pub("localstorage", "set:links", links);
  });
};
