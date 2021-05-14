import useAxios from "axios-hooks";

export default function useAddNewDevice() {
  // eslint-disable-next-line no-unused-vars
  const [_, addNewDevice] = useAxios(
    {
      baseURL: process.env.REACT_APP_BASE_URL,
      method: "post",
    },
    {
      manual: true,
    }
  );

  return (device) =>
    addNewDevice({
      data: device,
    });
}
