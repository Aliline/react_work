import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Typography,
  Container,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';

import { orange, green } from '@material-ui/core/colors';
import 'fontsource-roboto';

const useStyle = makeStyles({
  root: {
    background: 'linear-gardient(45deg, #FE6B8B, #FF8E53)',
    border: 0,
    marginBottom: 15,
    borderRadius: 15,
    color: 'white',
    padding: '5px 30px',
  }
})

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 36,
      marginBottom: 15,
    }
  },
  // palette: {
  //   primary: {
  //     main: orange[500],
  //   },
  //   secondary: {
  //     main: green[400],
  //   }
  // }
})

function ButtonStyled() {
  const classes = useStyle();
  return <Button className={classes.root}>Test Styled Button</Button>
}

function CheckboxExample() {
  const [checked, setChecked] = React.useState(true)
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          icon={<DeleteIcon />}
          checkedIcon={<SaveIcon />}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{
            'aria-label': 'secondary checkbox'
          }}
        />}
      label="testing"
    />
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='xs'>
        <div className="App">
          <header className="App-header">
            <AppBar>
              <Toolbar>
                <IconButton>
                  <MenuIcon />
                </IconButton>
                <Typography variant='h6' >
                  MUI Themeing
                </Typography>
                <Button>
                  Login
                </Button>
              </Toolbar>
            </AppBar>
            <Typography variant='h2' component='div'>
              Welcome!
            </Typography>
            <Typography variant='subtitlel'>
              Time to learn some MUI
            </Typography>
            <ButtonStyled />
            <Grid container spacing={2} justify='center'>
              <Grid Item xs={3} sm={6}>
                <Paper style={{ height: 75, width: '100%', }} />
              </Grid>
              <Grid Item xs={3} sm={6}>
                <Paper style={{ height: 75, width: '100%', }} />
              </Grid>
              <Grid Item xs={3} sm={6}>
                <Paper style={{ height: 75, width: '100%', }} />
              </Grid>
            </Grid>
            {/* <TextField
                variant='outlined'
                color='secondary'
                type='email'
                label='the time'
                placeholder='test@test.com'
              /> */}
            <CheckboxExample />
            <img src={logo} className="App-logo" alt="logo" />
            <ButtonGroup
              variant='contained'
              size='large'
              style={{
                fontSize: 24
              }}
            >
              <Button
                onClick={() => alert('hi')}
                color='primary'
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                onClick={() => alert('hello')}
                color='secondary'
                startIcon={<DeleteIcon />}
              >
                Discard
              </Button>
            </ButtonGroup>

          </header>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
