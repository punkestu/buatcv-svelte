<script>
  import { onMount } from "svelte";
  import { pub, sub } from "../utils/channel";

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
    sub("component", "set:bio-component", (args) => {
      bio = args;
    });
  });

  function openBioModal() {
    pub("modal", "open:bio-modal");
  }
</script>

<button
  aria-label="Biodata"
  class="border-2 p-2 border-black w-full min-h-20 flex flex-col {bio
    ? 'items-start'
    : 'items-center justify-center'}"
  on:click={openBioModal}
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
