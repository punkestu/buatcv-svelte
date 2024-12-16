<script>
  import { onMount } from "svelte";
  import { pub, sub } from "../utils/channel";
  import { get } from "../utils/localstorage";
  

  const dict = {
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    country: "Country",
    postal: "Postal",
    summary: "Summary",
  };

  let bio = null;
  onMount(() => {
    bio = get("bio");
    sub("bio-structure", "set:bio", (data) => {
      bio = data;
    });
  });

  function openBioInput() {
    pub("page", "open:bio-input");
  }
</script>

<button
  aria-label="Biodata"
  class="border p-2 w-full min-h-20 flex flex-col {bio
    ? 'items-start'
    : 'items-center justify-center'}"
  on:click={openBioInput}
>
  {#if !bio}
    <p class="font-bold text-xl">Bio not configured!</p>
    <p>Click to configure</p>
  {:else}
    <h1 class="font-bold text-xl">Biodata</h1>
    <div class="flex flex-wrap gap-2">
      {#each Object.keys(bio) as key}
        {#if bio[key] && dict.hasOwnProperty(key)}
          <div class="flex-grow flex flex-col items-start">
            <h2 class="font-semibold">{dict[key]}:</h2>
            <p class="text-start">{bio[key]}</p>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</button>
