
// comment

"use client";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function Page() {
  const [trainees, setTrainees] = useState([]); 

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    buddy: "",
  });

  const addEmployee = () => {
    if (!newEmployee.name || !newEmployee.department) return;

    setTrainees([
      ...trainees,
      {
        name: newEmployee.name,
        department: newEmployee.department,
        buddy: newEmployee.buddy || "Not Assigned",
        status: "In Progress",
        progress: 0,
      },
    ]);

    setNewEmployee({
      name: "",
      department: "",
      buddy: "",
    });
  };

  const removeEmployee = (employeeName) => {
    setTrainees(
      trainees.filter((trainee) => trainee.name !== employeeName)
    );
  };

  const [sessions, setSessions] = useState([]);

  const completedSessions = sessions.filter(
    (session) =>
      String(session.status || "")
        .trim()
        .toLowerCase() === "done"
  );

  const upcomingSessions = sessions.filter(
    (session) =>
      session.emeaAvailability &&
      String(session.status || "")
        .trim()
        .toLowerCase() !== "done"
  );

  const handleSheetUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const uploadedSessions = jsonData
        .filter((row) => row["What"])
        .map((row) => ({
          when: row["When "] || row["When"] || "",
          what: row["What"] || "",
          who: row["Who/EMEA"] || "",
          topics: row["Topics"] || "",
          emeaAvailability: row["EMEA POC Availability"] || "",
          status: row["Status"] || "",
        }));

      setSessions(uploadedSessions);

      const uniqueEmployees = ["Labhansh Gulati", "Akshay Korem"];

      const generatedEmployees = uniqueEmployees.map((employee) => ({
        name: employee,
        department: "CSOM",
        buddy: "Kuldeep Sharma",
        status: "Active",
        progress: employee === "Labhansh Gulati" ? 78 : 72,
      }));

      setTrainees(generatedEmployees);
    };

    reader.readAsArrayBuffer(file);
  };

  const tutorials = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-5xl font-bold tracking-tight">
                  TrainNova HQ
                </h1>

                <label className="bg-white/15 hover:bg-white/20 border border-white/20 text-white text-sm px-3 py-2 rounded-xl cursor-pointer transition backdrop-blur-sm">
                  Upload Sheet
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleSheetUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-3 text-blue-100 text-lg">
                Intelligent onboarding and training operations dashboard
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20">
              <p className="text-sm text-blue-100">Training Health Score</p>
              <p className="text-4xl font-bold mt-2">
                {sessions.length
                  ? Math.round(
                      (completedSessions.length / sessions.length) * 100
                    )
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Active Trainees</p>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-5xl font-bold text-slate-800">
                {trainees.length}
              </h2>
              <span className="text-green-600 text-sm font-medium">
                +12%
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Upcoming Sessions</p>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-5xl font-bold text-slate-800">
                {upcomingSessions.length}
              </h2>
              <span className="text-orange-500 text-sm font-medium">
                This Week
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Completed Trainings</p>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-5xl font-bold text-slate-800">
                {completedSessions.length}
              </h2>
              <span className="text-blue-600 text-sm font-medium">
                Completed
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Pending Assessments</p>
            <div className="flex items-end justify-between mt-4">
              <h2 className="text-5xl font-bold text-slate-800">
                {upcomingSessions.length}
              </h2>
              <span className="text-red-500 text-sm font-medium">
                Action Needed
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Training Command Center
                </h2>
                <p className="text-slate-500 mt-1">
                  Upload training sheets and monitor onboarding progress
                </p>
              </div>

              <div className="text-sm text-slate-500 bg-slate-100 px-4 py-2 rounded-2xl">
                Excel Connected
              </div>
            </div>

            <div className="overflow-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 text-sm">
                  <tr>
                    <th className="p-4">Session</th>
                    <th className="p-4">Trainer</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sessions.map((session, index) => (
                    <tr
                      key={index}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {session.what}
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                            {session.topics}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">
                        {session.who}
                      </td>

                      <td className="p-4 text-slate-600">
                        {session.when}
                      </td>

                      <td className="p-4">
                        {String(session.status).toLowerCase() === "done" ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        ) : (
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                            Upcoming
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-5">
                Add New Employee
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Department"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Buddy Name"
                  value={newEmployee.buddy}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, buddy: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3"
                />

                <button
                  onClick={addEmployee}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-2xl font-semibold transition"
                >
                  Add Employee
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-5">
                Learning Hub
              </h2>

              <div className="space-y-4">
                {tutorials.map((tutorial, index) => (
                  <a
                    key={index}
                    href={tutorial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {tutorial.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {tutorial.type}
                        </p>
                      </div>

                      <span className="text-indigo-600 font-medium text-sm">
                        Open
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Employee Training Progress
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {trainees.map((trainee, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-3xl p-5 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {trainee.name}
                    </h3>
                    <p className="text-slate-500 mt-1">
                      {trainee.department}
                    </p>
                  </div>

                  <button
                    onClick={() => removeEmployee(trainee.name)}
                    className="text-red-500 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-semibold text-slate-700">
                      {trainee.progress}%
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                      style={{ width: `${trainee.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Buddy</p>
                    <p className="font-medium text-slate-700 mt-1">
                      {trainee.buddy}
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {trainee.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
