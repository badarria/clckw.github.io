const homePath = "/home";

const _wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc;
  } catch {
    return { type: "error", msg: "Something went wrong" };
  }
};

const _getMasters = async ({ city, begin, end }) => {
  const url = `${homePath}/find`;
  const params = `?city=${city}&begin=${begin}&end=${end}`;
  const res = await fetch(`${url}${params}`);
  return res.json();
};

const _upsertCustomer = async (data) => {
  const res = await fetch(`${homePath}/customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

const _login = async (data) => {
  const res = await fetch(`${homePath}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

const _addNewOrder = async (data) => {
  const res = await fetch(`${homePath}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

const _sendConfirmLetter = async (data) => {
  const res = await fetch(`${homePath}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

const _sendRatingLetter = async (data) => {
  const res = await fetch(`${homePath}/rating`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getFreeMasters = async (data) => _wrapTryCatch(_getMasters(data));
export const getCustomer = async (data) => _wrapTryCatch(_upsertCustomer(data));
export const loginUser = async (data) => _wrapTryCatch(_login(data));
export const addNewOrder = async (data) => _wrapTryCatch(_addNewOrder(data));
export const sendConfirmLetter = async (data) =>
  _wrapTryCatch(_sendConfirmLetter(data));
export const sendRatingLetter = async (data) =>
  _wrapTryCatch(_sendRatingLetter(data));
