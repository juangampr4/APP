"use client"
import Navbar from "./componentes/navbar";
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import dynamic from "next/dynamic";
export default function Home() {
  const Mapa = dynamic(() => import ("./componentes/mapa"), {ssr: false})
  return (
    <>
    <Navbar/>
    <Mapa/>
    </>
  );
}
