import { string } from "joi";
import _, { isInteger } from "lodash";
export default (products) => {
  if (products) {
    const total = products.reduce((acc, current) => {
      if (
        typeof current?.price === string ||
        !isInteger(current?.selection?.quantity)
      ) {
        return (
          acc +
          JSON.parse(current.price) * JSON.parse(current.selection.quantity)
        );
      } else {
        return acc + current.price * current.selection.quantity;
      }
    }, 0);
    return total;
  } else {
    return -1;
  }
};
