import { useEffect, useRef } from 'react'
import './MapComponent.css'
import polyline from '@mapbox/polyline'


function MapComponent({
  center = [35.6762, 139.6503],
  zoom = 12,
  markers = [],
  className = ''
}) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const routeLineRef = useRef(null)
  const currentLatLngRef = useRef(null)

  // Initialize map
  useEffect(() => {
    if (typeof window.L === 'undefined') {
      console.warn('Leaflet not loaded yet')
      return
    }

    if (!mapInstanceRef.current && mapRef.current) {
      const map = window.L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView(center, zoom)

      mapInstanceRef.current = map

      // Tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map)

      // Destination / fixed start marker(s)
      markers.forEach(marker => {
        const leafletMarker = window.L.marker([marker.lat, marker.lng]).addTo(map)
        if (marker.popup) {
          leafletMarker.bindPopup(marker.popup)
        }
      })

      // Set fixed start point from center
      currentLatLngRef.current = {
        lat: center[0],
        lng: center[1]
      }

      // Click → choose END → draw route
      map.on('click', (e) => {
        if (!currentLatLngRef.current) {
          alert('Waiting for your location...')
          return
        }

        const endPoint = {
          lat: e.latlng.lat,
          lng: e.latlng.lng
        }

        drawRoute(currentLatLngRef.current, endPoint)
      })
    }

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off('click')
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update view when center / zoom changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    mapInstanceRef.current.setView(center, zoom)

    // Update fixed start when destination changes
    currentLatLngRef.current = {
      lat: center[0],
      lng: center[1]
    }
  }, [center, zoom])

  // Draw route using GraphHopper
  async function drawRoute(start, end) {
    if (!mapInstanceRef.current) return

    const url =
      `https://graphhopper.com/api/1/route` +
      `?point=${start.lat},${start.lng}` +
      `&point=${end.lat},${end.lng}` +
      `&vehicle=foot` +
      `&points_encoded=true` +
      `&key=57d9d0f6-832c-4037-9721-35b7bf7bc81c`

    const res = await fetch(url)
    const data = await res.json()

    if (!data.paths || !data.paths.length) {
      alert('Route not found')
      return
    }

    const encoded = data.paths[0].points
    const coords = polyline.decode(encoded)

    // Remove previous route
    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current)
    }

    routeLineRef.current = window.L.polyline(coords, {
      color: 'blue',
      weight: 5
    }).addTo(mapInstanceRef.current)

    mapInstanceRef.current.fitBounds(
      routeLineRef.current.getBounds()
    )
  }

  return (
    <div className={`map-wrapper ${className}`}>
      <div ref={mapRef} className="leaflet-map"></div>
    </div>
  )
}

export default MapComponent
