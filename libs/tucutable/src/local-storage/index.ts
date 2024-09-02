/* eslint-disable @typescript-eslint/no-explicit-any */

export const isClient = () => typeof window !== 'undefined';

export const storage = {
  get: (key: string) => {
    if (isClient()) {
      try {
        const item = localStorage.getItem(key);
        if (item !== null) {
          if (item !== undefined) return JSON?.parse(item || '');
          return;
        }
      } catch (error) {
        console.error(`localStorage get item cannot be retrieved`);
      }
    }
  },
  set: (key: string, value: any) => {
    if (isClient()) {
      const stringifiedValue = JSON.stringify(value);
      try {
        localStorage.setItem(key, stringifiedValue);
      } catch (error) {
        console.error(
          `localStorage set item cannot be added
          item: ${key} 
          value: ${stringifiedValue}`
        );
        console.error(error);
      }
    }
  },
  remove: (key: string) => {
    if (isClient()) {
      localStorage.removeItem(key);
    }
  },
  clear: () => {
    if (isClient()) {
      localStorage.clear();
    }
  },
};
