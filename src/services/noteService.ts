import axios, { type AxiosInstance, type AxiosResponse } from "axios";
// import type NoteTag from "../types/note.ts";
import type Note from "../types/note.ts";

const token = import.meta.env.VITE_NOTEHUB_TOKEN as string;
const BASE_URL = "https://notehub-public.goit.study/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

export interface DeleteNoteResponse {
  note: Note;
}

export async function fetchNotes(
  params: FetchNotesParams
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "" } = params;

  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search: search || undefined },
  });

  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  const response: AxiosResponse<DeleteNoteResponse> = await api.delete(
    `/notes/${id}`
  );
  return response.data;
}
