import axios from "axios";
import { ErrorInterface, GetAdsPropsInterface, ProfileContextInterface } from "../types";
import { useOutletContext } from "react-router-dom";

export const getAds = ({
  functionProps: {
    page,
    PER_PAGE,
    sortingParams,
    subString,
    category = "",
    subCategory = "",
  },
  setAds,
  setPageCount,
  setAdsAmount,
  setAdsLoading
}: GetAdsPropsInterface) => {
  setAdsLoading(true);
  axios
    .get("/api/ads/", {
      params: {
        page,
        perPage: PER_PAGE,
        field: sortingParams && sortingParams[0] || undefined,
        order: sortingParams && sortingParams[1] || undefined,
        subString: subString || undefined,
        category: category || undefined,
        subCategory: subCategory || undefined,
      }
    })
    .then(({ data }) => {
      setAds(data.length ? data : null);
      axios.get("/api/count_ads", {
        params: {
          subString: subString || undefined,
          category: category || undefined,
          subCategory: subCategory || undefined,
        }
      })
        .then(({ data }) => {
          setPageCount(Math.ceil(data / PER_PAGE));
          setAdsAmount(data);
          setAdsLoading(false);
        });
    })
    .catch(error => console.error("The error occured: ", error.message));
};

export const errorFound = (errors: Array<ErrorInterface>, field: string): ErrorInterface | undefined => errors.find(el => el.field === field);
export const resetErrors = (errors: Array<ErrorInterface>, field: string, setErrors: (cb: (prev: Array<ErrorInterface>) => Array<ErrorInterface>) => void): void => {
  errorFound(errors, field) && setErrors(prev => prev.filter((el => el.field !== field)));
};

export const useProfileContext = (): ProfileContextInterface => useOutletContext<ProfileContextInterface>();