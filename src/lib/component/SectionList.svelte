<script>
  import { onMount } from "svelte";
  import { pub, reset, sub } from "../utils/channel";
  import { get } from "../utils/localstorage";
  import SectionItem from "./SectionItem.svelte";

  let usedSections;

  onMount(() => {
    usedSections = get("used-sections");
    sub("section-list", "set:new-section-id", (newSectionID) => {
      usedSections = usedSections
        ? [...usedSections, newSectionID]
        : [newSectionID];
      pub("localstorage", "set:used-sections", usedSections);
      reset("section-list");
    });
    sub("section-list", "destroy:section", (sectionID) => {
      deleteSection(sectionID);
      reset("section-list");
    });
  });

  function openSectionInput() {
    pub("page", "open:section-input");
  }

  function deleteSection(sectionID) {
    usedSections = usedSections.filter((id) => id !== sectionID);
    pub("localstorage", "set:used-sections", usedSections);
  }
</script>

<div id="sections" class="mt-2 flex flex-col gap-2">
  {#if usedSections}
    {#each usedSections as sectionID}
      <SectionItem {sectionID} {deleteSection} />
    {/each}
  {/if}
</div>
<button
  aria-label="AddSection"
  class="w-full py-2 border-2 border-black mt-2 bg-gray-300"
  on:click={openSectionInput}
>
  + Add section
</button>
