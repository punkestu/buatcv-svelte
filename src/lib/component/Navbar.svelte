<script>
  import { Link, Router } from "svelte-routing";
  const base = import.meta.env.VITE_BASE;
</script>

<Router basepath={base}>
  <nav
    class="flex justify-around sticky bottom-0 py-6 border border-black bg-white"
  >
    <Link to="items" aria-label="Items">
      <svg
        class="w-9 h-9 text-gray-800 dark:text-white"
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
          d="M5 7h14M5 12h14M5 17h10"
        />
      </svg>
    </Link>
    <Link
      to="structure"
      aria-label="Structure"
      class="relative flex justify-center"
    >
      <div
        class="absolute top-[-150%] bg-gray-300 border-2 border-black rounded-full p-4"
      >
        <svg
          class="w-12 h-12 text-gray-800 dark:text-white"
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
            d="M10 3v4a1 1 0 0 1-1 1H5m4 8h6m-6-4h6m4-8v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
          />
        </svg>
      </div>
    </Link>
    <Link to="user" aria-label="User">
      <svg
        class="w-9 h-9 text-gray-800 dark:text-white"
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
          d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </Link>
  </nav>
</Router>
