export const setObj = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj));
};

export const getObj = (obj) => {
  return JSON.parse(localStorage.getItem(obj));
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};

// export { setObj, getObj };
