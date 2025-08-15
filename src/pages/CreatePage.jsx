import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import Toast, { toast } from "react-hot-toast";
import api from "../lib/axios.js";
function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return Toast.error("All fields are required.");
    }
    setLoading(true);
    try {
      await api.post("/api/notes", { title, content });
      toast.success("Note Created Successfully.");
      Navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating note too fast", {
          duration: 4000,
          icon: "☠️",
        });
      } else {
        toast.error("Failed to create the note");
      }
      console.log("Unable to create post.", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleForm}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={Loading}
                  >
                    {Loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
