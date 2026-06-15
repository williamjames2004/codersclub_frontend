import { useState } from "react";
import axios from "axios";

export default function ProfileDataEntry() {
  const [profession, setProfession] = useState("student");

  const [formData, setFormData] = useState({
    admin_id: "",
    officialEmail: "",

    studentAdminProfile: {
      registerNumber: "",
      department: "",
      year: "",
      roleInClub: "",
      responsibilities: "",
      authorityLevel: "",
      availability: ""
    },

    professorAdminProfile: {
      staffId: "",
      department: "",
      designation: "",
      roleInClub: "",
      responsibilities: "",
      authorityLevel: ""
    }
  });

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;

    if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = {
        admin_id: formData.admin_id,
        officialEmail: formData.officialEmail
      };

      if (profession === "student") {
        payload.studentAdminProfile = {
          ...formData.studentAdminProfile,
          year: Number(formData.studentAdminProfile.year),
          authorityLevel: Number(formData.studentAdminProfile.authorityLevel),
          responsibilities:
            formData.studentAdminProfile.responsibilities.split(",")
        };
      } else {
        payload.professorAdminProfile = {
          ...formData.professorAdminProfile,
          authorityLevel: Number(formData.professorAdminProfile.authorityLevel),
          responsibilities:
            formData.professorAdminProfile.responsibilities.split(",")
        };
      }

      const res = await axios.put(
        "https://codersclub-i9xo.onrender.com/admin/profiledataentry",
        payload
      );

      alert("✅ Profile Updated Successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Error updating profile");
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-2">
      <form
        onSubmit={handleSubmit}
        className="shadow-xl rounded-xl p-2 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Profile Data Entry
        </h2>

        {/* PROFESSION SWITCH */}
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setProfession("student")}
            className={`px-4 py-2 rounded ${
              profession === "student"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setProfession("professor")}
            className={`px-4 py-2 rounded ${
              profession === "professor"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Professor
          </button>
        </div>

        {/* COMMON FIELDS */}
        <input
          type="text"
          name="admin_id"
          placeholder="Admin ID"
          className="input"
          onChange={handleChange}
        />

        <input
          type="email"
          name="officialEmail"
          placeholder="Official Email"
          className="input"
          onChange={handleChange}
        />

        {/* STUDENT FORM */}
        {profession === "student" && (
          <>
            <input
              name="registerNumber"
              placeholder="Register Number"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="department"
              placeholder="Department"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="year"
              type="number"
              placeholder="Year"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="roleInClub"
              placeholder="Role in Club"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="responsibilities"
              placeholder="Responsibilities (comma separated)"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="authorityLevel"
              type="number"
              placeholder="Authority Level"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />

            <input
              name="availability"
              placeholder="Availability"
              className="input"
              onChange={(e) => handleChange(e, "studentAdminProfile")}
            />
          </>
        )}

        {/* PROFESSOR FORM */}
        {profession === "professor" && (
          <>
            <input
              name="staffId"
              placeholder="Staff ID"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />

            <input
              name="department"
              placeholder="Department"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />

            <input
              name="designation"
              placeholder="Designation"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />

            <input
              name="roleInClub"
              placeholder="Role in Club"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />

            <input
              name="responsibilities"
              placeholder="Responsibilities (comma separated)"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />

            <input
              name="authorityLevel"
              type="number"
              placeholder="Authority Level"
              className="input"
              onChange={(e) => handleChange(e, "professorAdminProfile")}
            />
          </>
        )}
        <div className="flex justify-center items-center">
            <button type="submit" className="w-50 mx-auto bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-800">Submit</button>
        </div>
      </form>
    </div>
  );
}