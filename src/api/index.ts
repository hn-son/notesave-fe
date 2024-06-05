/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const createNotePageApi = async (data: any) => {
  const req = await axios.post(`http://localhost:3001/api/v1/notes`, JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
  return req.data;
};
