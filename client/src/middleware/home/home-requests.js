const homePath = "/home";

const _wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc;
  } catch {
    return { type: "error", msg: "Something went wrong" };
  }
};

const _getMasters = async ({ city, date, service, hours }) => {
  const url = `${homePath}/find`;
  const params = `?city=${JSON.stringify(
    city
  )}&date=${date}&service=${JSON.stringify(service)}&hours=${hours}`;
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

export const getFreeMasters = async (data) => _wrapTryCatch(_getMasters(data));
export const getCustomer = async (data) => _wrapTryCatch(_upsertCustomer(data));
export const loginUser = async (data) => _wrapTryCatch(_login(data));
