import { useFormik } from "formik";
import { IconSelector } from "../../../components/icon-selector";
import { Input } from "../../../components/input";
import { ActionButton } from "../../../components/action-button";
import { httpClient } from "../../../services/api/api-client";
import { useLocation, useNavigate } from "react-router-dom";
import { DevicesSelector } from "../../../components/devices-selector";
import { useEffect, useState } from "react";

interface AddRoomProps {
  selectedRoom?: any;
}

export const AddRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedRoomDevices, setSelectedRoomDevices] = useState<any[]>([]);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.roomData && state.roomsDevicesData) {
      setSelectedRoom(state.roomData);
      setSelectedRoomDevices(state.roomsDevicesData);
    }
  }, [state]);

  const { values, setValues, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        name: selectedRoom ? selectedRoom.name : "",
        icon: selectedRoom ? selectedRoom.icon : "",
        devices: Array.isArray(selectedRoomDevices) ? selectedRoomDevices : [],
      },
      enableReinitialize: true,
      onSubmit: async (values) => {
        const newRoom = {
          name: values.name,
          icon: values.icon,
          devices: values.devices,
        };

        console.log(newRoom);

        const fetchObj = {
          method: selectedRoom ? "PUT" : "POST",
          config: {
            data: {
              name: newRoom.name,
              icon: newRoom.icon,
              devices: newRoom.devices,
            },
          },
          endpoint: `rooms/${selectedRoom ? `${selectedRoom.id}/` : ""}`,
        };

        try {
          const response = await httpClient(fetchObj);
          console.log("Room added successfully:", response.data);
          navigate(`/comodos/`);
        } catch (error) {
          console.error("Error adding room:", error);
        }
      },
    });

  return (
    <div className="relative pb-[8rem]">
      <h1 className="text-center text-2xl font-bold m-4">
        {selectedRoom ? `Editar ${selectedRoom.name}` : "Adicionar Comodo"}
      </h1>
      <form onSubmit={handleSubmit}>
        <ActionButton icon="check" submit={true} />

        <Input
          id="name"
          label="Nome"
          placeholder="Digite o nome do comodo"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
        <IconSelector
          value={values.icon}
          onChange={(iconValue) => setFieldValue("icon", iconValue)}
        />

        <DevicesSelector
          selectedDevices={values.devices}
          onDeviceSelect={(device) => {
            const newDevices = [...values.devices, device];
            setFieldValue("devices", newDevices);
          }}
          value={values.devices}
          setValue={(devices) => setFieldValue("devices", devices)}
        />
      </form>
    </div>
  );
};
