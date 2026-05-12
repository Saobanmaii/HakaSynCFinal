"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "./types";
import { CURRENT_USER } from "./mockData";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authed = document.cookie.includes("mock-auth=true");
    if (authed) setUser(CURRENT_USER);
    setIsLoading(false);
  }, []);

  const login = async (_email: string, _password: string) => {
    document.cookie = "mock-auth=true; path=/; max-age=604800";
    setUser(CURRENT_USER);
  };

  const logout = async () => {
    document.cookie = "mock-auth=; path=/; max-age=0";
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
