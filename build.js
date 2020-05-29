const fs = require("fs").promises
const path = require("path")
const camelCase = require("lodash.camelcase")
const mkdir = require("mkdirp")

const pascalCase = str => {
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
// pass in functions to allow for customizations....
async function createControls(
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

async function createList(iconsPath, destination, nameFormatter = x => x) {
  let icons = (await fs.readdir(iconsPath)).sort()
  const unique = (value, index, self) => {
    return self.indexOf(value) === index
  }
  const text = JSON.stringify(icons.map(name => getComponentName(nameFormatter(name))).filter(unique), null, 2)

  await fs.writeFile(`${destination}/list.json`, text, "utf8")
}

async function BuildHeroIcons() {
  const destinationPath = "./src/icons/heroicons"
  const root = path.join(__dirname, "node_modules\\heroicons")
  //const folderFormatter = p => p.replace("-md", "").replace("-sm", "")
  //const nameFormatter = name => name.slice(3)
  /*const excludePredicate = (name, index) =>
    (index === 0 && !name.startsWith("md")) || (index === 1 && !name.startsWith("sm"))*/
  const componentFormatter = (name, content, code) =>
    code.replace(/stroke-width="2"/g, `stroke-width={ctx.props.strokeWidth || 1}`)
  const iconsPaths = [path.join(root, "outline"), path.join(root, "solid")]

  await createControls(iconsPaths, destinationPath, {
    //folderFormatter,
    //nameFormatter,
    //excludePredicate,
    componentFormatter
  })
  await createList(iconsPaths[0], destinationPath)
}

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

;(async () => {
  try {
    await BuildZondicons()
    await BuildHeroIcons()
  } catch (e) {
    console.log(e)
  }
})()
