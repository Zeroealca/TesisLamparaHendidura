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
interface Parallel {
  id: string;
  name: string;
  docente: { id: number; name: string };
}
interface Teacher {
  id: string;
  name: string;
  email: string;
  rol: string;
}

const CreateParallel = ({
  parallels,
  getParallels,
  teachers,
}: {
  parallels: Parallel[];
  getParallels: () => void;
  teachers: Teacher[];
}) => {
  const [parallel, setParallel] = useState("");
  const [parallel_id, setParallel_id] = useState("");
  const [teacher, setTeacher] = useState("");
  const [selectParallels, setSelectParallels] = useState<Parallel[]>([]);

  const { user } = useContext(UserContext);

  const columns = [
    {
      name: "ID",
      selector: (row: Parallel) => row.id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row: Parallel) => row.name,
      sortable: true,
    },
    {
      name: "Docente",
      selector: (row: Parallel) => row.docente?.name ?? "",
      sortable: true,
    },
    {
      name: "Acciones Docente",
      cell: (row: Parallel) => {
        return (
          <div className="flex flex-row justify-center items-center gap-2">
            <button
              className="bg-red-500 text-white p-1 rounded-md"
              disabled={row.docente == null}
              onClick={async () => {
                const res = await fetch(
                  process.env.API_URL +
                    `parallel?parallel=${row.id}&user=${row.docente?.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const data = await res.json();
                if (data.data) {
                  toast.success(data.message);
                  getParallels();
                } else {
                  toast.error(data.message);
                }
              }}
            >
              Eliminar
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (parallels.length) {
      const aux = parallels.filter((p) => {
        return p.docente == null;
      });
      setSelectParallels(aux);
    }
  }, [parallels]);

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

  const handleCreate = async () => {
    if (!parallel.length)
      return toast.error("Ingrese un nombre para el paralelo");
    const res = await fetch(process.env.API_URL + `parallel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: parallel,
      }),
    });
    const data = await res.json();
    if (data.data) {
      toast.success(data.message);
      getParallels();
      setParallel("");
    } else {
      toast.error(data.message);
    }
  };
  const handleEnroll = async () => {
    if (!parallel_id.length && !teacher.length) {
      return toast.error("Seleccione un paralelo y un docente");
    }
    const res = await fetch(process.env.API_URL + `parallel/enroll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_parallel: Number(parallel_id),
        id_user: teacher,
      }),
    });
    const data = await res.json();
    if (data.data) {
      toast.success(data.message);
      getParallels();
      setParallel("");
      setTeacher("");
      setParallel_id("");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="flex items-center mb-10 gap-5">
        <h1 className="text-2xl font-bold text-left">Paralelos</h1>
      </div>
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <label className="mr-2">Paralelo:</label>
            <input
              className="border border-gray-400 rounded-md p-1 bg-blackInputs"
              type="text"
              value={parallel}
              onChange={(e) => {
                setParallel(e.target.value);
              }}
            />
            <button
              className="ml-2 border py-1 px-2 rounded-xl"
              onClick={handleCreate}
              disabled={!parallel.length}
            >
              Crear
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex justify-between md:flex-row flex-col md:items-center items-start gap-5">
            <label className="mr-2">Asignar:</label>
            <select
              className="border border-gray-400 rounded-md p-1 bg-blackInputs"
              value={parallel_id}
              onChange={(e) => {
                setParallel_id(e.target.value);
              }}
            >
              <option value="">Seleccione un paralelo</option>
              {selectParallels.map((p, index) => (
                <option value={p.id} key={index}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-400 rounded-md p-1 bg-blackInputs"
              value={teacher}
              onChange={(e) => {
                setTeacher(e.target.value);
              }}
            >
              <option value="">Seleccione un docente</option>
              {teachers.map((p, index) => (
                <option value={p.id} key={index}>
                  {p.name}
                </option>
              ))}
            </select>
            <button
              className="ml-2 border py-1 px-2 rounded-xl self-center"
              onClick={handleEnroll}
              disabled={!parallel_id.length || !teacher.length}
            >
              Asignar
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <DataTable
          data={parallels}
          columns={columns}
          pagination
          theme="solarized"
        />
      </div>
    </>
  );
};

export default CreateParallel;
