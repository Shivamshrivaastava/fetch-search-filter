import { useEffect, useMemo, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setUsers(data.users);
        console.log(data.users)
      } catch (error) {
        setError("failed to fetch");
      } finally {
        setLoading(false);
      }
      
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLocaleLowerCase());

      const matchesGender = gender === "all" || user.gender === gender;
      return matchesSearch && matchesGender;
    });
  }, [users, search, gender]);

  if (loading) {
    return <h2 className="status">Loading....</h2>;
  }
  if (error) {
    return <h2 className="status error">{error}</h2>;
  }
  return (
    <div className="container">
      <h1 className="title">Users Directory</h1>
      <div className="controls">
      <input
        type="text"
        placeholder="search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="all">All</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      </div>
      <div className="grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            <img src={user.image} alt={user.firstName} />
            <h3>
                {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>
            <span className="badge">
                {user.gender}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
