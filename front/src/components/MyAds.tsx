import { useState, useEffect, useContext, FC } from 'react';
import axios from 'axios';
import { Skeleton } from "@mui/material";
import { UserContext } from './UserContext';
import { AdInterface } from "../types";
import AdCard from './AdCard';

const MyAds: FC = () => {
  const { user } = useContext(UserContext);
  const [myAds, setMyAds] = useState<Array<AdInterface> | null>(null);
  const [adsLoading, setAdsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setAdsLoading(true);
      axios
        .get(`/api/ads/${user._id}`)
        .then(({ data }) => {
          setMyAds(data);
          setAdsLoading(false)
        })
        .catch(error => {
          console.error("The error occured: ", error.message);
          setAdsLoading(false);
        })
    }

  }, [user]);

  return (
    <div className="my-ads-container">
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
        myAds?.map(ad => (
          <AdCard ad={ad} />
        ))
      }
    </div>
  );
};

export default MyAds;