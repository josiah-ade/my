import { handleError } from "@/components/common/exception/serviceexception";
import { ILimitData } from "@/typings/interface/component/layout/menu";
import axios from "axios";

export async function getStatsDetails(): Promise<ILimitData> {
  return axios
    .get<ILimitData>("/business/config")
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}
