let arr = [];

export default {
  push(obj) {
    arr.push(obj);
  },
  clear() {
    arr = [];
  },
  get() {
    return arr;
  },
};
