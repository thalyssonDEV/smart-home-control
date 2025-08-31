import React, {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
// import { fetchData } from "../infrastructure/fetch-data";

export type AdminContextType = {};

type AdminProviderProps = {
  children: ReactNode;
};

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [totalPage, setTotalPages] = useState<number>(0);

  const [admins, setAdmins] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);

  const value = useMemo(() => ({}), []);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
