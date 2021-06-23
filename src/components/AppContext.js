import React from 'react';

const AppContext = React.createContext({
  jobTitle: 'Test Developer',
  name: 'Katarina Test',
  id: '00002',
  deptName: 'test',
  toggleTheme: () => { },
});

export default AppContext;
