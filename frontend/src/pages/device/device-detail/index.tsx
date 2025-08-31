import { useLocation } from "react-router-dom";

export const DeviceDetail = () => {
  const location = useLocation();
  const device = location.state;

  return (
    <div>
      <h1>Device Detail</h1>
      <p>ID: {device.id}</p>
      <p>Name: {device.name}</p>
      <p>Icon: {device.icon}</p>
      <p>Status: {device.state ? "On" : "Off"}</p>
    </div>
  );
};
