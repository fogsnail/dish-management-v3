import * as Types from "../constants/index";
export const actShowOrder = (order) => {
  console.log(order);
  return {
    type: Types.ORDER,
    order,
  };
};
