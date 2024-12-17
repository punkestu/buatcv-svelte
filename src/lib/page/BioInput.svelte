<script>
  import { onMount } from "svelte";
  import { pub } from "../utils/channel";
  import { get } from "../utils/localstorage";

  let bio = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postal: "",
    summary: "",
  };

  onMount(() => {
    bio = get("bio") || bio;
  });

  function isBioEmpty() {
    return Object.values(bio).every((value) => !value);
  }

  function save() {
    pub("feature", "store:bio", isBioEmpty() ? null : bio);
    pub("page", "open:structure");
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
      </button>Bio Input
    </h1>
  </div>
</header>
<section class="flex flex-col p-4 gap-4">
  <div>
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.name}
    />
  </div>
  <div>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.email}
    />
  </div>
  <div>
    <label for="phone">Phone</label>
    <input
      type="tel"
      id="phone"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.phone}
    />
  </div>
  <div>
    <label for="address">Address</label>
    <input
      type="text"
      id="address"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.address}
    />
  </div>
  <div>
    <label for="city">City</label>
    <input
      type="text"
      id="city"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.city}
    />
  </div>
  <div>
    <label for="country">Country</label>
    <input
      type="text"
      id="country"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.country}
    />
  </div>
  <div>
    <label for="postal">Postal</label>
    <input
      type="text"
      id="postal"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      bind:value={bio.postal}
    />
  </div>
  <div>
    <label for="summary">Summary</label>
    <textarea
      id="summary"
      class="mt-1 w-full p-2 border border-gray-200 rounded-lg dark:border-gray-600"
      rows="5"
      bind:value={bio.summary}
    ></textarea>
  </div>
  <button
    type="button"
    class="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    on:click={save}>Save</button
  >
</section>
