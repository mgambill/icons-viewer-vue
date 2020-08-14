import path from "path"
import { createControls, createList, __dirname } from "../../utils.js"

async function BuildIcons() {
  const destinationPath = "./src/icons"
  const root = path.join(__dirname, "node_modules\\codicons\\src\\icons")
  const folderFormatter = () => "codicons"
  //const nameFormatter = name => name.slice(3)
  /*const excludePredicate = (name, index) =>
    (index === 0 && !name.startsWith("md")) || (index === 1 && !name.startsWith("sm"))*/
  const componentFormatter = (name, content, code) =>
    code.replace(/height="16" |width="16" /g, "").replace(`xmlns="http://www.w3.org/2000/svg" `, "")
  const iconsPaths = [root]

  await createControls(iconsPaths, destinationPath, {
    folderFormatter,
    //nameFormatter,
    //excludePredicate,
    componentFormatter
  })
  await createList(iconsPaths[0], path.join(destinationPath, "codicons"))
}

export default BuildIcons
