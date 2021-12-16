import React, { useState, useEffect } from "react";
import useStyles from "./listStyles";
import { List, Divider, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard";
import { Pagination } from '@mui/material';

const ItemList = (props) => {
  const classes = useStyles();
  const itemsPerPage = 10;
  const { items } = props;
  const [page, setPage] = useState(1); // init page num

  // set default value for page(const)
  const [numOfPage, setNumOfPage] = useState(
    Math.ceil(items.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(()=>{
    setNumOfPage(Math.ceil(items.length / itemsPerPage))
  })

  return (
    <div>
      <div>
        {items
          .slice((page-1) * itemsPerPage, page * itemsPerPage)
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
  items: PropTypes.array,
};

export default ItemList;
