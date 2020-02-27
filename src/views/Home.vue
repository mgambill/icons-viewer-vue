<template lang="pug">
div
  .py-8.bg-cool-gray-800.mb-4
    .container.mx-auto.px-3(class="xl:px-0")  
      h1.font-semibold.tracking-tight.text-5xl.text-gray-200 Heroicons previewer
       
      h2.mb-2.font-light.text.text-gray-100(class='-tracking-0.5')
        | MIT-licensed, 
        a.text-indigo-500(href="https://github.com/refactoringui/heroicons/" target="_blank" noreferral class='hover:underline') open source iconset 
        | by 
        a.text-indigo-500(href="https://twitter.com/steveschoger" target="_blank" noreferral class='hover:underline') Steve Schoger 
        | and 
        a.text-indigo-500(href="https://twitter.com/adamwathan" target="_blank" noreferral class='hover:underline') Adam Wathan 
    

  .container.mx-auto(class="md:px-3 xl:px-0") 
    .mt-1.relative.rounded-md.shadow-sm
      .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
        svg.h-5.w-5.text-gray-400(fill="none" viewBox="0 0 24 24" stroke="currentColor")              
          path( stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")
            
      input(class='form-input block w-full pl-10 pr-12 sm:text-sm sm:leading-5'  placeholder='Search icons' v-model="filterText")

      .absolute.inset-y-0.right-0.flex.items-center
        select( aria-label="Currency" v-model="iconType" class="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5")
          option Outline
          option Solid
        
    div(class="flex flex-wrap  -mx-2 mt-2")
      template( v-for="icon in filteredIcons")
        IconCard(:icon="icon" :key="icon.title" :type="iconType")


    p.text-sm.py-8.text-center
      | Viewer inspired by  
      a.text-indigo-500(href="https://heroicons-viewer.netlify.com/" target="_blank" noreferral class='hover:underline') Zaydek Michels-Gualtieri 
      span.emoji 👋      
</template>

<script>
import kebabCase from "lodash.kebabcase";
import IconCard from "@/components/IconCard.vue";
import * as solid from "../icons/solid";

export default {
  name: "Home",
  components: {
    IconCard
  },
  data() {
    return {
      icons: Object.keys(solid).map(x => ({
        icon: x,
        title: kebabCase(x.replace("Icon", ""))
      })),
      filterText: "",
      iconType: "Solid"
    };
  },
  computed: {
    filteredIcons() {
      console.log("  --> ", this.filterText);

      const filter = this.filterText.toLowerCase();
      if (filter.length === 0) return this.icons;
      return this.icons.filter(x => x.title.toLowerCase().indexOf(filter) > -1);
    }
  }
};
</script>
