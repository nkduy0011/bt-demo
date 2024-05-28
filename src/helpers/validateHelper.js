export const validCheck = (data) => {
  for (var item in data) {
    if (data[item].rules && data[item].rules.length > 0) {
      for (var rule of data[item].rules) {
        let valid;
        console.log(typeof rule);
        if (typeof rule == "function") {
          valid = rule(data[item].value);
        } else if (typeof rule == "object") {
          valid = rule[0](data[item].value, rule[1]);
        }
        if (valid.valid) {
          data[item].error = valid.error;
          break;
        } else {
          delete data[item].error;
        }
      }
    }
  }
  return Object.values(data).find((item) => item.error?.length > 0) != null;
};
export const validRequired = (value) => {
  return {
    valid: value == null || value.length <= 0,
    error: "is required",
  };
};
export const validMaxlength = (value, length) => {
  return {
    valid: value != null && value.length > length,
    error: "maximun length is " + length,
  };
};
export const validMinlength = (value, length) => {
  return {
    valid: value != null && value.length < length,
    error: "minimum length is " + length,
  };
};
