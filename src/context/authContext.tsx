import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
type StoredUser = {
  name: string;
  email: string;
  password: string;
};



type AuthContextType = {
  user: StoredUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

const getUsers = async (): Promise<StoredUser[]> => {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = async (users: StoredUser[]) => {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {

      const storedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
      console.log(storedUser, "Rabin");
      setIsLoading(false)
      if (storedUser) setUser(JSON.parse(storedUser));

    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const users = await getUsers();

    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Incorrect credentials.');
    }

    setUser({ name: foundUser.name, email: foundUser.email, password: '' });
    await AsyncStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify({ name: foundUser.name, email: foundUser.email })
    );
  };


  const signup = async (name: string, email: string, password: string) => {
    const users = await getUsers();

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      throw new Error('Email already registered');
    }

    const newUser = { name, email, password };

    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);

    setUser({ name, email, password });
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, email }));
  };



  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
