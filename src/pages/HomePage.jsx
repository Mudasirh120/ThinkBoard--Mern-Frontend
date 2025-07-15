import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from "react";
import RateLimitUI from "../components/RateLimitUI";
import Axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NoteNotFound from "../components/NoteNotFound.jsx";
function HomePage() {
  const [isRateLimit, setisRateLimit] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        await Axios.get("http://127.0.0.1:5001/api/notes").then((res) => {
          setNotes(res.data);
          setisRateLimit(false);
        });
      } catch (error) {
        console.log("Error fetching notes from db : FRONTEND", error);
        if (error.response.status === 429) {
          setisRateLimit(true);
        } else {
          toast.error("Failed to load notes.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimit && <RateLimitUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {Loading && (
          <div className="text-center text-primary py-10 font-bold">
            Loading Notes ...
          </div>
        )}
        {Notes.length === 0 && !isRateLimit && !Loading && <NoteNotFound />}
        {Notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Notes.map((note) => (
              <NoteCard
                id={note._id}
                title={note.title}
                content={note.content}
                date={note.createdAt}
                setNotes={setNotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
