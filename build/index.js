import BuildHeroIcons from "./configs/heroicons/index.js"
import BuildZondicons from "./configs/zondicons/index.js"
import BuildCodIcons from "./configs/codicons/index.js"
import BuildTeenyIcons from "./configs/teenyicons/index.js"
import BuildFeatherIcons from "./configs/feather/index.js"

  ; (async () => {
    try {
      //await BuildZondicons()
      await BuildHeroIcons()
      await BuildCodIcons()
      await BuildTeenyIcons()
      await BuildFeatherIcons()
    } catch (e) {
      console.log(e)
    }
  })()
