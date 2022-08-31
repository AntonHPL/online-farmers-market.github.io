import { useState, useEffect, FC } from 'react';
import Menu from "./Menu";
import { getAds } from "../functions/functions";
import {
  Skeleton,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { SearchOff } from '@mui/icons-material';
import { AdInterface, GetAdsPropsInterface, SortingOptionInterface } from '../types';
import AdCard from "./AdCard";

const Ads: FC = () => {
  const [ads, setAds] = useState<Array<AdInterface> | null>(null);
  const [sortingParams, setSortingParams] = useState<Array<string> | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [adsLoading, setAdsLoading] = useState(false);
  const PER_PAGE = 3;
  const [page, setPage] = useState<number | undefined>(undefined);
  const [subString, setSubString] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [adsAmount, setAdsAmount] = useState(0);

  const defaultPage = 1;
  let getAdsProps: GetAdsPropsInterface = {
    functionProps: {
      page,
      PER_PAGE,
      sortingParams,
      subString,
      category,
      subCategory,
    },
    setAds,
    setPageCount,
    setAdsAmount,
    setAdsLoading,
  };

  const changePage = (page: number): void => {
    setPage(page);
  };

  useEffect(() => {
    page && getAds(getAdsProps);
  }, [page]);

  useEffect(() => {
    page !== defaultPage && setPage(defaultPage);
    getAdsProps = { ...getAdsProps, functionProps: { ...getAdsProps.functionProps, page: defaultPage } };
    page === defaultPage && getAds(getAdsProps);
  }, [sortingParams, category, subCategory]);

  const sortingOptions: Array<SortingOptionInterface> = [
    { value: "price_asc", label: "Price: lowest first" },
    { value: "price_desc", label: "Price: highest first" },
    { value: "creationDate_desc", label: "Date: newest first" },
    { value: "creationDate_asc", label: "Date: oldest first" },
  ];

  return (
    <div className="ads-container">
      <Menu
        getAdsProps={getAdsProps}
        setSubString={setSubString}
        setCategory={setCategory}
        setSubCategory={setSubCategory}
      />
      <div className="main">
        <div className="sorting-and-search">
          <FormControl
            className="sorting"
            size="small"
          >
            <InputLabel id="sorting-select">
              Sorting
            </InputLabel>
            <Select
              labelId="sorting-select"
              id="demo-simple-select"
              label="Sorting"
              defaultValue={"creationDate_desc"}
              onChange={e => {
                setSortingParams(e.target.value.split("_"));
                setPage(1);
              }}
            >
              {sortingOptions.map(e => (
                <MenuItem
                  key={e.value}
                  value={e.value}
                >
                  {e.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search..."
            variant="standard"
            onChange={e => setSubString(e.target.value)}
            value={subString}
            onKeyDown={e => e.code === "Enter" && getAds(getAdsProps)}
            autoComplete="off"
            className={`search${ads ? "-compressed" : ""}`}
          />
          {ads &&
            <div className="ads-amount">
              {adsAmount} {adsAmount === 1 ? "ad" : "ads"} found
            </div>
          }
        </div>
        <div className="ads">
          {adsLoading ?
            function () {
              let content = [];
              for (let i = 0; i < 3; i++) {
                content.push(
                  <Skeleton
                    variant="rectangular"
                    className="skeleton"
                  />
                );
              };
              return content;
            }() :
            ads?.map(ad => (
              <AdCard ad={ad} />
            ))
          }
          {!ads &&
            <div className="plug">
              <SearchOff fontSize="large" />
              <Typography variant="body1">
                Nothing was found. Try to change the Search Criteria.
              </Typography>
            </div>
          }
        </div>
        {pageCount > 1 &&
          <Pagination
            count={pageCount}
            defaultPage={1}
            variant="outlined"
            color="primary"
            size="large"
            onChange={(_, page) => changePage(page)}
            page={page}
            disabled={adsLoading}
          />
        }
      </div>
    </div>
  );
};

export default Ads;