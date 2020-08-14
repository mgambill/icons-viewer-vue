import { promises as fs } from "fs"
import camelCase from "lodash.camelcase"
import path from "path"
import mkdir from "mkdirp"

export const __dirname = path.resolve()

export function pascalCase(str) {
  let t = camelCase(str)
  return t.charAt(0).toUpperCase() + t.slice(1)
}

const getComponentName = v => pascalCase(v.replace(/\.[a-z]+$/, "Icon"))

function componentTemplate({ name, content, componentFormatter }) {
  const n = getComponentName(name)
  const code = `export const ${n} = {
  name: '${n}',
  functional: true,
  render(h, ctx) {
    return (
      ${content.replace(/<svg([^>]+)>/, "<svg$1 {...ctx.data}>")})    
  }
}
`
  return componentFormatter(name, content, code)
}

export async function createList(iconsPath, destination, nameFormatter = x => x) {
  let icons = (await fs.readdir(iconsPath)).sort()
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  const text = JSON.stringify(icons.map(name => getComponentName(nameFormatter(name))).filter(unique), null, 2)

  await fs.writeFile(`${destination}/list.json`, text, "utf8")
}

// pass in functions to allow for customizations....
export async function createControls(
  iconsPaths,
  destination,
  {
    folderFormatter = x => x,
    nameFormatter = x => x,
    // eslint-disable-next-line no-unused-vars
    excludePredicate = (x, i) => false,
    // eslint-disable-next-line no-unused-vars
    componentFormatter = (name, content, code) => code
  }
) {
  await iconsPaths.forEach(async (iconsPath, index) => {
    const p = path.parse(iconsPath)
    const base = folderFormatter(p.base)
    const folder = `${destination}/${base}`
    const icons = await fs.readdir(iconsPath)

    console.log({ p, base, folder, icons })

    // build components
    let component = []
    for (const name of icons) {
      const stat = await fs.lstat(path.join(iconsPath, name))
      // skip sub directories
      if (stat.isDirectory()) continue
      if (excludePredicate(name, index) === true) continue

      const content = await fs.readFile(path.join(iconsPath, name), "utf8")
      component.push(
        componentTemplate({
          name: nameFormatter(name), //remove extension
          content,
          componentFormatter
        })
      )
    }
    // makde directory
    mkdir.sync(path.join(__dirname, `${folder}`))

    await fs.writeFile(`${folder}/index.js`, component.join("\n"), "utf8")

    console.log(`${folder}/index.js`)
  })
}
