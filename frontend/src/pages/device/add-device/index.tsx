import { useFormik } from "formik";
import { httpClient } from "../../../services/api/api-client";
import { ActionButton } from "../../../components/action-button";
import { Input } from "../../../components/input";
import { IconSelector } from "../../../components/icon-selector";
import { useEffect, useState } from "react";
import Dropdown from "../../../components/dropdown";
import { useLocation, useNavigate } from "react-router-dom";

export const AddDevice = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await httpClient({
          method: "GET",
          endpoint: "/rooms",
        });
        setRoomsData(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (state && state.selectedDevice) {
      setSelectedDevice(state.selectedDevice);
    }
  }, [state]);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: selectedDevice ? selectedDevice.name : "",
      icon: selectedDevice ? selectedDevice.icon : "",
      room: selectedDevice ? selectedDevice.room : "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newRoom = {
        name: values.name,
        icon: values.icon,
        state: selectedDevice ? selectedDevice.state : false,
        room: Number(values.room),
      };

      const fetchObj = {
        method: selectedDevice ? "PUT" : "POST",
        config: {
          data: {
            name: newRoom.name,
            icon: newRoom.icon,
            room: newRoom.room,
            state: newRoom.state,
          },
        },
        endpoint: "/devices/" + (selectedDevice ? `${selectedDevice.id}/` : ""),
      };

      try {
        const response = await httpClient(fetchObj);
        console.log(
          `Device ${selectedDevice ? "updated" : "added"} successfully:`,
          response.data
        );
        navigate(`/dispositivos/`);
      } catch (error) {
        console.error("Error adding device:", error);
      }
    },
  });

  return (
    <div className="relative">
      <h1 className="text-center text-2xl font-bold m-4">
        Adicionar Dispositivo
      </h1>
      <form onSubmit={handleSubmit}>
        <ActionButton icon="check" submit={true} />

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

        <Dropdown
          id="room"
          label="Comodo"
          options={roomsData}
          value={values.room}
          onChange={handleChange}
          addEmptyOption={true}
          mapOptions={(room) => ({
            value: room.id,
            label: room.name,
            key: room.id,
          })}
          className="p-4 box-content"
        />
      </form>
    </div>
  );
};
