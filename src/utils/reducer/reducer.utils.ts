export const createAction = <T extends string, P>(type: T, payload?: P) => {
  return { type, payload };
};
