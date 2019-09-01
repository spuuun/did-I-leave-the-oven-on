const remoteURL = "https://front-end-capstone-6c028.firebaseio.com"

const mapFBData = (data) => {
    return Object.keys(data)
        .map(key => {
            return { id: key, ...data[key] }
        });
}

export default {
    getAll() {
        return fetch(`${remoteURL}/appData.json`)
            .then(result => result.json())
            .then(mapFBData)
            .then(data => data.slice(data.length - 30))
    }
}