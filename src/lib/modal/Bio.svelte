<script>
  import { onMount } from "svelte";
  import { modal } from "../utils/modal";
  import { pub, reset, sub } from "../utils/channel";

  onMount(() => {
    const bioModal = modal("bio-modal", {
      onHide: () => reset("modal"),
    });
    sub("modal", "open:bio-modal", () => bioModal.show());
    sub("modal", ["close:bio-modal", "save:bio-modal"], () => bioModal.hide());
    sub("modal", "set:bio-modal", (args) => args && (bio = args));
  });

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

  function isBioEmpty() {
    return Object.values(bio).every((value) => !value);
  }

  function close() {
    pub("modal", "close:bio-modal");
  }

  function save() {
    pub("modal", "save:bio-modal", isBioEmpty() ? null : bio);
  }
</script>

<div
  id="bio-modal"
  tabindex="-1"
  aria-hidden="true"
  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
>
  <div class="relative w-full max-w-2xl max-h-full">
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <div
        class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3
          class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
        >
          Biodata
        </h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          on:click={close}
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
      <div class="p-6 space-y-3 max-h-[40vh] overflow-y-auto">
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
      </div>
      <div
        class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
      >
        <button
          type="button"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          on:click={save}>Save</button
        >
      </div>
    </div>
  </div>
</div>
