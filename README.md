# Heroicons viewer

## Overview

**Update**: Originally this started out as a Heroicons iconset viewer. Then I added Zondicons and later Codicons. So now the site houses multiple icon sets.

A frontend for the newly released [Heroicons iconset](https://github.com/refactoringui/heroicons) by RefactoringUI (Adam Wathan/Steve Schoger). It's designed to specifically to work with TailwindCSS sizing classes.

As a *bonus* you can also toggle to [Zondicons](http://www.zondicons.com/icons.html) an older iconset created by Steve Schoger.

Built using Vue and Tailwind CSS.

Initial idea from: https://github.com/codex-src/heroicons-viewer

## Resources 

👉 https://icons.nmyvsn.net<br />
👉 https://github.com/refactoringui/heroicons<br />
👉 https://www.zondicons.com<br />
👉 https://github.com/microsoft/vscode-codicons<br />

## Releases

2020-08-14
- added `ctrl` copy support this will copy the children not the whole svg
- rename the added a new url : https://icons.nmyvsn.net
- refactor the build process
- update tag line to change per icon set
- adding new icon set Codicons
- updated underlining Heroicon set 

2020-05-29

- update build script to reflect changes in icon repo
- updated underlining Heroicon set 

2020-05-10
- added new icon set: Zodicons
- internally use IconComponents
- alter dark mode
- support copy as HTML, JSX and Pug

2020-05-07
- import new icons
- add build script to easily update icon index files
- fix copy logic when changing settings

