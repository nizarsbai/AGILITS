import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = 'https://our-dev-ed.develop.my.salesforce.com/services/data/v51.0/query?q=SELECT+Id,Name,SmallPhotoUrl+FROM+User';

        if (searchQuery) {
          url += `+WHERE+Name+LIKE+'%${searchQuery}%'`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: 'Bearer 00D8e000000SiXZ!ARkAQM4w1wJUGA0AOIeBQE_Dzw0Lqh5Ki4_CC4.L6gPtWOYji5eiIJUUXyzm60QDrE_skS5kX1_udbrAL1SfgAdNBV4aSzro',
          },
        });

        setUsers(response.data.records);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    setSearchQuery(searchValue);
  };

  return (
    <div className='users'>
      <h1>Utilisateurs Salesforce</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search users..."
        />
        <button type="submit">Search</button>
      </form>
      {users.map((user) => (
        <div key={user.Id}>
          <h3>{user.Name}</h3>
          <img src={user.SmallPhotoUrl} alt={user.Name} />
        </div>
      ))}
    </div>
  );
};

export default Users;
