import "./App.css";
import { Posts } from "./features/posts/components/Posts";
import { Users } from "./features/users/components/Users";

function App() {
  return (
    <div className="container">
      <Users />
      <Posts />
    </div>
  );
}

export default App;
