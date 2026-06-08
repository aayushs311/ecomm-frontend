import React from 'react'
import { Pagination } from '@mui/material'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Paginations = (props) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const paramValue = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onChangeHandler = (event, value) => {
    params.set("page", value.toString());
    navigate(`${pathName}?${params}`);
  }

  return (
    <div>
        <Pagination
            count={props.totalPages}
            page={paramValue}
            shape="rounded"
            onChange={onChangeHandler}
            defaultPage={1}
        />
    </div>
  )
}

export default Paginations;