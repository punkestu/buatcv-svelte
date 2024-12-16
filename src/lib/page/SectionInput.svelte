<script>
  import { onMount } from "svelte";
  import { pub, reset, sub } from "../utils/channel";
  import { getSeq } from "../utils/localstorage";

  let newSectionName = "";
  let isNew = true;
  let sections = [];

  onMount(() => {
    sections = getSeq("sections", true);
  });

  sub("section-input", "destroy:section", (sectionID) => {
    sections = sections.filter((section) => section[0] !== sectionID);
    reset("section-input");
  });

  function create() {
    pub("page", "open:structure");
    pub("feature", "store:section", newSectionName);
  }

  function use(sectionID) {
    return () => {
      pub("section-list", "set:new-section-id", sectionID);
      pub("section-input", "set:new-section-id", sectionID);
      pub("page", "open:structure");
    };
  }

  function destroy(sectionID) {
    return () => {
      pub("feature", "destroy:section", sectionID);
    };
  }
</script>

<header class="px-4 pt-4 sticky top-0 bg-white">
  <div class="flex justify-between">
    <h1 class="text-2xl font-semibold">Section Input</h1>
    <label class="flex items-center cursor-pointer">
      <span
        ><svg
          class="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <input type="checkbox" bind:checked={isNew} class="sr-only peer" />
      <div
        class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
      ></div>
    </label>
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
