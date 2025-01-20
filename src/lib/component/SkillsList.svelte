<script>
  import { onMount } from "svelte";
  import { getSeq } from "../utils/localstorage";
  import { pub, sub } from "../utils/channel";

  let skills = [];
  let newSkill = "";
  onMount(() => {
    skills = getSeq("skills", true);
    sub("localstorage", "update:skills", (data) => {
      skills = data;
    });
  });
  let isEdit = false;
  function toggleEdit() {
    isEdit = !isEdit;
    newSkill = "";
  }
  function saveSkills() {
    if (newSkill === "") return;
    pub("feature", "store:skill", newSkill);
    toggleEdit();
  }
  function removeSkill(skillID) {
    return () => pub("feature", "destroy:skill", skillID);
  }
</script>

<section class="mt-4 border p-2 w-full flex flex-col">
  <h1 class="font-bold text-xl">Skills</h1>
  <div class="flex gap-2 items-start">
    {#if isEdit}
      <button on:click={toggleEdit} aria-labelledby="SaveSkills">
        <svg
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
            d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7.414A2 2 0 0 0 20.414 6L18 3.586A2 2 0 0 0 16.586 3H5Zm3 11a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6H8v-6Zm1-7V5h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
            clip-rule="evenodd"
          />
          <path fill-rule="evenodd" d="M14 17h-4v-2h4v2Z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="flex-grow flex flex-wrap gap-1">
        {#each skills as skill}
          <button class="border px-2 py-1 flex gap-2"
          on:click={removeSkill(skill[0])}
            >{skill[1]}
            <svg
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
                stroke-width="2"
                d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        {/each}
        <div class="flex gap-2">
          <input
            class="w-28"
            type="text"
            placeholder="New skill"
            bind:value={newSkill}
          />
          <button on:click={saveSkills}>Add</button>
        </div>
      </div>
    {:else}
      <button on:click={toggleEdit} aria-labelledby="EditSkills">
        <svg
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
            d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <p>
        {#if skills.length === 0}
          Skills not configured!
        {:else}
          {skills.map((skill) => skill[1]).join(", ")}
        {/if}
      </p>
    {/if}
  </div>
</section>
