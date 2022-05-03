// const API = 'AIzaSyA8VGL3SZS3xq4ecLxvhDci_5cpdmpebAw'

function initMap() {

    const Dnipro = { lat: 48.470001, lng: 34.993334 }

    const options = {
        zoom: 6,
        center: Dnipro
    }

    let map = new google.maps.Map(document.getElementById('map'), options)

    const addMarker = prop => {
        let marker = new google.maps.Marker({
            position: prop.coord,
            map: map
        })

        if (prop.content) {
            let info_window = new google.maps.InfoWindow({
                content: prop.content
            })

            marker.addListener('click', () => {
                info_window.open(map, marker)
            })

        } else {
            let noSign = new google.maps.InfoWindow({ content: 'No signature' })

            marker.addListener('click', () => {
                noSign.open(map, marker)
            })
        }

    }

    const locations = [
        { coord: Dnipro, content: 'I live here' },
        { coord: { lat: 47.5712, lng: 34.3964 }, content: 'I born here' },
        { coord: { lat: 47.9097, lng: 33.3804 }, content: 'I studied here' }
    ]

    for (elem of locations) {
        addMarker(elem)
    }


    window.addEventListener('load', () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }

                    infoWindow = new google.maps.InfoWindow()
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("I'm watching you");
                    infoWindow.open(map);
                    map.setCenter(pos);
                }
            )

        } else {

            alert('Geolocation not found')
        }

    })
}