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


    div.text-sm.py-8.mt-3.flex.justify-between
      div.flex
    
        svg.w-4.w-4.mr-3( viewBox="0 0 496 512"  fill="currentColor" )
          path( fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z")

        a.text-indigo-500(href="https://github.com/mgambill/heroicons-viewer-vue/" target="_blank" noreferral class='hover:underline') heroicons-viewer-vue  
      div
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
