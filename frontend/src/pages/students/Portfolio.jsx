import React, { useState, useEffect } from "react";
import { getStudentPortfolio, uploadProject } from "../../api/student";
import Loader from "../../components/Loader";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    image: null,
  });

  /* ================= FETCH PORTFOLIO ================= */
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await getStudentPortfolio();
        setProjects(data || []);
      } catch (err) {
        setError("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      alert("Title and description are required");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("tags", form.tags);
      if (form.image) payload.append("image", form.image);

      const newProject = await uploadProject(payload);
      setProjects((prev) => [newProject, ...prev]);

      setIsUploading(false);
      setForm({ title: "", description: "", tags: "", image: null });
    } catch (err) {
      alert("Project upload failed");
    }
  };

  /* ================= UI ================= */
  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Portfolio</h1>
        <button
          onClick={() => setIsUploading(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Project
        </button>
      </header>

      {/* Portfolio Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
            >
              <img
                src={project.imageUrl || "/placeholder.png"}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {project.description}
                </p>

                {project.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">Your portfolio is empty</p>
          <p className="text-sm mt-1">
            Upload projects to showcase your skills
          </p>
        </div>
      )}

      {/* ================= UPLOAD MODAL ================= */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <form
            onSubmit={handleUpload}
            className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>

            <input
              name="title"
              placeholder="Project title"
              className="input mb-3"
              value={form.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Project description"
              className="input mb-3 h-24"
              value={form.description}
              onChange={handleChange}
              required
            />

            <input
              name="tags"
              placeholder="Tags (comma separated)"
              className="input mb-3"
              value={form.tags}
              onChange={handleChange}
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              className="mb-4"
              onChange={handleChange}
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsUploading(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
