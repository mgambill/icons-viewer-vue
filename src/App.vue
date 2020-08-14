<template lang="pug">
  
    //-#nav
      router-link(to="/") Home
      router-link(to="/about") About
  
    router-view
  
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

#info a {
  @apply text-indigo-300;
}
#info a:hover {
  @apply underline;
}
</style>
