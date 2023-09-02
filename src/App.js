import './App.css';
import Auth from './Component/Auth';
import SignIn from './Component/Auth/SignIn';
import SignOut from './Component/Auth/SignOut';
import Create from './Component/Crud/Create';
import Read from './Component/Crud/Read';
function App() {
  return (
    <div  className='App'>
      <header >
          {/* <Auth /> */}
          <SignIn/>
          <SignOut/>
          <Read/>
          <Create/>
      </header>
    </div>
  );
}

export default App;
