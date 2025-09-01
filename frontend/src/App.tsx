import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ListRoom } from "./pages/room/list-room";
import { RoomDetail } from "./pages/room/room-detail";
import { AddScene } from "./pages/scene/add-scene";
import { ListScene } from "./pages/scene/list-scene";
import { SceneDetail } from "./pages/scene/scene-detail";
import { Layout } from "./pages/Layout";
import { ListDevice } from "./pages/device/list-device";
import { AddRoom } from "./pages/room/add-room";
import { DeviceDetail } from "./pages/device/device-detail";
import { AddDevice } from "./pages/device/add-device";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListRoom />} />
          <Route path="/comodos" element={<ListRoom />} />
          <Route path="/comodos/:id" element={<RoomDetail />} />
          <Route path="/comodos/novo" element={<AddRoom />} />
          <Route path="/dispositivos" element={<ListDevice />} />
          <Route path="/dispositivos/:id" element={<AddDevice />} />
          <Route path="/dispositivos/novo" element={<AddDevice />} />
          <Route path="/cenas" element={<ListScene />} />
          <Route path="/cenas/novo" element={<AddScene />} />
          <Route path="/cenas/:id" element={<SceneDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
