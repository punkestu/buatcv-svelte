<script>
  import { pub } from "../utils/channel";
  import { get, getSeq } from "../utils/localstorage";
  import ItemList from "./ItemList.svelte";

  export let sectionID;
  export let deleteSection;

  function openItemInput() {
    pub("page", "open:item-input", sectionID);
  }
</script>

<div class="p-2 border">
  <div class="flex justify-between items-center mb-2">
    <span>{get(sectionID)}</span>
    <button
      aria-label="RemoveSection"
      class="text-red-500"
      on:click={deleteSection.bind(this, sectionID)}
    >
      x
    </button>
  </div>
  <ItemList {sectionID} />
  <button
    aria-label="AddItem"
    class="w-full py-2 border-2 border-black mt-2 bg-gray-300"
    on:click={openItemInput}
  >
    + Add item
  </button>
</div>
