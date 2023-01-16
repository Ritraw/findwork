import Nav from './Nav';
import { UserProvider } from './components/context/userContext';
function App() {
  return (
    <div className='App'>
      <UserProvider>
        <Nav/>
      </UserProvider>
    </div>
  );
}

export default App;
