import type Note from "../../types/note";
import { useMutation } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";

export interface NoteListProps {
  notes: Note[];
  onMutated?: () => void;
}

export default function NoteList({ notes, onMutated }: NoteListProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      onMutated?.();
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await mutateAsync(id);
    } catch {
      //   console.error();
    }
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
