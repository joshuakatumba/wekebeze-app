import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { ArrowLeft, MapPin, Phone, Info, List, Map as MapIcon, ChevronRight, Search } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { screeningAPI } from "../../../services/api";

// --- Custom Leaflet Marker ---
const customIcon = L.divIcon({
  html: `<div class="w-8 h-8 bg-rose-500 rounded-full border-4 border-white shadow-premium flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
         </div>`,
  className: "custom-marker-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface IService {
  name: string;
  price: number;
}

interface IScreeningCenter {
  id: string;
  name: string;
  location: string;
  district: string;
  contact: string;
  coordinates: { lat: number; lng: number };
  center_services: IService[];
}

export default function ScreeningLocator() {
  const nav = useNavigate();
  const [view, setView] = useState("list");
  const [district, setDistrict] = useState("All");
  const [screeningCenters, setScreeningCenters] = useState<IScreeningCenter[]>([]);
  const [districts, setDistricts] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [centersResponse, districtsResponse] = await Promise.all([
          screeningAPI.getCenters(),
          screeningAPI.getDistricts(),
        ]);
        setScreeningCenters((centersResponse as any) || []);
        setDistricts((districtsResponse as any) || ["All"]);
      } catch (err) {
        console.error("Failed to fetch screening data:", err);
        setError("Failed to load screening centers. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCenters = useMemo(() => {
    if (district === "All") return screeningCenters;
    return screeningCenters.filter((c) => c.district === district);
  }, [district, screeningCenters]);

  return (
    <div className="bg-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <button
            onClick={() => nav("/home")}
            className="group flex items-center gap-2 text-primary-500 hover:text-primary-900 transition-colors mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-primary-900 tracking-tight mb-3">
                Screening <span className="text-rose-500">Locator</span>
              </h1>
              <p className="text-lg text-primary-500 font-medium max-w-2xl">
                Find trusted cancer screening centers near you. Early detection is your best protection.
              </p>
            </div>

            <div className="flex bg-white p-1 rounded-xl shadow-soft-sm border border-primary-50">
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  view === "list" ? "bg-primary-900 text-white shadow-md" : "text-primary-400 hover:text-primary-900"
                }`}
              >
                <List className="w-4 h-4" />
                List View
              </button>
              <button
                onClick={() => setView("map")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  view === "map" ? "bg-primary-900 text-white shadow-md" : "text-primary-400 hover:text-primary-900"
                }`}
              >
                <MapIcon className="w-4 h-4" />
                Map View
              </button>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="glass-card p-4 mb-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-primary-50 rounded-xl outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium appearance-none"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d === "All" ? "All Regions/Districts" : d}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-widest px-2">
            <Info className="w-4 h-4" />
            Showing {filteredCenters.length} Centers
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-24 space-y-4">
               <div className="w-12 h-12 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin" />
               <p className="text-primary-500 font-bold animate-pulse">Scanning for facilities...</p>
             </div>
          ) : error ? (
            <div className="glass-card p-12 text-center">
              <div className="inline-flex p-4 bg-rose-50 rounded-full mb-4">
                <Info className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Something went wrong</h3>
              <p className="text-primary-500 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {view === "list" ? (
                <motion.div 
                  key="list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {filteredCenters.map((c) => (
                    <div
                      key={c.id}
                      className="glass-card hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-extrabold text-primary-900 group-hover:text-rose-500 transition-colors">
                            {c.name}
                          </h2>
                          <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-wider rounded-lg">
                            Verified
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-primary-500 text-sm mb-6">
                          <MapPin className="w-4 h-4 text-rose-400" />
                          <span className="font-medium">{c.location}, {c.district}</span>
                        </div>

                        <div className="space-y-3 mb-8">
                          {(c.center_services || []).map((s, idx) => (
                            <div key={idx} className="flex justify-between items-center p-3 bg-primary-50 rounded-xl">
                              <span className="text-sm font-bold text-primary-700">{s.name}</span>
                              <span className={`text-xs font-black px-2 py-1 rounded-md ${s.price === 0 ? "bg-teal-500 text-white" : "bg-white text-primary-900 shadow-sm"}`}>
                                {s.price === 0 ? "FREE" : `UGX ${s.price.toLocaleString()}`}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-primary-50">
                          <div className="flex items-center gap-2 text-primary-400">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm font-bold">{c.contact}</span>
                          </div>
                          <button
                            onClick={() => setView("map")}
                            className="flex items-center gap-1 text-sm font-black text-rose-500 hover:text-rose-600 uppercase tracking-wider group/btn"
                          >
                            Locate
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredCenters.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                      <p className="text-primary-400 font-bold">No screening centers found in this district.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="map"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-[600px] rounded-3xl overflow-hidden border-8 border-white shadow-premium relative z-10"
                >
                  <MapContainer
                    center={[0.3476, 32.5825]}
                    zoom={7}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer 
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {filteredCenters.map((c) => (
                      <Marker
                        key={c.id}
                        position={[c.coordinates.lat, c.coordinates.lng]}
                        icon={customIcon}
                      >
                        <Popup className="custom-popup">
                          <div className="p-2 min-w-[200px]">
                            <h4 className="font-black text-primary-900 text-sm mb-1">{c.name}</h4>
                            <p className="text-xs text-primary-500 font-medium mb-3">{c.location}</p>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-rose-500 uppercase">
                              <Phone className="w-3 h-3" />
                              {c.contact}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
