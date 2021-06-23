import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
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
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Appcontext from 'src/components/AppContext';
// import AppContext from 'src/components/AppContext.js';
const Login = () => {
  const [user, setUser] = useState(0);
  const navigate = useNavigate();
  const context = useContext(Appcontext);
  const { ToggleTheme } = context;
  const findUser = (theID, pw) => {
    // filter outing the user.
    fetch('http://localhost/php-react/find-user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        const d = res.json();
        // console.log(d);
        return d;
      })
      .then((data) => {
        let pd = 0;
        if (data.success) {
          // console.log('users:');
          setUser(data.users);
          // console.log(user);
          pd = JSON.parse(JSON.stringify(data.users));
        } else {
          alert(data.msg);
        }
        // console.log('ipd:');
        // console.log(pd);
        return pd;
      })
      .then((pd) => {
        console.log(pd);
        if (pd[0].id === theID && pd[0].pw === pw) {
          ToggleTheme(pd[0].id, pd[0].user_email, pd[0].user_name, pd[0].dept_name);
          navigate('/app/dashboard', { replace: true });
        } else {
          alert('帳號或密碼錯誤');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
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
              email: '00002',
              password: '035-780050'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(255).required('ID is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              // console.log(values.email);
              // console.log(values.password);
              findUser(values.email, values.password);
              // console.log('return:');
              // console.log(test);
              // console.log('foreach:');
              // console.log(test.length);
              // test.forEach((item, index) => {
              //   console.log(item, index);
              // });
              console.log(user.id);
              // console.log(user.pw);
              // if (user.id === values.email && user.pw === values.password) {

              // }
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
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
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
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={handleSubmit}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
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
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Employee ID"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
                    Sign in now
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

export default Login;
