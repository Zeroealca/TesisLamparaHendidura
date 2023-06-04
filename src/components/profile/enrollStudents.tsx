import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Iimage } from "src/pages/mi-perfil";
import { useState, useEffect, useContext } from "react";
import UserContext from "src/context/context";
import DataTable, { createTheme } from "react-data-table-component";

interface Student {
  id: number;
  name: string;
  email: string;
  rol: string;
  id_parallel: number;
}

const EnrollStudents = ({
  students,
  getStudents,
  studentsIP,
  parallel,
  setParallel,
}: {
  students: Student[];
  getStudents: () => void;
  studentsIP: Student[];
  parallel: string;
  setParallel: (id: string) => void;
}) => {
  const [student, setStudent] = useState("");

  const { user } = useContext(UserContext);

  const columns = [
    {
      name: "Nombre",
      selector: (row: Student) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Student) => row.email,
      sortable: true,
    },
  ];

  createTheme(
    "solarized",
    {
      text: {
        primary: "#ffffff",
        secondary: "#ffffff",
      },
      background: {
        default: "rgba(0,0,0,.54)",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "rgba(0,0,0,.54)",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const handleEnroll = async () => {
    const res = await fetch(process.env.API_URL + `user/enroll/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_parallel: parseInt(parallel),
        id_user: parseInt(student),
      }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Estudiante agregado");
      getStudents();
      setStudent("");
    }
  };

  return (
    <>
      <div className="flex items-center mb-10 gap-5">
        <h1 className="text-2xl font-bold text-left">Estudiantes</h1>
        <select
          onChange={(e) => {
            setParallel(e.target.value);
          }}
        >
          <option value=""></option>
          {user.parallel?.map((parallel) => {
            return (
              <option value={parallel.parallel_id}>
                {parallel.parallel_name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <label className="mr-2">Estudiantes:</label>
            <select
              className="bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-black text-sm"
              onChange={(e) => {
                setStudent(e.target.value);
              }}
            >
              <option value=""></option>
              {students.map((student) => {
                return (
                  <option
                    value={student.id}
                  >{`${student.name} - ${student.email}`}</option>
                );
              })}
            </select>
            <button className="ml-2" onClick={handleEnroll}>
              Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <DataTable
          data={studentsIP}
          columns={columns}
          pagination
          theme="solarized"
        />
      </div>
    </>
  );
};

export default EnrollStudents;
