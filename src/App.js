import React, { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();


const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setUserState((prev) => ({
        ...prev,
        [randomUser]: !prev[randomUser],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [userState]);

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};


const UserList = () => {
  const { userState } = useContext(UserContext);

  return (
    <div>
     
      <ul>
        {Object.entries(userState).map(([name, isOnline]) => (
          <li key={name}>
            {name} {isOnline ? "🟢" : "🔴"}
          </li>
        ))}
      </ul>
    </div>
  );
};


function App() {
  return (
    <UserProvider>
      <div className="App">
     
        <UserList />
      </div>
    </UserProvider>
  );
}

export default App;
