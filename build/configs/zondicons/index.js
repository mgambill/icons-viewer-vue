import path from "path"
import { createControls, createList, __dirname } from "../../utils.js"

async function BuildZondicons() {
  const destinationPath = "./src/icons"
  const root = path.join(__dirname, "zondicons")

  const componentFormatter = (name, content, code) =>
    code.replace(`xmlns="http://www.w3.org/2000/svg"`, `fill="currentColor"`)
  const iconsPaths = [root]

  await createControls(iconsPaths, destinationPath, {
    componentFormatter
  })
  await createList(iconsPaths[0], path.join(destinationPath, "zondicons"))
}
export default BuildZondicons
