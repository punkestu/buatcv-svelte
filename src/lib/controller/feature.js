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
    pub("section-input", "destroy:section", sectionID);
    pub("section-list", "destroy:section", sectionID);
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
};
