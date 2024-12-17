<script>
  import { onMount } from "svelte";
  import { pub, reset, sub } from "../utils/channel";
  import { getSeq } from "../utils/localstorage";

  let newSectionName = "";
  let isNew = false;
  let sections = [];

  onMount(() => {
    sections = getSeq("sections", true);
  });

  sub("localstorage", "update:sections", (newSections) => {
    sections = newSections;
  });

  function create() {
    pub("feature", "store:section", newSectionName);
    isNew = false;
  }

  function use(sectionID) {
    return () => {
      pub("feature", "use:section", sectionID);
      pub("page", "open:structure");
    };
  }

  function destroy(sectionID) {
    return () => {
      pub("feature", "destroy:section", sectionID);
    };
  }

  function back() {
    pub("page", "open:structure");
  }
</script>

<header class="px-4 pt-4 sticky top-0 bg-white">
  <div class="flex justify-between">
    <h1 class="text-2xl font-semibold flex items-center gap-2">
      <button aria-label="Back" on:click={back}
        ><svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </button>Section Input
    </h1>
    <button
      class="text-blue-700 hover:text-blue-800"
      on:click={() => {
        isNew = !isNew;
      }}>{!isNew ? "Tambah" : "List"}</button
    >
  </div>
</header>
{#if isNew}
  <section class="flex flex-col p-4 pb-[30%] gap-4 h-full overflow-y-auto">
    <button
      type="button"
      class="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      on:click={create}>Create</button
    >
    <div>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
        bind:value={newSectionName}
      />
    </div>
  </section>
{:else}
  <h2 class="px-4 pt-4">Choose Section</h2>
  <section class="flex flex-col p-4 pb-[30%] gap-4 h-full overflow-y-auto">
    {#if sections.length === 0}
      <p>No section available</p>
    {/if}
    {#each sections as section (section[0])}
      <div class="flex justify-between">
        <button on:click={use(section[0])}>{section[1]}</button>
        <div>
          <button
            aria-label="Delete"
            class="text-red-700 hover:text-red-800"
            on:click={destroy(section[0])}>Delete</button
          >
        </div>
      </div>
    {/each}
  </section>
{/if}
