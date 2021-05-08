import useAxios from "axios-hooks";

export default function useGetDevices() {
  const [{ data, loading, error }, refetchDevices] = useAxios(
    process.env.REACT_APP_BASE_URL
  );

  return {
    devices: data || [],
    devicesLoading: loading,
    devicesError: error,
    refetchDevices,
  };
}
