import { useFormik } from "formik";
import { IconSelector } from "../../../components/icon-selector";
import { Input } from "../../../components/input";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { httpClient } from "../../../services/api/api-client";
import { DevicesSelector } from "../../../components/devices-selector";
import { TaskSelector } from "../../../components/tasks-selector";
import { ActionButton } from "../../../components/action-button";

export const AddScene = () => {
  const [selectedScene, setSelectedScene] = useState<any>(null);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setSelectedScene(state);
    }
  }, []);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: selectedScene ? selectedScene.name : "",
      icon: selectedScene ? selectedScene.icon : "",
      tasks: selectedScene ? selectedScene.tasks : [],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newRoom = {
        name: values.name,
        icon: values.icon,
      };

      const fetchObj = {
        method: selectedScene ? "PUT" : "POST",
        config: {
          data: {
            name: newRoom.name,
            icon: newRoom.icon,
          },
        },
        endpoint: "/scenes/" + (selectedScene ? `${selectedScene.id}/` : ""),
      };

      try {
        const response = await httpClient(fetchObj);
        console.log(
          `Scene ${selectedScene ? "updated" : "added"} successfully:`,
          response.data
        );
        navigate(`/cenas/`);
      } catch (error) {
        console.error("Error adding scene:", error);
      }
    },
  });

  return (
    <div className="relative pb-[120px] ">
      <h1 className="text-center text-2xl font-bold p-4">
        {selectedScene ? "Editar Cena" : "Adicionar Cena"}
      </h1>
      <form>
        <ActionButton icon="check" onClick={handleSubmit} />
        <Input
          id="name"
          label="Nome"
          placeholder="Digite o nome do dispositivo"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
        <IconSelector
          value={values.icon}
          onChange={(iconValue) => setFieldValue("icon", iconValue)}
        />
      </form>

      {/* {selectedScene && (
        <TaskSelector
          selectedTasks={values.tasks}
          onTaskSelect={(task) => {
            const newTasks = [...values.tasks, task];
            setFieldValue("tasks", newTasks);
          }}
          value={values.tasks}
          setValue={handleChange}
          sceneId={selectedScene ? selectedScene.id : null}
        />
      )} */}
    </div>
  );
};
