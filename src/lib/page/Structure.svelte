<script>
  import BioStructure from "../component/BioStructure.svelte";
  import HeaderStructure from "../component/HeaderStructure.svelte";
  import SectionList from "../component/SectionList.svelte";
  import SkillsList from "../component/SkillsList.svelte";
</script>

<HeaderStructure />
<section id="list" class="p-4">
  <BioStructure />
  <SectionList />
  <SkillsList />
</section>
