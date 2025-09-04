import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { fetchData } from "../../insfrastructure/fetch-data";
import { ActionButton } from "../action-button";
import Dropdown from "../dropdown";
import { Input } from "../input";

interface TaskSelectorProps {
  selectedTasks: any[];
  onTaskSelect: (task: any) => void;
  value: any;
  setValue: (value: any) => void;
  sceneId?: string | null;
}

export const TaskSelector = ({
  selectedTasks,
  onTaskSelect,
  value,
  setValue,
  sceneId,
}: TaskSelectorProps) => {
  const [showDevicesDropdown, setShowDevicesDropdown] = useState(false);
  const [allDevices, setAllDevices] = useState<any[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetchData({ endpoint: "/devices" });
      setAllDevices(response);
    };

    fetchTasks();
  }, []);

  const handleDeleteTaskFromScene = (taskId: number | string) => {
    if (!Array.isArray(selectedTasks)) return;
    const filtered = selectedTasks.filter((task: any) => task.id !== taskId);
    setValue(filtered);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      device: "",
      scene: sceneId,
      timer: "",
      action: true,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!values.scene) {
        console.error("Scene ID is required");
        return;
      }
      const fetchObj = {
        method: "POST",
        config: {
          data: {
            device: Number(values.device),
            timer: Number(values.timer),
            scene: Number(values.scene),
            action: values.action,
          },
        },
        endpoint: "/tasks/",
      };

      try {
        const response = await fetchData(fetchObj);
        console.log(`Task created successfully:`, response.data);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },
  });

  return (
    <div className="relative">
      <ActionButton
        icon={`${showDevicesDropdown ? "minus" : "plus"}`}
        onClick={() => setShowDevicesDropdown(!showDevicesDropdown)}
      />

      <h2 className="font-bold text-lg p-6">Dispositivos</h2>

      {showDevicesDropdown && allDevices && (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center ">
            <Dropdown
              className="p-4 w-full"
              id="device"
              options={allDevices}
              value={values.device}
              onChange={handleChange}
              mapOptions={(device) => ({
                value: device.id.toString(),
                label: device.name,
                key: device.id,
              })}
              addEmptyOption={true}
            />

            <Input
              id="timer"
              label="Timer"
              placeholder="Digite o tempo do timer"
              type="number"
              value={values.timer}
              onChange={handleChange}
            />

            <label htmlFor="action">Ligar dispositivo?</label>
            <input
              type="checkbox"
              id="action"
              checked={values.action}
              onChange={handleChange}
            />

            <button
              className="bg-secondary px-4 py-2 rounded-md mb-4 shadow-md"
              type="submit"
            >
              Adicionar Dispositivo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
