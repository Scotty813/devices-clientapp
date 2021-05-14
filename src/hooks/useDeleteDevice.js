import useAxios from "axios-hooks";

export default function useDeleteDevice() {
  // eslint-disable-next-line no-unused-vars
  const [_, deleteDevice] = useAxios(
    {
      baseURL: process.env.REACT_APP_BASE_URL,
      method: "delete",
    },
    {
      manual: true,
    }
  );

  return (id) =>
    deleteDevice({
      url: `/${id}`,
    });
}
