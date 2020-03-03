import Vue from "vue";

const STORAGE_KEY = "IconState";

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const saveState = () => {
  const { iconType, iconSize, iconStrokeWidth, isDark } = state;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      iconType,
      iconSize,
      iconStrokeWidth,
      isDark
    })
  );
};

const loadState = o => {
  const json = localStorage.getItem(STORAGE_KEY) || null;

  if (json) {
    o.loaded = true;
    Object.assign(o, JSON.parse(json));
  }
};

const state = Vue.observable({
  iconType: "Solid",
  iconSize: 5,
  iconStrokeWidth: 2,
  isDark: false
});

export const mapCache = (...args) => {
  let o = {};
  args.forEach(x => {
    o[x] = {
      get() {
        // console.log("GET", x, state[x]);
        return state[x];
      },
      set(value) {
        this.$set(state, x, value);
        // console.log("SET", x, value, state);
        saveState(value);
      }
    };
  });
  return o;
};

loadState(state);

export default state;
