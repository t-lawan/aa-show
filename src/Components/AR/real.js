
//#region DB SETUP

var userDB = []

const map = document.getElementById('map')

async function getData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function parseDB(data) {
    await data.items.forEach(element => {
        if(element.fields.showInArAtHome){
            var d = {
                id: element.fields.title,
                glbModel: element.fields.glbUrl,
                usdzModel: element.fields.usdzUrl,
                latlon: element.fields.worldCoordinates,
                inProximity: false,
                markers: [],
                collected: false,
                viewed: false
            }
    
            console.log(element)
    
            if (d.latlon != undefined) {
                d.latlon = [d.latlon.lat, d.latlon.lon]
                userDB.push(d)
            }
        }
        
    });

    return userDB
}

//#endregion


//#region MAP SETUP & FUNCTIONS

const startMapCenter = [51.51895683571971, -0.13002140453811567]

const startZoom = 19

const maxDistance = 5

var gpsWatcher = null

var curr_location = [0, 0]
var curr_accuracy = 0
var user_marker = null
var accuracy_circle = null

var modelMarkers = []

var brightColor = '#00ffae'
var darkColor = '#009264'

const LeafIcon = L.Icon.extend({
    options: {
        id: 'id',
        iconSize: [100, 100],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    }
});

const locationOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};

function locationError() {
    // display error
}

function handleLocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    setLocation(lat, lon);
    setAccuracy(position.coords.accuracy);
    updateUserLocation()
    filterContentByDistance(lat, lon)
}

function manageWatcher() {
    window.addEventListener('blur', () => {
        clearWatchLocation()
    })

    window.addEventListener('focus', () => {
        watchLocation()
    })
}

function watchLocation() {
    if (navigator.geolocation) {
        gpsWatcher = navigator.geolocation.watchPosition(
            handleLocationSuccess,
            locationError,
            {
                enableHighAccuracy: true,
                maximumAge: Infinity,
                timeout: 1000
            }
        );
    } else {
        debugMsg("error: Location services are not available on this device")
    }
}

function clearWatchLocation() {
    // navigator.geolocation.clearWatch(gpsWatcher)
}

function filterContentByDistance(lat, lon) {
    userDB.forEach(element => {
        var dist = distance(lat, lon, element.latlon[0], element.latlon[1])

        if (dist < maxDistance) {
            element.markers.forEach(marker => {
                marker[0].setStyle({
                    color: brightColor
                })
                marker[1].setStyle({
                    color: brightColor
                })
            });

            element.inProximity = true

            if (modalOpen === element.id || element.collected || element.viewed) {
                return
            } else {
                element.viewed = true
                showSpecificModal(element.id)
            }

        } else {
            element.markers.forEach(marker => {
                marker[0].setStyle({
                    color: darkColor
                })
                marker[1].setStyle({
                    color: darkColor
                })
            });

            element.inProximity = false
        }
    });
}

function setLocation(lat, lng) {
    curr_location = [lat, lng]
}

function setAccuracy(accuracy) {
    curr_accuracy = accuracy
}

function setupMap() {

    var map = L.map('map').setView(startMapCenter, startZoom);

    //all open styles: https://leaflet-extras.github.io/leaflet-providers/preview/

    // L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    //     maxZoom: 20,
    //     attribution: ''
    // }).addTo(map);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: 'Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.'
    }).addTo(map);

    

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    //     fadeAnimation: false
    // }).addTo(map);

    var user_icon = new LeafIcon(
        {
            iconUrl: 'assets/img/user.png',
            iconSize: [46, 46],
            iconAnchor: [23, 23],
        })

    user_marker = L.marker([0, 0], { id: 'user', icon: user_icon }).addTo(map)

    accuracy_circle = L.circle([0, 0], 10, { color: darkColor }).addTo(map);

    userDB.forEach(element => {
        var modelCircleOuter = L.circle(element.latlon, maxDistance, { id: element.id, color: darkColor }).addTo(map)
        var modelCircleInner = L.circle(element.latlon, 0.1, { id: element.id, color: darkColor }).addTo(map)

        modelCircleOuter.addEventListener('click', () => {
            // if (element.inProximity) {
                showSpecificModal(element.id)
                element.viewed = true
            // }
        })

        element.markers.push([modelCircleOuter, modelCircleInner])

        modelMarkers.push([modelCircleInner, modelCircleOuter])
    });
}

function updateUserLocation() {
    user_marker.setLatLng([curr_location[0], curr_location[1]])
    accuracy_circle.setLatLng([curr_location[0], curr_location[1]])
    accuracy_circle.setRadius(curr_accuracy)
}

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres

    return d
}

//#endregion


