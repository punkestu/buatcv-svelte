<script>
  import Navbar from "./lib/component/Navbar.svelte";
  import Structure from "./lib/page/Structure.svelte";
  import { Router, Route, navigate } from "svelte-routing";

  const base = import.meta.env.VITE_BASE;
  if (
    location.pathname.replace(/^\/|\/$/g, "") === base.replace(/^\/|\/$/g, "")
  ) {
    navigate(base + "/structure");
  }
</script>

<main class="h-screen">
  <Router basepath={base}>
    <Route path="/structure">
      <Structure />
    </Route>
    <Route path="/items">Items</Route>
    <Route path="/user">User</Route>
  </Router>
</main>
<Navbar />

<style>
</style>
