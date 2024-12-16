<script>
  import BioInput from "./lib/page/BioInput.svelte";
  import Structure from "./lib/page/Structure.svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import SectionInput from "./lib/page/SectionInput.svelte";

  import pagecontroller from "./lib/controller/page";
  import localstoragecontroller from "./lib/controller/localstorage";
  import featurecontroller from "./lib/controller/feature";
  import ItemInput from "./lib/page/ItemInput.svelte";
  import Preview from "./lib/page/Preview.svelte";

  const base = import.meta.env.VITE_BASE;
  if (
    location.pathname.replace(/^\/|\/$/g, "") === base.replace(/^\/|\/$/g, "")
  ) {
    navigate(base + "/structure");
  }

  pagecontroller();
  localstoragecontroller();
  featurecontroller();
</script>

<svelte:head>
  <title>CV Builder</title>
</svelte:head>

<main class="h-screen">
  <Router basepath={base}>
    <Route path="/structure">
      <Structure />
    </Route>
    <Route path="/bio/input">
      <BioInput />
    </Route>
    <Route path="/section/input">
      <SectionInput />
    </Route>
    <Route path="/item/input/:sectionID" let:params>
      <ItemInput sectionID={params.sectionID} />
    </Route>
    <Route path="/items">Items</Route>
    <Route path="/user">User</Route>
    <Route path="/preview">
      <Preview />
    </Route>
  </Router>
</main>

<!-- <Navbar /> -->

<style>
</style>
