import { useEffect, useRef } from 'react'
import './MapComponent.css'

function MapComponent({ center = [35.6762, 139.6503], zoom = 12, markers = [], className = '' }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Only initialize if Leaflet is loaded
    if (typeof window.L === 'undefined') {
      console.warn('Leaflet not loaded yet')
      return
    }

    // Initialize map
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = window.L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView(center, zoom)

      // Add OpenStreetMap tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current)

      // Add markers if provided
      markers.forEach(marker => {
        const leafletMarker = window.L.marker([marker.lat, marker.lng])
          .addTo(mapInstanceRef.current)
        
        if (marker.popup) {
          leafletMarker.bindPopup(marker.popup)
        }
      })
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update center and zoom when they change
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom)
    }
  }, [center, zoom])

  return (
    <div className={`map-wrapper ${className}`}>
      <div ref={mapRef} className="leaflet-map"></div>
    </div>
  )
}

export default MapComponent
