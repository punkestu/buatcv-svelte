<script>
  import { onDestroy, onMount } from "svelte";
  import { get, getSeq } from "../utils/localstorage";
  import { pub, sub } from "../utils/channel";

  export let sectionID;

  let items = [];
  let hiddenitems = {};
  let usedItemSub;

  onMount(() => {
    items = getSeq("used-items:" + sectionID, true);
    hiddenitems = get("hidden-items") || {};
    usedItemSub = sub(
      "localstorage",
      "update:used-items:" + sectionID,
      (newItems) => {
        items = newItems;
      }
    );
  });

  onDestroy(() => {
    usedItemSub();
  });

  $: items = items.map((item) => [item[1], get(item[1]), item[0]]);

  function formatDate(date) {
    return new Date(date).toLocaleDateString("id-ID", {
      month: "short",
      year: "2-digit",
    });
  }

  function toggleVisibility(itemID, index) {
    hiddenitems[itemID] = hiddenitems[itemID] || [];
    hiddenitems[itemID][index] = !hiddenitems[itemID][index];
    pub("feature", "set:hidden-items", hiddenitems);
  }

  function destroy(itemID) {
    pub("feature", "unuse:item", { itemID, sectionID });
  }
</script>

<div id="item-list">
  {#each items as item (item[2])}
    <div class="border p-2">
      <div class="flex justify-between">
        <span>{item[1].label}</span>
        <button
          aria-label="Delete"
          class="text-red-700 hover:text-red-800"
          on:click={destroy.bind(this, item[2])}
        >
          x</button
        >
      </div>
      <div class="flex justify-between mt-2">
        <aside class="flex flex-col gap-1">
          <h2 class="font-bold">{item[1].as}</h2>
          <p>{item[1].where}</p>
        </aside>
        <aside class="flex flex-col gap-1 items-end">
          <p class="text-right">{item[1].whereCity}</p>
          <p class="text-right">
            {formatDate(item[1].from)}
            {item[1].to ? " - " + formatDate(item[1].to) : ""}
          </p>
        </aside>
      </div>
      <div class="flex flex-col mt-2">
        <p>Responsibilities:</p>
        <ul class="flex flex-col gap-2">
          {#each item[1].responsibilities as responsibility, index (index)}
            <li
              class={"border p-2" +
                (hiddenitems[item[0]] && hiddenitems[item[0]][index]
                  ? " opacity-50"
                  : "")}
            >
              <button
                class="flex items-center gap-2 w-full"
                aria-label="Visibility"
                on:click={toggleVisibility.bind(this, item[0], index)}
              >
                <span class="flex-grow flex items-center justify-center">
                  {#if hiddenitems[item[0]] && hiddenitems[item[0]][index]}
                    <svg
                      class="w-full h-full text-gray-800 dark:text-white"
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
                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  {:else}
                    <svg
                      class="w-full h-full text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  {/if}
                </span>
                <span class="md:w-[97%] w-[88%] text-left"
                  >{responsibility}</span
                >
              </button>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>
