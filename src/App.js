import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import AppContext from 'src/components/AppContext';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import InsertP from 'src/pages/InsertP';
import InsertO from 'src/pages/InsertO';
import UpdateP from 'src/pages/UpdateP';
import UpdateO from 'src/pages/UpdateO';
import OrderDetailList from 'src/pages/OrderDetailList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = (getID, getjob, getname, getdept) => {
      this.setState(() => ({
        ID: getID,
        deptname: getdept,
        jobtitle: getjob,
        Name: getname,
      }));
    };
    this.state = {
      ID: '00002',
      deptname: 'test',
      jobtitle: 'Test Developer',
      Name: 'Katarina Test',
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    const {
      ID, toggleTheme, deptname, jobtitle, Name,
    } = this.state;
    return (
      <AppContext.Provider value={{
        id: ID,
        jobTitle: jobtitle,
        name: Name,
        deptName: deptname,
        ToggleTheme: toggleTheme,
      }}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            <Route path="app" element={<DashboardLayout />}>
              <Route path="account" element={<Account />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="OrderDetailList" element={<OrderDetailList />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="settings" element={<Settings />} />
              <Route path="InsertP" element={<InsertP />} />
              <Route path="UpdateP" element={<UpdateP />} />
              <Route path="InsertO" element={<InsertO />} />
              <Route path="UpdateO" element={<UpdateO />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="login" element={<Login />} />
              <Route path="404" element={<NotFound />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AppContext.Provider>

    );
  }
}
export default App;
