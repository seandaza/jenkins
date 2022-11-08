import React, { createContext, useEffect, useState } from 'react';
import { getBasicInfo } from '../services/get-basic-info';

/**
 * @typedef ContextType
 * @property {string} token
 * @property {import('../models/user').default} user
 * @property {React.Dispatch<string>} setToken
 * @property {React.Dispatch<import('../models/user').default>} setUser
 * @property {string} sessionLoan
 * @property {React.Dispatch<string>} setSessionLoan
 */

/**
 * @type {React.Context<ContextType>}
 */
export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [sessionLoan, setSessionLoan] = useState();

  useEffect(() => {
    if (!user && token) {
      const getUserInfo = async () => {
        try {
          setUser(await getBasicInfo(token));
        } catch ({ response }) {
          if (response?.status === 401) {
            window.location.href = process.env.REACT_APP_BILLPOCKET_LOGIN;
          }
        }
      };
      getUserInfo();
    }
  }, [user, token]);

  return (
    <UserContext.Provider
      value={{
        sessionLoan,
        user,
        token,
        setSessionLoan,
        setToken,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
