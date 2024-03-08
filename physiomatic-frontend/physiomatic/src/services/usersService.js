import { supabase } from "../supabase/client";
import { useAuth } from "../contexts/Auth";

const useSupabase = import.meta.env.VITE_TYPE_DATABASE === "supabase";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const supabaseCreateAdminUser = async (user) => {
  const { signUp } = useAuth();
  const { user: createdUser } = await signUp({
    email: user.email,
    password: user.password,
  });
  return createdUser;
};

const supabaseGetUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetUserById = async (id) => {
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseGetUserByUid = async (uid) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", uid)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

const supabaseCreateUser = async (user) => {
  const { data, error } = await supabase.from("users").insert([user]);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseUpdateUser = async (id, user) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

const supabaseDeleteUser = async (id) => {
  const { error } = await supabase.from("users").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

const localCreateAdminUser = async (user) => {
  // POST http://localhost:3000/api/create-admin-user HTTP/1.1
  const response = await fetch(`${baseUrl}/create-admin-user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localGetUsers = async () => {
  // GET http://localhost:3000/api/users HTTP/1.1
  const response = await fetch(`${baseUrl}/users`);
  const data = await response.json();
  return data;
};

const localGetUserById = async (id) => {
  // GET http://localhost:3000/api/users/1 HTTP/1.1
  const response = await fetch(`${baseUrl}/users/${id}`);
  const data = await response.json();
  return data;
};

const localGetUserByUid = async (uid) => {
  //GET http://localhost:3000/api/users/auth-id/1 HTTP/1.1
  const response = await fetch(`${baseUrl}/users/auth-id/${uid}`);
  const data = await response.json();
  return data;
};

const localCreateUser = async (user) => {
  // POST http://localhost:3000/api/create-user HTTP/1.1
  const response = await fetch(`${baseUrl}/create-user`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localUpdateUser = async (id, user) => {
  //PUT http://localhost:3000/api/update-user/21 HTTP/1.1
  const response = await fetch(`${baseUrl}/update-user/${id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const localDeleteUser = async (id) => {
  // DELETE http://localhost:3000/api/delete-user/21 HTTP/1.1
  const response = await fetch(`${baseUrl}/delete-user/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const createAdminUser = useSupabase
  ? supabaseCreateAdminUser
  : localCreateAdminUser;
export const getUsers = useSupabase ? supabaseGetUsers : localGetUsers;
export const getUserById = useSupabase ? supabaseGetUserById : localGetUserById;
export const getUserByUid = useSupabase
  ? supabaseGetUserByUid
  : localGetUserByUid;
export const createUser = useSupabase ? supabaseCreateUser : localCreateUser;
export const updateUser = useSupabase ? supabaseUpdateUser : localUpdateUser;
export const deleteUser = useSupabase ? supabaseDeleteUser : localDeleteUser;
