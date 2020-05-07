const fs = require("fs");
const path = require("path");
const camelCase = require("lodash.camelcase");
const mkdir = require("mkdirp");

const pascalCase = str => {
  let t = camelCase(str);
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const getComponentName = v => pascalCase(v.replace(/\.[a-z]+$/, "Icon"));

function componentTemplate({ name, content }) {
  let code = `export const ${getComponentName(name)} = {
  name: '${getComponentName(name)}',
  functional: true,
  render(h, ctx) {
    return (
      ${content.replace(/<svg([^>]+)>/, "<svg$1 {...ctx.data}>")})    
  }
}
`;

  code = code.replace(/stroke-width="2"/g, `stroke-width={ctx.props.strokeWidth || 1}`);

  return code;
}

function createControls(iconsPaths, destination) {
  iconsPaths.forEach(iconsPath => {
    const p = path.parse(iconsPath);
    const base = p.base.replace("-md", "").replace("-sm", "");
    const icons = fs.readdirSync(iconsPath);
    const component = icons
      .map(name =>
        componentTemplate({
          name: name.slice(3), //remove extension
          content: fs.readFileSync(path.join(iconsPath, name), "utf8")
        })
      )
      .join("\n");
    //console.log(component)
    mkdir.sync(`${destination}/${base}`);
    fs.truncateSync(`${destination}/${base}/index.js`, 0);
    fs.writeFileSync(`${destination}/${base}/index.js`, component, "utf8");

    console.log(`${destination}/${base}/index.js`);
  });
}

function createList(iconsPath, destination) {
  console.log(iconsPath);
  const icons = fs.readdirSync(iconsPath);
  const text = JSON.stringify(
    icons.map(name => getComponentName(name.slice(3))),
    null,
    2
  );
  fs.writeFileSync(`${destination}/list.json`, text, "utf8");
}
const destinationPath = "./src/icons";
const root = "D:\\Development\\Github\\refactoringui\\heroicons\\dist";

const iconsPaths = [path.join(root, "outline-md"), path.join(root, "solid-sm")];

createControls(iconsPaths, destinationPath);
createList(iconsPaths[0], destinationPath);
