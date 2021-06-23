import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import TablePaginationActions from 'src/components/OrderDetail/TablePaginationActions';

const OrderDetailListResults = ({ customers, ...rest }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userLength, setUserLength] = useState(null);
  // const handleSubmitU = (user) => {
  // // const data = {
  // //   id: prodID,
  // //   prodname: prodName,
  // //   unitprice: unitPrice,
  // //   cost: Cost,
  // // };
  // console.log(user);
  // // navigate('/app/UpdateP', { replace: true, state: data });
  // };
  const handleSubmitD = (theID) => {
    console.log(theID);
    // const userDeleted = users.filter((user) => {
    //   console.log(user);
    //   return user.id !== theID;
    // });
    fetch('http://localhost/php-react/delete-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Seq: theID }),
    })
      .then((res) => {
        const d = res.json();
        // console.log(d);
        return d;
      })
      .then((data) => {
        if (data.success) {
          // setUsers(userDeleted);
          // setUserLength(users.length);
          alert('刪除成功');
          navigate('/app/dashboard', { replace: true });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch('http://localhost/php-react/all-order.php')
      .then((res) => {
        const d = res.json();
        return d;
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(data.users.length);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(users);
  // console.log(userLength);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const handleFirstPageButtonClick = (event) => {
  //   handlePageChange(event, 0);
  // };

  // const handleBackButtonClick = (event) => {
  //   handlePageChange(event, page - 1);
  // };

  // const handleNextButtonClick = (event) => {
  //   handlePageChange(event, page + 1);
  // };

  // const handleLastPageButtonClick = (event) => {
  //   handlePageChange(event, Math.max(0, Math.ceil(users.length / limit) - 1));
  // };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  訂單標號
                </TableCell>
                <TableCell>
                  產品ID
                </TableCell>
                <TableCell>
                  數量
                </TableCell>
                <TableCell>
                  折扣
                </TableCell>
                <TableCell>
                  修改
                </TableCell>
                <TableCell>
                  刪除
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(limit > 0
                ? users.slice(page * limit, page * limit + limit)
                : users
              ).map((user) => (
                <TableRow
                  hover
                  key={user.SEQ}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar>
                        {getInitials(user.SEQ)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.orderID}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.prodID}
                  </TableCell>
                  <TableCell>
                    {user.QTY}
                  </TableCell>
                  <TableCell>
                    {user.discount}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        console.log(user);
                        navigate('/app/UpdateO', { replace: true, state: user });
                      }}
                    >
                      修改
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        if (window.confirm('Are you sure?')) {
                          handleSubmitD(user.SEQ);
                        }
                      }}
                    >
                      刪除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={userLength}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        ActionsComponent={TablePaginationActions}
      />
    </Card>
  );
};

OrderDetailListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default OrderDetailListResults;
