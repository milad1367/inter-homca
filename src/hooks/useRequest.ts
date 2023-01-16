import { useMemo } from "react";
import axios from "axios";

const useRequest = (url: string) => {
  const token = null; //get token from context
  const request = useMemo(() => {
    return axios.create({
      baseURL: url,
      timeout: 10000,
      headers: token
        ? {
            "content-type": "application/json",
            Authorization: "Bearer " + token,
          }
        : {
            "content-type": "application/json",
          },
    });
  }, [url]);

  request.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response && error?.response?.status === 401) {
        window.localStorage.removeItem("token");
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  const get = (arg: any, config?: any) => {
    return request.get(arg, config);
  };
  const deleteRequest = (arg: any) => {
    return request.delete(arg);
  };
  const post = (arg: any, body: any) => {
    return request.post(arg, body);
  };
  const postWithHeader = (arg: any, body: any, configs: any) => {
    return request.post(arg, body, configs);
  };
  const patch = (arg: any, body: any) => {
    return request.patch(arg, body);
  };
  const put = (arg: any, body: any) => {
    return request.put(arg, body);
  };

  const all = axios.all;
  const spread = axios.spread;

  return {
    request,
    get,
    post,
    put,
    deleteRequest,
    patch,
    all,
    spread,
    postWithHeader,
  };
};

export default useRequest;
