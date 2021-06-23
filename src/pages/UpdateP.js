import { useNavigate, useLocation } from 'react-router-dom';
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

const UpdateP = (props) => {
  const navigate = useNavigate();
  console.log(props);
  const { state } = useLocation();
  const updateProd = (PD, PID, UN, CO) => {
    // filter outing the user.
    fetch('http://localhost/php-react/update-prod.php', {
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
          alert('修改成功');
          navigate('/app/dashboard', { replace: true });
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
        <title>UpdateProd | Material Kit</title>
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
              prod: state.prodName,
              id: state.prodID,
              unitprice: state.unitPrice,
              cost: state.cost,
            }}
            validationSchema={Yup.object().shape({
              prod: Yup.string().max(255).required('prodName is required'),
              id: Yup.string().max(255).required('ID is required'),
              unitprice: Yup.string().max(255).required('unitprice is required'),
              cost: Yup.string().max(255).required('cost is required'),
            })}
            onSubmit={(values) => {
              updateProd(values.prod, values.id, values.unitprice, values.cost,);
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
                    修改產品
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    修改產品等細項
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
                    修改
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

export default UpdateP;
