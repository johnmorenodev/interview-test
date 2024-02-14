import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { UsersTable } from "./features/users/components/UsersTable";

function App() {
  return (
    <div className="container">
      <UsersTable />
    </div>
  );
}

export default App;
