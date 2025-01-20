<script>
  import { get, getSeq } from "../utils/localstorage";

  const hiddenItems = get("hidden-items") || [];
  const sections = get("used-sections").map((section) => ({
    section: get(section),
    items: getSeq("used-items:" + section).map((itemID, itemIndex) => {
      const item = get(itemID);
      return {
        ...item,
        responsibilities: item.responsibilities.filter(
          (r, index) =>
            !(hiddenItems[itemIndex] && hiddenItems[itemIndex][index])
        ),
      };
    }),
  }));
  const data = {
    bio: get("bio"),
    sections: sections,
    skills: getSeq("skills"),
  };
  function formatDate(date) {
    return new Date(date).toLocaleDateString("id-ID", {
      month: "short",
      year: "2-digit",
    });
  }
</script>

<svelte:head>
  <title>CV {data.bio.name}</title>
</svelte:head>

<section id="printable" class="p-4 font-serif">
  <header class="flex flex-col items-center">
    <h1 class="font-bold text-3xl">{data.bio.name}</h1>
    <p class="flex flex-wrap justify-center">
      <span>{data.bio.address},&nbsp;</span>
      <span>{data.bio.city},&nbsp;</span>
      <span>{data.bio.country},&nbsp;</span>
      <span>{data.bio.postal}&nbsp;</span>
    </p>
    <p class="flex flex-wrap justify-center">
      <span>{data.bio.email}&nbsp;</span>
      <span>&#x2022; {data.bio.phone}&nbsp;</span>
    </p>
    <p class="w-full mt-2 text-justify">{data.bio.summary}</p>
  </header>
  <main>
    {#each sections as section, index (index)}
      <div class="my-2">
        <h2 class="font-bold text-2xl">{section.section}</h2>
        <hr class="my-1" />
        {#each section.items as item, itemIndex (itemIndex)}
          <div>
            <div class="flex justify-between">
              <aside>
                <h3 class="font-bold text-xl">{item.as}</h3>
                <p>{item.where}</p>
              </aside>
              <aside class="flex flex-col items-end">
                <p>{item.whereCity}</p>
                <p>
                  {formatDate(item.from)}
                  {item.to ? " - " + formatDate(item.to) : ""}
                </p>
              </aside>
            </div>
            <ul class="list-disc ps-5">
              {#each item.responsibilities as responsibility, responsibilityIndex (responsibilityIndex)}
                <li>{responsibility}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/each}
  </main>
  <footer>
    <h2 class="font-bold text-2xl">Skills</h2>
    <hr class="my-1" />
    <p>
      {data.skills.join(", ")}
    </p>
  </footer>
</section>
