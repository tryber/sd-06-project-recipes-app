const randomCall = async (param) => {
  const randomCallApi = await fetch(param);
  return randomCallApi.json();
};

export default randomCall;
