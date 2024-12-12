<script>
  import BioModal from "../modal/Bio.svelte";
  import BioStructure from "../component/BioStructure.svelte";
  import { pub, sub } from "../utils/channel";
  import { onMount } from "svelte";
  import { get, store } from "../utils/localstorage";
  import SectionModal from "../modal/Section.svelte";
  import HeaderStructure from "../component/HeaderStructure.svelte";

  onMount(() => {
    const bio = get("bio");
    pub("modal", "set:bio-modal", bio);
    pub("component", "set:bio-component", bio);

    sub("modal", "save:bio-modal", (args) => {
      const bio = args;
      store("bio", bio);
      pub("component", "set:bio-component", bio);
    });
  });

  function openSectionModal() {
    pub("modal", "open:section-modal");
  }
</script>

<BioModal />
<SectionModal />

<HeaderStructure />
<section id="list" class="p-4 h-full overflow-y-auto">
  <BioStructure />
  <div id="sections" class="mt-2"></div>
  <button
    aria-label="AddSection"
    class="w-full py-2 border-2 border-black mt-2 bg-gray-300"
    on:click={openSectionModal}
  >
    + Add section
  </button>
</section>
