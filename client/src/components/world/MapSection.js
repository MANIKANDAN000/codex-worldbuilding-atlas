import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import worldService from '../../api/world.service';

function AddPinOnClick({ worldId }) {
    useMapEvents({
        click(e) {
            const name = prompt("Enter a name for this new pin:");
            if (name) {
                const newPin = { lat: e.latlng.lat, lng: e.latlng.lng, name };
                worldService.createMapPin(worldId, newPin)
                    .catch(err => console.error("Failed to create pin", err));
            }
        },
    });
    return null;
}

function MapSection({ world }) {
    const position = world.mapPins.length > 0 ? [world.mapPins[0].lat, world.mapPins[0].lng] : [51.505, -0.09];

    return (
        <section>
            <h3>Map</h3>
            <p>Click on the map to add a new location pin.</p>
            <MapContainer center={position} zoom={10} style={{ height: '60vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {world.mapPins && world.mapPins.map(pin => (
                    <Marker key={pin._id} position={[pin.lat, pin.lng]}>
                        <Popup><b>{pin.name}</b><br />{pin.description}</Popup>
                    </Marker>
                ))}

                <AddPinOnClick worldId={world._id} />
            </MapContainer>
        </section>
    );
}

export default MapSection;