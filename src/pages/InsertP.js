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
  Typography
} from '@material-ui/core';

const InsertP = () => {
  const navigate = useNavigate();
  const insertProd = (PD, PID, UN, CO) => {
    // filter outing the user.
    fetch('http://localhost/php-react/add-prod.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prodName: PD, prodID: PID, unit: UN, cost: CO,
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
          navigate('/app/customers', { replace: true });
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
        <title>InsertProd | Material Kit</title>
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
              prod: 'testProd1',
              id: 'TT0001111',
              unitprice: '4000',
              cost: '2000',
            }}
            validationSchema={Yup.object().shape({
              prod: Yup.string().max(255).required('prodName is required'),
              id: Yup.string().max(255).required('ID is required'),
              unitprice: Yup.string().max(255).required('unitprice is required'),
              cost: Yup.string().max(255).required('cost is required'),
            })}
            onSubmit={(values) => {
              insertProd(values.prod, values.id, values.unitprice, values.cost,);
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
                    新增產品
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    新增產品等細項
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
                    產品明細:
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.prod && errors.prod)}
                  fullWidth
                  helperText={touched.prod && errors.prod}
                  label="產品名稱"
                  margin="normal"
                  name="prod"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.prod}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="ID"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.id}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.unitprice && errors.unitprice)}
                  fullWidth
                  helperText={touched.unitprice && errors.unitprice}
                  label="單價"
                  margin="normal"
                  name="unitprice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.unitprice}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.cost && errors.cost)}
                  fullWidth
                  helperText={touched.cost && errors.cost}
                  label="成本"
                  margin="normal"
                  name="cost"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.cost}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
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

export default InsertP;
