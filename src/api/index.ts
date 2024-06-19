/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const createNotePageApi = async (data: any) => {
  const req = await axios.post(
    `http://localhost:3001/api/v1/notes`,
    JSON.stringify(data),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return req.data;
};

export const getPagesApi = async () => {
  const req = await axios.get("http://localhost:3001/api/v1/notes");
  return req.data;
};

export const updateNoteApi = async (data: any) => {
  return await axios.put(
    `http://localhost:3001/api/v1/notes`,
    JSON.stringify(data),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};

export const softDeletePageApi = async (id: string) => {
  return await axios.put(`http://localhost:3001/api/v1/notes/${id}`);
};

export const uploadFile = async (file: any) => {
  return await axios.post(
    "http://localhost:3001/api/v1/notes/uploadFile",
    file,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false
    }
  );
};
