import path from "path"
import { createControls, createList, __dirname } from "../../utils.js"

async function BuildIcons() {
  const destinationPath = "./src/icons"
  const root = path.join(__dirname, "node_modules\\feather-icons\\dist\\icons")
  const folderFormatter = () => "feather"
  //const nameFormatter = name => name.slice(3)
  /*const excludePredicate = (name, index) =>
    (index === 0 && !name.startsWith("md")) || (index === 1 && !name.startsWith("sm"))*/
  const componentFormatter = (name, content, code) =>
    code
      .replace(/height="24" |width="24" /g, "")
      .replace(/stroke-width="2"/g, `stroke-width={props.strokeWidth || 1}`)
      .replace(`xmlns="http://www.w3.org/2000/svg" `, "")
  const iconsPaths = [root]

  await createControls(iconsPaths, destinationPath, {
    folderFormatter,
    //nameFormatter,
    //excludePredicate,
    componentFormatter
  })
  await createList(iconsPaths[0], path.join(destinationPath, "feather"))
}

export default BuildIcons
