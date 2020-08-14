import path from "path"
import { createControls, createList, __dirname } from "../../utils.js"

async function BuildHeroIcons() {
  const destinationPath = "./src/icons/heroicons"
  const root = path.join(__dirname, "node_modules\\heroicons")
  //const folderFormatter = p => p.replace("-md", "").replace("-sm", "")
  //const nameFormatter = name => name.slice(3)
  /*const excludePredicate = (name, index) =>
    (index === 0 && !name.startsWith("md")) || (index === 1 && !name.startsWith("sm"))*/
  const componentFormatter = (name, content, code) =>
    code
      .replace(/stroke-width="2"/g, `stroke-width={ctx.props.strokeWidth || 1}`)
      .replace(`xmlns="http://www.w3.org/2000/svg" `, "")
  const iconsPaths = [path.join(root, "outline"), path.join(root, "solid")]

  await createControls(iconsPaths, destinationPath, {
    //folderFormatter,
    //nameFormatter,
    //excludePredicate,
    componentFormatter
  })
  await createList(iconsPaths[0], destinationPath)
}

export default BuildHeroIcons
