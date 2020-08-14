import BuildHeroIcons from "./configs/heroicons/index.js"
import BuildZondicons from "./configs/zondicons/index.js"
import BuildCodIcons from "./configs/codicons/index.js"
;(async () => {
  try {
    await BuildZondicons()
    await BuildHeroIcons()
    await BuildCodIcons()
  } catch (e) {
    console.log(e)
  }
})()
