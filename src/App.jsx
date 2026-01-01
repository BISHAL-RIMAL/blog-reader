import { useState } from "react";
import { useEffect } from "react";
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if(!response.ok)
      { throw new Error("Failed To Load"); }
      return response.json();
    })
    .then(data => {
      const items = data.slice(0,20);
      setBlogs(items);
      setFilter(items);
      setLoading(false);
    })
    .catch(error => {
      setError("Failed To Load");
      setLoading(false);
    });
  }, []);

  const Dropdown = (e) => {
    const UserId = e.target.value;
    setUser(UserId);

    if(UserId === '') {
      setFilter(blogs);
    } else {
      setFilter(blogs.filter(blog => blog.userId  === parseInt(UserId)));
    }
  };

  if(loading)
    { return <p className="load">Loading...</p>; }
  if(error)
    { return <p className="err">{error}</p>; }

  return (
    <div>
      <h1>Blog Reader</h1>
      <select onChange={Dropdown} value={user}>
        <option value="">All</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      <div>
        {filter.map(blog => (
          <div key={blog.id}>
            <p className="title">{blog.title}</p>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;