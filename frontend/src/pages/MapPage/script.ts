let map: google.maps.Map;
const wellingtonLAtLong = { lat: -41.2528753, lng: 174.6141737 };
const aucklandLatLong = { lat: -36.859482, lng: 174.4529321 };

function initMap(): void {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: wellingtonLAtLong,
        zoom: 8,
    });
    const marker = new google.maps.Marker({
        position: aucklandLatLong,
        map: map,
      });
}

declare global {
    interface Window {
        initMap: () => void;
    }
}
window.initMap = initMap;

export {};