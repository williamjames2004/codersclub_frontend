import { useEffect, useState } from "react";
import axios from "axios";

const Officials = () => {
  const [officials, setOfficials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});
  const [newOfficial, setNewOfficial] = useState({
    regno: "",
    name: "",
    prof: "",
    dept: "",
    role: ""
  });
  // 🔹 Fetch
  const fetchOfficials = async () => {
    const res = await axios.get("https://codersclub-i9xo.onrender.com/clubofficials/officials");
    setOfficials(res.data.data);
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  // 🔹 Update change
  const handleChange = (index, field, value) => {
    const updated = [...officials];
    updated[index][field] = value;
    setOfficials(updated);
  };

  // 🔹 Create form change
  const handleNewChange = (field, value) => {
    setNewOfficial({ ...newOfficial, [field]: value });
  };

  // 🔹 Create official (POST)
  const handleCreate = async () => {
    try {
      await axios.post(
        "https://codersclub-i9xo.onrender.com/clubofficials/createofficial",
        newOfficial
      );

      alert("Official Created!");
      setShowForm(false);
      setNewOfficial({ regno: "", name: "", prof: "", dept: "", role: "" });
      fetchOfficials();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Update
  const handleUpdate = async (official) => {
    await axios.put(
      "https://codersclub-i9xo.onrender.com/clubofficials/updateofficial",
      official
    );
    alert("Updated!");
  };
    const handleImageChange = (regno, file) => {
    setSelectedImages({
        ...selectedImages,
        [regno]: file
    });
    };
    const handleImageUpload = async (regno) => {
      try {
        const formData = new FormData();
        formData.append("regno", regno);
        formData.append("image", selectedImages[regno]);

        await axios.put(
          "https://codersclub-i9xo.onrender.com/clubofficials/uploadimage",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );

        alert("Image uploaded!");
        fetchOfficials();
      } catch (err) {
        console.error(err);
      }
    };
    // 🔹 Delete
    const handleDelete = async (regno) => {
      await axios.delete(
        "https://codersclub-i9xo.onrender.com/clubofficials/deleteofficial",
        { data: { regno } }
      );
      fetchOfficials();
    };

  return (
    <div className="p-6">
        <div className="grid grid-cols-1 gap-6">
            {officials.map((off, index) => (
                <div key={off.regno} className="flex gap-6 shadow-md hover:shadow-xl transition p-5 rounded-2xl">
                  <div className="w-1/3 flex flex-col items-center justify-center border-r pr-4">
                    <img
                      src={`https://codersclub-i9xo.onrender.com/${off.image}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://codersclub-i9xo.onrender.com/${off.image}`;
                      }}
                      alt="official"
                      className="w-50 h-full object-cover mb-3 border"
                    />
                    <input type="file" onChange={(e) => handleImageChange(off.regno, e.target.files[0])} className="text-sm mb-2" />

                    <button onClick={() => handleImageUpload(off.regno)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm cursor-pointer">Upload</button>
                  </div>
                  <div className="w-2/3">
                    <p className="text-sm text-gray-400 mb-2"> Reg No: {off.regno}</p>
                    <input value={off.name} onChange={(e) => handleChange(index, "name", e.target.value)} className="border p-2 w-full mb-2 rounded-lg" placeholder="Name"/>
                    <input value={off.prof} onChange={(e) => handleChange(index, "prof", e.target.value)} className="border p-2 w-full mb-2 rounded-lg" placeholder="Profession"/>

                    <input value={off.dept} onChange={(e) => handleChange(index, "dept", e.target.value)} className="border p-2 w-full mb-2 rounded-lg" placeholder="Department"/>

                    <input value={off.role} onChange={(e) => handleChange(index, "role", e.target.value)} className="border p-2 w-full mb-2 rounded-lg" placeholder="Role"/>

                    <div className="flex gap-3 mt-3">
                      <button onClick={() => handleUpdate(off)} className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-lg cursor-pointer">Save</button>

                      <button onClick={() => handleDelete(off.regno)} className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg cursor-pointer">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-6 py-3 rounded-xl cursor-pointer">Create New Official +</button>
            </div>
          
          {showForm && (
            <div className="mt-6 shadow p-6 rounded-xl max-w-md mx-auto">

              <input placeholder="Reg No / Staff ID"
                value={newOfficial.regno}
                onChange={(e) => handleNewChange("regno", e.target.value)}
                className="border p-2 w-full mb-2" />

              <input placeholder="Name"
                value={newOfficial.name}
                onChange={(e) => handleNewChange("name", e.target.value)}
                className="border p-2 w-full mb-2" />

              <input placeholder="Profession"
                value={newOfficial.prof}
                onChange={(e) => handleNewChange("prof", e.target.value)}
                className="border p-2 w-full mb-2" />

              <input placeholder="Department"
                value={newOfficial.dept}
                onChange={(e) => handleNewChange("dept", e.target.value)}
                className="border p-2 w-full mb-2" />

              <input placeholder="Role"
                value={newOfficial.role}
                onChange={(e) => handleNewChange("role", e.target.value)}
                className="border p-2 w-full mb-4" />

              <button
                onClick={handleCreate}
                className="bg-green-500 text-white px-4 py-2 rounded w-full cursor-pointer"
              >
                Submit
              </button>
          </div>
        )}
    </div>
  );
};

export default Officials;
