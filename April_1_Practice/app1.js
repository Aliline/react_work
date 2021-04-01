import React from 'react';

class App extends React.Component {
   render() {
      return (
         <div>
            <h1> this is made by Components</h1>
            <Header/>
            <Content/>
         </div>
      );
   }
}
const Header = () => {
      return (
         <div>
            <h1>And this is came from ArrowFunc!</h1>
         </div>
      );

}
function Content(){
      return (
         <div>
            <h2>And this is came from func Components </h2>
         </div>
      );
}

export default App;