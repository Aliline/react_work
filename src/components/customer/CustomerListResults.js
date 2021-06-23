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

const CustomerListResults = ({ customers, ...rest }) => {
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
    fetch('http://localhost/php-react/delete-prod.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prodID: theID }),
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
    fetch('http://localhost/php-react/all-product.php')
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  產品名稱
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  單位價格
                </TableCell>
                <TableCell>
                  成本
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
                  key={user.prodID}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar>
                        {getInitials(user.prodName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {user.prodName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.prodID}
                  </TableCell>
                  <TableCell>
                    {user.unitPrice}
                  </TableCell>
                  <TableCell>
                    {user.cost}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        console.log(user);
                        navigate('/app/UpdateP', { replace: true, state: user });
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
                          handleSubmitD(user.prodID);
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
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
