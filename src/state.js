import Vue from "vue"

const STORAGE_KEY = "IconState"

const state = Vue.observable({
  iconType: "Hero",
  iconSize: 5,
  iconStrokeWidth: 2,
  isDark: false,
  copyFormat: "html",
  usePug: false,
  useLocalStorage: true,
  hasState: false,
  iconSetIndex: 0,
  iconVariant: "Solid"
})

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY)
  state.hasState = false
}
console.log(">>", state)
const saveState = () => {
  if (state.useLocalStorage) {
    const { iconType, iconSize, iconStrokeWidth, isDark, copyFormat, usePug, iconVariant, iconSetIndex } = state
    state.hasState = true
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        iconType,
        iconSize,
        iconStrokeWidth,
        isDark,
        copyFormat,
        usePug,
        iconVariant,
        iconSetIndex
      })
    )
  }
}

const loadState = o => {
  const json = localStorage.getItem(STORAGE_KEY) || null

  if (json) {
    o.loaded = true
    Object.assign(o, JSON.parse(json))
    o.hasState = true
  }
}

export const mapCache = (...args) => {
  let o = {}
  args.forEach(x => {
    o[x] = {
      get() {
        // console.log("GET", x, state[x]);
        return state[x]
      },
      set(value) {
        this.$set(state, x, value)
        // console.log("SET", x, value, state);
        saveState(value)
      }
    }
  })
  return o
}

loadState(state)

export default state
