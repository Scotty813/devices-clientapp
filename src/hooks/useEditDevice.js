import useAxios from "axios-hooks";

export default function useEditDevice() {
  // eslint-disable-next-line no-unused-vars
  const [_, editDevice] = useAxios(
    {
      baseURL: process.env.REACT_APP_BASE_URL,
      method: "put",
    },
    {
      manual: true,
    }
  );

  return (device) => {
    const { id, ...rest } = device;
    editDevice({
      url: `/${id}`,
      data: {
        ...rest,
      },
    });
  };
}
