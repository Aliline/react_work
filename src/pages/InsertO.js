import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

const InsertO = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const [orderchecked, setorderChecked] = useState(true);
  const insertProd = (PD, PID, UN, CO) => {
    // filter outing the user.
    fetch('http://localhost/php-react/add-order.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: PD, prodID: PID, QTY: UN, discount: CO,
      }),
    })
      .then((res) => {
        const d = res.json();
        // console.log(d);
        return d;
      })
      .then((data) => {
        if (data.success) {
          // console.log('users:');
          // console.log(user);
          alert('新增成功');
          navigate('/app/OrderDetailList', { replace: true });
        } else {
          alert(data.msg);
        }
        // console.log('ipd:');
        // console.log(pd);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertOrder = (OD, ED, CD, DATE) => {
    // filter outing the user.
    fetch('http://localhost/php-react/add-sales.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: OD, empID: ED, custID: CD, date: DATE,
      }),
    })
      .then((res) => {
        const d = res.json();
        // console.log(d);
        return d;
      })
      .then((data) => {
        if (data.success) {
          // console.log('users:');
          // console.log(user);
        } else {
          alert(data.msg);
        }
        // console.log('ipd:');
        // console.log(pd);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>InsertOrder | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              orderID: 'testO1',
              empdID: 'test001',
              custID: 'test01',
              orderdate: '2021-06-24',
              prodID: 'TO000111',
              QTY: '5000',
              discount: '0.56',
            }}
            validationSchema={Yup.object().shape({
              orderID: Yup.string().max(255).required('orderID is required'),
              empdID: Yup.string().max(255).required('empdID is required'),
              custID: Yup.string().max(255).required('custID is required'),
              orderdate: Yup.string().max(255).required('orderdate is required'),
              prodID: Yup.string().max(255).required('prodID is required'),
              QTY: Yup.string().max(255).required('QTY is required'),
              discount: Yup.string().max(255).required('discount is required'),
            })}
            onSubmit={(values, props) => {
              console.log(props);
              if (checked) {
                insertOrder(values.orderID, values.empdID, values.custID, values.orderdate);
                insertProd(values.orderID, values.prodID, values.QTY, values.discount,);
              } else if (orderchecked) {
                insertProd(values.orderID, values.prodID, values.QTY, values.discount,);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    新增訂單明細
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    新增訂單等細項
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  />
                  <Grid
                    item
                    xs={12}
                    md={6}
                  />
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    訂單明細:
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.orderID && errors.orderID)}
                  fullWidth
                  helperText={touched.orderID && errors.orderID}
                  label="訂單編號"
                  margin="normal"
                  name="orderID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.orderID}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.empdID && errors.empdID)}
                  fullWidth
                  helperText={touched.empdID && errors.empdID}
                  label="員工編號"
                  margin="normal"
                  name="empdID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.empdID}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.custID && errors.custID)}
                  fullWidth
                  helperText={touched.custID && errors.custID}
                  label="客戶編號"
                  margin="normal"
                  name="custID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.custID}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.orderdate && errors.orderdate)}
                  fullWidth
                  helperText={touched.orderdate && errors.orderdate}
                  label="訂單日期"
                  margin="normal"
                  name="orderdate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                  value={values.orderdate}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.prodID && errors.prodID)}
                  fullWidth
                  helperText={touched.prodID && errors.prodID}
                  label="產品編號"
                  margin="normal"
                  name="prodID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.prodID}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.QTY && errors.QTY)}
                  fullWidth
                  helperText={touched.QTY && errors.QTY}
                  label="數量"
                  margin="normal"
                  name="QTY"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.QTY}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.discount && errors.discount)}
                  fullWidth
                  helperText={touched.discount && errors.discount}
                  label="折扣"
                  margin="normal"
                  name="discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.discount}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                    )}
                    label="新增訂單"
                  />
                  <FormControlLabel
                    control={(
                      <Checkbox
                        checked={orderchecked}
                        onChange={() => setorderChecked(!orderchecked)}
                      />
                    )}
                    label="新增明細"
                  />
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    inputProps={{
                      'aria-label': 'secondary checkbox'
                    }}
                  >
                    新增!
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default InsertO;
