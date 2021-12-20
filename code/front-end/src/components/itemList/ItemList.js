import React, { useState, useEffect } from "react";
import useStyles from "./listStyles";
import { List, Divider, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard";
import { Pagination } from '@mui/material';
import ItemCardforBook from "./ItemCardforBook";

const ItemList = (props) => {
  const classes = useStyles();
  const itemsPerPage = 10;
  const { items_citiao, items_shuben } = props;
  const [page, setPage] = useState(1); // init page num

  // set default value for page(const)
  const [numOfPage, setNumOfPage] = useState(
    Math.ceil((items_citiao.length + items_shuben.length) / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  }

  return (
    <div>
      <div>
        {items_shuben
          .slice((page-1) * 2, page * 2)
          .map(item => <ItemCardforBook data={item} />)
        }
        {items_citiao
          .slice((page-1) * (itemsPerPage-2), page * (itemsPerPage-2))
          .map(item => <ItemCard data={item} />)
        }
      </div>
      <Divider />
      <Box component="span">
        <Pagination
          count={numOfPage}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="standard"
          size="large"
          showFirstButton
          showLastButton
          classes={{ ul: classes.paginator }}
        />
      </Box>
    </div>
  );
};

ItemList.propType = {
  items_citiao: PropTypes.array,
  items_shuben: PropTypes.array,
};

export default ItemList;
