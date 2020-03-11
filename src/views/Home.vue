<template lang="pug">
#app.min-h-screen.w-full.relative(:class="[isDark ? 'bg-cool-gray-800':'bg-cool-gray-200']")

  .py-8.bg-cool-gray-800.mb-4
    .container.relative.mx-auto.px-3(class="xl:px-0")  
      .float-right.mt-4.flex.items-center
        
        button.text-white.p-2(@click="toggleTheme" title="toggle dark / light mode") 
          div.w-5.w-5
            template(v-if="isDark")         
              //- Sun icon
              svg( viewBox="0 0 20 20" fill="currentColor")
                path(fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd")
            
            template(v-else)         
              //- Moon icon
              svg( viewBox="0 0 20 20" fill="currentColor")
                path( d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z")

        .relative.inline-block.text-right(@keydown.escape="open = false")
          div
            button.flex.items-center.text-gray-400.relative.z-30(@click="open = !open" class="hover:text-gray-600 focus:outline-none focus:text-gray-600")
              svg.h-5.w-5(fill="currentColor" viewBox="0 0 20 20")
                path(fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd")
          .fixed.inset-0.z-10.w-screen.h-screen(@click="open =  false" v-if="open")
          .origin-top-right.absolute.z-20.right-0.mt-2.w-64.rounded-md.shadow-lg(v-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95")
            .rounded-md.bg-white.shadow-xs
              .py-1.text-left
                .flex.items-center.px-4.py-2.block(class="hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900")
                  input#usePug.sr-only(type="checkbox" v-model="usePug")
                  label(:class="usePug ? 'text-gray-800' : 'text-gray-300'" for="usePug")
                    svg.w-4.h-4(viewBox="0 0 20 20" fill="currentColor" strokewidth="1")
                      path(fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd")
                  label.ml-2.text-sm.leading-5.text-gray-700(for="usePug")
                    | Copy text in 
                    a.font-bold.text-blue-600(href="https://pugjs.org/" target="_blank" rel="noreferrer") pug 
                    | format
                .border-t.border-gray-100
                .flex.items-center.px-4.py-2.block(class="hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900")
                  input#useLocalStorage.sr-only(type="checkbox" v-model="useLocalStorage")
                  label(:class="useLocalStorage ? 'text-gray-800' : 'text-gray-300'" for="useLocalStorage")
                    svg.w-4.h-4(viewBox="0 0 20 20" fill="currentColor" strokewidth="1")
                      path(fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd")
                  label.ml-2.text-sm.leading-5.text-gray-700(for="useLocalStorage")
                    | Save settings in locally
                a.block.pr-4.pl-10.py-2.text-sm.leading-5(href="#" :class="hasState ? 'text-gray-700' : 'text-gray-400'" class="hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" @click="onReset") Reset settings
                .border-t.border-gray-100
                a.flex.items-center.block.pr-4.pl-10.py-2.text-sm.leading-5.text-gray-700(href="https://github.com/mgambill/heroicons-viewer-vue/issues" target="_blank" rel="noreferrer" class="hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" ) 
                  | Issues
                  svg.w-4.h-4.ml-2(fill="none" viewBox="0 0 24 24" stroke="currentColor" strokewidth="1")
                    path(stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14")
                
      
      h1.font-semibold.tracking-tight.text-5xl.text-gray-200 Heroicons
       
      h2.mb-2.font-light.text.text-gray-100(class='-tracking-0.5')
        | MIT-licensed, 
        a.text-indigo-300(href="https://github.com/refactoringui/heroicons/" target="_blank" rel="noreferrer" class='hover:underline') open source iconset 
        | by 
        a.text-indigo-300(href="https://twitter.com/steveschoger" target="_blank" rel="noreferrer" class='hover:underline') Steve Schoger 
        | and 
        a.text-indigo-300(href="https://twitter.com/adamwathan" target="_blank" rel="noreferrer" class='hover:underline') Adam Wathan 
    

  .container.mx-auto(class="md:px-3 xl:px-0") 
    .flex.w-full
      div.flex-1
        .mt-1.flex.rounded-md.shadow-sm
          .relative.flex-grow(class='focus-within:z-10')
            .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
              svg.h-5.w-5.text-gray-400(fill="none" viewBox="0 0 24 24" stroke="currentColor")              
                path( stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")            
            label.sr-only(for="filter") Search Icons
            input#filter.form-input.block.w-full.rounded-none.rounded-l-md.pl-10.transition.ease-in-out.duration-150(class='sm:text-sm sm:leading-5' placeholder='Search icons' v-model="filterText")
          
          button.-ml-px.w-28.relative.inline-flex.items-center.px-3.py-2.border.border-gray-300.text-sm.leading-5.font-medium.rounded-r-md.text-gray-700.bg-white.transition.ease-in-out.duration-150(class='hover:text-gray-500 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700' @click="toggleIconType")
            div.w-full.flex.justify-between
              span.ml-2 {{ iconType }}
              svg.w-5.h-5.text-gray-400(fill='none', viewBox='0 0 24 24', stroke='currentColor', strokewidth='1')
                path(stroke-linecap='round', stroke-linejoin='round', stroke-width='1', d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4')


      .mt-1.ml-4
          label.sr-only(for='icon_size') Icon Size
          .relative.rounded-md.shadow-sm
            .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
              span.text-gray-500(class='sm:text-sm sm:leading-5')
                | Size:
            select#icon_size.form-input.block.w-full.pl-16(class="form-input block w-full pl-10 pr-8 sm:text-sm sm:leading-5" :class="[isDark? 'bg-cool-gray-700 text-cool-gray-100' : 'bg-white']" v-model.number="iconSize") 
              template(v-for="(key, $index) in spacing")
             
                option {{ key }}
      .mt-1.ml-4(:class="{'opacity-50': isSolid }" :disabled="isSolid")
          label.sr-only(for='icon_size') Stroke Width
          .relative.rounded-md.shadow-sm
            .absolute.inset-y-0.left-0.pl-3.flex.items-center.pointer-events-none
              span.text-gray-500(class='sm:text-sm sm:leading-5') Stroke:
            select#icon_size.form-input.block.w-full.pl-20(class="form-input block w-full pl-10 pr-8 sm:text-sm sm:leading-5" :class="[isDark? 'bg-cool-gray-700 text-cool-gray-100' : 'bg-white']" v-model.number="iconStrokeWidth") 
              template(v-for="(key, $index) in strokeWidths")
                option {{ key }}



    template(v-if="filteredIcons")
      div(class="flex flex-wrap  -mx-2 mt-2")
        template( v-for="icon in filteredIcons")
          IconCard(:icon="icon" :key="`${icon.title}--${iconType}`" :type="iconType" :is-dark="isDark" :icon-size="iconSize" :icon-stroke-width="iconStrokeWidth" :usePug="usePug")

    template(v-else)
      div.flex.h-48.items-center.justify-center.mt-4.w-full
        h1.text-2xl Loading

    div.text-sm.py-8.mt-3.flex.justify-between(:class="[isDark ? 'text-gray-200': 'text-gray-600' ]")
      div.flex
        //- Search icon
        svg.w-4.w-4.mr-3( viewBox="0 0 496 512"  fill="currentColor" )
          path( fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z")

        a(href="https://github.com/mgambill/heroicons-viewer-vue/" target="_blank" rel="noreferrer" class='hover:underline' :class="[isDark ? 'text-indigo-300': 'text-indigo-600' ]") heroicons-viewer-vue  
    
      div
        span() Viewer inspired by  
        a(href="https://heroicons.dev" target="_blank" rel="noreferrer" class='hover:underline' :class="[isDark ? 'text-indigo-300': 'text-indigo-600' ]") Zaydek Michels-Gualtieri 
        span.emoji 👋      
</template>

<script>
import kebabCase from "lodash.kebabcase";
import IconCard from "@/components/IconCard.vue";
import theme from "tailwindcss/defaultTheme";
import { default as $state, mapCache, clearState } from "../state";
import IconNames from "@/icons/list.json";

export default {
  name: "Home",
  components: {
    IconCard
  },
  data() {
    return {
      icons: null,
      open: false,
      filterText: "",
      strokeWidths: [0.5, 1, 1.5, 2],
      spacing: Object.keys(theme.spacing).filter(key => +key > 3)
    };
  },
  computed: {
    ...mapCache("iconType", "iconSize", "iconStrokeWidth", "isDark", "usePug", "useLocalStorage"),
    filteredIcons() {
      const filter = this.filterText.toLowerCase();
      if (filter.length === 0) return this.icons;
      return this.icons.filter(x => x.title.toLowerCase().indexOf(filter) > -1);
    },
    isSolid() {
      return this.iconType === "Solid";
    },
    hasState() {
      return $state.hasState;
    }
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
    onReset() {
      clearState();
      this.open = false;
    },
    toggleIconType() {
      this.iconType = this.isSolid ? "Outline" : "Solid";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.icons = IconNames.map(x => ({
        icon: x,
        title: kebabCase(x.replace("Icon", ""))
      }));
    });
  }
};
</script>
