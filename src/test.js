const MuseClient = require('muse-js')

let bci = new MuseClient()

let connect_function = () => {
    try {
        bci.connect()
    } catch (e) {
        console.log(e)
    }
}

connect_function()