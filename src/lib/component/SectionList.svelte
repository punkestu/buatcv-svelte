<script>
  import { onMount } from "svelte";
  import { pub, sub } from "../utils/channel";
  import { get } from "../utils/localstorage";
  import SectionItem from "./SectionItem.svelte";

  let usedSections;

  onMount(() => {
    usedSections = get("used-sections");
    sub("localstorage", "update:used-sections", (newUsedSections) => {
      usedSections = newUsedSections;
    })
  });

  function openSectionInput() {
    pub("page", "open:section-input");
  }

  function deleteSection(sectionID) {
    usedSections = usedSections.filter((id) => id !== sectionID);
    pub("feature", "unuse:section", sectionID);
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
