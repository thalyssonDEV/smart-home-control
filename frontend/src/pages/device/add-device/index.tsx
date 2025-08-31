import { useFormik } from "formik";
import { httpClient } from "../../../services/api/api-client";
import { ActionButton } from "../../../components/action-button";
import { Input } from "../../../components/input";
import { IconSelector } from "../../../components/icon-selector";
import { useEffect, useState } from "react";
import Dropdown from "../../../components/dropdown";

export const AddDevice = () => {
  const [roomsData, setRoomsData] = useState([]);

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

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      icon: "",
      room: "",
    },
    onSubmit: async (values) => {
      const newRoom = {
        name: values.name,
        icon: values.icon,
        room: Number(values.room),
      };

      const fetchObj = {
        method: "POST",
        config: {
          data: {
            name: newRoom.name,
            icon: newRoom.icon,
            room: newRoom.room,
          },
        },
        endpoint: "/devices/",
      };

      try {
        const response = await httpClient(fetchObj);
        console.log("Device added successfully:", response.data);
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
