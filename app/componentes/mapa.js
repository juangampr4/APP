"use client"
import {MapContainer, TileLayer, Popup, Marker, LayersControl, LayerGroup} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./styles.css";
import { useState,useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
function Mostrar({data}) {
    return (
        <>

            <MarkerClusterGroup chunkedLoading >
                {data?.features?.map((value,key) =>
                    <Marker key ={key} position={[value.geometry.coordinates[1],value.geometry.coordinates[0]]}>
                        <Popup maxWidth={700} maxHeight={700}>
                            <div className="w-[700px] overflow-x-auto">
                                <table className="table-auto border-separate border-spacing-x-2 border-spacing-y-1 text-sm w-full text-left">
                                    <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="px-2 py-1 border-b border-gray-300">fid</th>
                                        <th className="px-2 py-1 border-b border-gray-300">rut</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Novedad</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Dirección</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Fecha de creación</th>
                                        <th className="px-2 py-1 border-b border-gray-300">ID Encuesta</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Nombre comercial</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Tipología</th>
                                        <th className="px-2 py-1 border-b border-gray-300">¿Tiene crédito?</th>
                                        <th className="px-2 py-1 border-b border-gray-300">Nombre establecimiento</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.fid}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.rut}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.NOVEDAD}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.DIRECCION}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.CreationDa}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.ID_ENCUEST}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.NOMBRE_COM}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.TIPOLOGIA_}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.TIENE_CRED}</td>
                                        <td className="px-2 py-1 border-b border-gray-200">{value.properties.nombre_establecimiento}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        </Popup>
                    </Marker>)}

            </MarkerClusterGroup>
        </>
    )}
export default function Mapa(){
    const [data, setData] = useState(null);
    const position = [10.176,-73.262];

    useEffect(() => {
        fetch('/GEOJSON.json')
            .then(response => response.json())
            .then(data => setData(data));
    },[]);

    return(
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-4xl h-[80vh]">
                <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={10} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <LayersControl position="topright">
                        <LayersControl.Overlay name="Mostrar Predios" checked={true}>
                            <LayerGroup>
                                <Mostrar data={data}/>
                            </LayerGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer>
            </div>
        </div>

    )
}
