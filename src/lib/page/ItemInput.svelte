<script>
  import { onMount } from "svelte";
  import { pub, sub } from "../utils/channel";
  import { getSeq } from "../utils/localstorage";

  export let sectionID;

  let item = {
    label: "",
    as: "",
    where: "",
    whereCity: "",
    from: "",
    to: "",
    responsibilities: [""],
  };
  let isNew = false;
  let items = [];

  onMount(() => {
    items = getSeq("items", true);
    sub("localstorage", "update:items", (newItems) => {
      items = newItems;
    });
  });

  function back() {
    pub("page", "open:structure");
  }

  function validate() {
    if (!item.label) {
      alert("Label is required");
      return false;
    }
    if (!item.as) {
      alert("As is required");
      return false;
    }
    if (!item.where) {
      alert("Where is required");
      return false;
    }
    if (!item.whereCity) {
      alert("Where City is required");
      return false;
    }
    if (!item.from) {
      alert("From is required");
      return false;
    }
    if (item.to && item.from > item.to) {
      alert("From must be less than To");
      return false;
    }

    return true;
  }

  function save() {
    if (!validate()) return;
    pub("feature", "store:item", item);
    isNew = false;
    item = {
      label: "",
      as: "",
      where: "",
      whereCity: "",
      from: "",
      to: "",
      responsibilities: [""],
    };
  }

  function addResponsibility() {
    item.responsibilities = [...item.responsibilities, ""];
  }

  function removeResponsibility(index) {
    item.responsibilities = item.responsibilities.filter((_, i) => i !== index);
  }

  function use(itemID) {
    return () => {
      pub("feature", "use:item", { itemID, sectionID });
      back();
    };
  }

  function destroy(itemID) {
    return () => {
      pub("feature", "destroy:item", itemID);
    };
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
      </button>Item Input
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
  <section class="flex flex-col p-4 gap-4">
    <div>
      <label for="label">Label</label>
      <input
        type="text"
        id="label"
        class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
        bind:value={item.label}
      />
    </div>
    <div>
      <label for="as">As</label>
      <input
        type="text"
        id="as"
        class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
        bind:value={item.as}
      />
    </div>
    <div>
      <label for="where">Where (School, Company, etc.)?</label>
      <input
        type="text"
        id="where"
        class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
        bind:value={item.where}
      />
    </div>
    <div>
      <label for="whereCity">Where (City)?</label>
      <input
        type="text"
        id="whereCity"
        class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
        bind:value={item.whereCity}
      />
    </div>
    <div>
      <label for="from">When?</label>
      <div class="flex gap-2 items-center">
        <input
          type="date"
          id="from"
          class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
          bind:value={item.from}
        />
        <span>To</span>
        <input
          type="date"
          id="to"
          class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
          bind:value={item.to}
        />
      </div>
    </div>
    <div class="flex flex-col">
      <label for="from">What you do?</label>
      <div class="flex flex-col mt-1 gap-1">
        {#each item.responsibilities as responsibility, index}
          <div class="flex items-center gap-2">
            <button
              aria-label="Delete"
              class="text-red-700 hover:text-red-800"
              on:click={removeResponsibility.bind(this, index)}>Delete</button
            >
            <textarea rows="4" class="flex-grow" bind:value={responsibility}
            ></textarea>
          </div>
        {/each}
      </div>
      <button
        aria-label="AddItem"
        class="self-end px-4 py-2 border-2 border-black mt-2 bg-gray-300"
        on:click={addResponsibility}>+ Add</button
      >
    </div>
    <button
      type="button"
      class="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      on:click={save}>Create</button
    >
  </section>
{:else}
  <h2 class="px-4 pt-4">Choose Item</h2>
  <section class="flex flex-col p-4 pb-[30%] gap-4 h-full overflow-y-auto">
    {#if items.length == 0}
      <p>No item available</p>
    {/if}
    {#each items as item (item[0])}
      <div class="flex justify-between">
        <button on:click={use(item[0])}>{item[1].label}</button>
        <div>
          <button
            aria-label="Delete"
            class="text-red-700 hover:text-red-800"
            on:click={destroy(item[0])}>Delete</button
          >
        </div>
      </div>
    {/each}
  </section>
{/if}
