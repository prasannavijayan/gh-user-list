import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `https://api.github.com/users?since=${(page - 1) * 10}&per_page=10`;
        if (searchTerm.trim() === '') {
          const response = await fetch(url);
          const data = await response.json();
          setUsers(data);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [page, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() !== '') {
        setLoading(true);
        fetch(`https://api.github.com/search/users?q=${searchTerm}&since=${(page - 1) * 10}&per_page=10`)
          .then((response) => response.json())
          .then((data) => {
            setUsers(data.items);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, page]);

  return (
    <UserContext.Provider value={{ users, loading, page, setPage, searchTerm, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  );
};
