import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
function NoteCard({ id, title, content, date, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete the Note");
      console.log("Note deletion error", error);
    }
  };
  return (
    <Link
      to={`/note/${id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
      key={id}
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{title}</h3>
        <h3 className="line-clamp-3 text-base-content/70">{content}</h3>
        <div className="card-actions flex justify-between items-center mt-4">
          <span className="text-sm text-base-content/60 ">
            {formatDate(new Date(date))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error "
              onClick={(e) => {
                handleDelete(e, id);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