//#region UI FUNCTIONS

var modals = []

var modalOpen = null

var openModals = []

var container = document.getElementById('modals')

var collectCounter = document.getElementById('counter')

container.style.display = 'none'

var collectedCounter = 0

function addModal(modelData) {

    const popup = document.createElement('div')
    popup.id = modelData.id
    popup.classList.add('popup-modal')
    popup.style.display = 'none'

    const card = document.createElement('div')
    card.classList.add('mv-card')

    const collectButton = document.createElement('button')
    collectButton.classList.add('collect-btn')
    collectButton.id = modelData.id + 'collectBtn'
    collectButton.innerText = 'Collect Item'

    //eventlistener for this collect btn

    const modelViewerContainer = document.createElement('div')
    modelViewerContainer.classList.add('modelviewer')

    const modelNode = document.createElement('model-viewer')
    modelNode.classList.add('model-viewer')
    modelNode.setAttribute('src', `${modelData.glbModel}`)
    modelNode.setAttribute('ios-src', `${modelData.usdzModel}`)
    modelNode.setAttribute('camera-controls', true)
    modelNode.setAttribute('autoplay', true)
    modelNode.setAttribute('alt', `${modelData.id}`)
    modelNode.setAttribute('ar', true)
    modelNode.setAttribute('ar-modes', "webxr scene-viewer quick-look")
    // modelNode.setAttribute('ar-scale', 'fixed')
    modelNode.style.height = '100%'

    const startARBtnNode = document.createElement('button')
    startARBtnNode.slot = 'ar-button'
    startARBtnNode.classList.add('ar-btn')
    startARBtnNode.innerText = 'Activate AR'

    const closeBtn = document.createElement('button')
    closeBtn.classList.add('close-btn')
    // closeBtn.innerText = "X"

    closeBtn.addEventListener('click', () => {
        hideSpecificModal(modelData.id)
        
        console.log("hide modal")
    })

    // closeBtn.style.display = 'none'

    collectButton.addEventListener('click', () => {
        collectItem(modelData)
        closeBtn.style.display = 'flex'
        collectButton.style.display = 'none'
    })

    collectButton.style.display = 'none'

    modelNode.addEventListener('load', () => {
        collectButton.style.display = 'flex'
    })

    card.appendChild(collectButton)
    card.appendChild(modelViewerContainer)
    card.appendChild(closeBtn)

    modelViewerContainer.appendChild(modelNode)
    modelNode.appendChild(startARBtnNode)

    popup.appendChild(card)

    container.appendChild(popup)
    modals.push(popup)
    // container.style.display = 'flex'
}

function hideSpecificModal(id) {
    var m = document.getElementById(id)
    m.style.display = 'none'

    var index = openModals.indexOf(id);

    if (index > -1) {
        openModals.splice(index, 1);
    }

    console.log("open modals: ", index)

    if(openModals.length === 1){
        container.style.justifyContent = 'center'
    }else{
        container.style.justifyContent = 'flex-start'
    }

    if (openModals.length <= 0) {
        container.style.display = 'none'
        modalOpen = null
        map.focus()
    }
}

function showSpecificModal(id) {
    if (modalOpen === id) return
    modalOpen = id
    var m = document.getElementById(id)
    m.style.display = 'flex'
    container.style.display = 'flex'

    if (openModals.includes(id)) return;
    openModals.push(id)

    if(openModals.length === 1){
        container.style.justifyContent = 'center'
    }
}

function hideModals() {
    modals.forEach(modal => {
        console.log("hide modals: ", modal.id)
        hideSpecificModal(modal.id)
    });
}

function collectItem(modelData) {
    var strbContainer = document.getElementById("strawberryContainer")
    strbContainer.style.display = 'flex'

    modelData.collected = true

    collectedCounter++

    // collectCounter.innerText = collectedCounter

    var strawberryIcon = document.createElement('img')
    strawberryIcon.src = './assets/img/strawberry.png'
    strawberryIcon.classList.add("strawberry-counter-icon")

    collectCounter.appendChild(strawberryIcon)

    setTimeout(() => {
        strbContainer.style.display = 'none'
    }, 2000);
}

//#endregion


//#region MAIN METHODS

getData('https://cdn.contentful.com/spaces/w6wp6l1i10zr/environments/master/entries?access_token=dTfnzz7HGLVoGfTRJSLMn8zb_15PTclYK_uT6koQCPk&include=2&content_type=project&select=fields')
    .then(data => {
        parseDB(data).then(() => {
            setupMap()

            watchLocation()

            manageWatcher()

            userDB.forEach(element => {
                addModal(element)
            });
        }).catch()
    }).catch((err) => {
    });




//#endregion