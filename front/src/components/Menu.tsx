import { useState, useEffect, FC, MouseEvent } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import { MenuPropsInterface, DataMenuInterface, MenuInterface } from '../types';

const Menu: FC<MenuPropsInterface> = ({ getAdsProps, setSubString, setCategory, setSubCategory }) => {
  const [stableItems, setStableItems] = useState<Array<MenuInterface>>([]);
  const [listItems, setListItems] = useState<Array<MenuInterface>>([]);
  const [menuLoading, setMenuLoading] = useState(false);

  const { subString, category, subCategory } = getAdsProps.functionProps;

  useEffect(() => {
    setMenuLoading(true);
    axios
      .get("/api/menu")
      .then(({ data }) => {
        const items = data.map((e: DataMenuInterface): MenuInterface => {
          return {
            ...e,
            contents: e.contents.map(el => {
              return {
                text: el,
                selected: false,
              };
            }),
            open: false,
            selected: false,
          };
        });
        setListItems(items);
        setStableItems(items);
        setMenuLoading(false);
      })
      .catch(error => console.error("The error occured: ", error.message));
  }, []);

  const onItemClick = (e: MouseEvent<HTMLDivElement>) => {
    subCategory && setSubCategory("");
    const target = e.target as HTMLDivElement;
    const innerText = target.innerText;
    setListItems(stableItems.map(stableItem => {
      const condition = stableItem.title === innerText;
      return {
        ...stableItem,
        open: condition ? true : false,
        selected: condition ? true : false,
      };
    }));
    subString !== "" && setSubString("");
    setCategory(innerText);
  }

  const onSubItemClick = (e: MouseEvent<HTMLDivElement>) => {
    category && setCategory("");
    const target = e.target as HTMLDivElement;
    const innerText = target.innerText;
    setListItems(
      stableItems.map(stableItem => {
        return {
          ...stableItem,
          open: stableItem.contents
            .map(el => el.text)
            .includes(innerText) && true,
          contents: stableItem.contents
            .map(stableSubItem => {
              return {
                ...stableSubItem,
                selected: stableSubItem.text === innerText && true,
              };
            }),
        };
      })
    );
    setSubCategory(innerText);
  }

  return (
    <div className="menu-container">
      {menuLoading ?
        <Skeleton
          variant="rectangular"
          className="skeleton"
        /> :
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {listItems.map(li => {
            return (
              <>
                <ListItemButton
                  onClick={e => onItemClick(e)}
                  selected={li.selected}
                >
                  <ListItemText primary={li.title} />
                  {li.open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={li.open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {li.contents.map((subItem) => {
                      return (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={e => onSubItemClick(e)}
                          selected={subItem.selected}
                        >
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            );
          })}
        </List>
      }
    </div>
  );
};

export default Menu;
