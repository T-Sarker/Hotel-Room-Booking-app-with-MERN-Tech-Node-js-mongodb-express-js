
const HotelModel = require("../models/hotel")
const { HandelError } = require("../utils/errorHandel")


//defining the methods
//create data
/** 
    *route: localhost:4000/api/hotel/create 
    method: post
    test result: OK
 */
exports.create = async (req, res) => {
    const { name, type, city, address, distance, photos, title, desc, rating, rooms, cheapestPrice, featured } = req.body  //destructuring

    try {
        const hotel = await HotelModel.create({
            name,
            type,
            city,
            address,
            distance,
            photos,
            title,
            desc,
            rating,
            rooms,
            cheapestPrice
        })
        return res.status(200).json(hotel)
    } catch (err) {
        return next(HandelError(500, 'Sorry Data Failed to Store'))
    }
}

/** 
    *route: localhost:4000/api/hotel/show/id 
    method: get
    test result: OK
 */
//single data find
exports.single = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findOne({ _id: req.params.id })
        return res.status(200).json(hotel)
    } catch (error) {
        return next(HandelError(404, 'No data Found'))

    }
}

/** 
    *route: localhost:4000/api/hotel/all 
    method: get
    test result: OK
 */
//all data list 
exports.allData = async (req, res, next) => {
    try {
        const { hmin, hmax, ...others } = req.query
        const hotels = await HotelModel.find({ ...others, cheapestPrice: { $gte: parseInt(hmin) || 10, $lte: parseInt(hmax) || 200 } }).limit(req.query.limit || 10)
        return res.status(200).json(hotels)
    } catch (error) {
        console.log(error);
        return next(HandelError(404, 'No data Found'))
    }
}

/** 
    *route: localhost:4000/api/hotel/update 
    method: put
    test result: OK
 */
exports.update = async (req, res) => {
    try {
        const hotel = await HotelModel.findOne({ _id: req.body.id })
        if (hotel) {
            const UpdateHotel = await HotelModel.findByIdAndUpdate(req.body.id, {
                $set: {
                    name: req.body.name,
                    type: req.body.type,
                    city: req.body.city,
                    address: req.body.address,
                    distance: req.body.distance,
                    title: req.body.title,
                    desc: req.body.desc,
                    cheapestPrice: req.body.cheapestPrice
                }
            }, { new: true })
            return res.status(200).json(UpdateHotel)

        } else {
            return next(HandelError(404, 'No data Found'))
        }
    } catch (error) {
        return next(HandelError(404, 'No data Found'))
    }
}


/** 
    *route: localhost:4000/api/hotel/delete/id 
    method: delete
    test result: OK
 */
exports.delete = async (req, res, next) => {
    try {
        await HotelModel.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json('Successfully Deleted')
    } catch (error) {
        return next(HandelError(404, 'No data Found'))
    }
}



/** 
    *route: localhost:4000/api/hotel/countbycity 
    method: get
    test result: OK
 */
//all count data list 
exports.hotelsByCity = async (req, res, next) => {
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    try {
        /**
         * cityArray = holds the converted data from cityArrayobj OBJECT as an array of object
            requiredCity = this is the final array that holds the final random city out put
         */
        let cityArray, requiredCity = []

        let cities = await HotelModel.find({}).select('city') // fetching all the cities

        let cityArrayobj = JSON.stringify(cities); //converting obj to arrayObj

        cityArray = cities.map(function (obj) { //converting into array
            return obj.city;
        });

        let allCity = shuffle([...new Set(cityArray)]); //suffling the array to get different array


        if (allCity.length > 3) {
            requiredCity = allCity.slice(0, 3); // picking first 3 value of the suffled array
        } else {
            requiredCity = allCity
        }

        let data = await Promise.all(requiredCity.map(city => { //fetching all counting of the query
            return HotelModel.countDocuments({ city: city })
        }))


        return res.status(200).json({ citydata: data, city: requiredCity })

    } catch (error) {
        console.log(error);
        return next(HandelError(404, 'No data Found'))
    }
}


/** 
    *route: localhost:4000/api/hotel/countbytype 
    method: get
    test result: OK
 */
//all count data list 
exports.hotelsByType = async (req, res, next) => {
    try {
        /**
         * cityArray = holds the converted data from cityArrayobj OBJECT as an array of object
            requiredCity = this is the final array that holds the final random city out put
         */
        let TypeArray = ['Hotel', 'Apartment', 'Resort', 'Villa', 'Cabin', 'Guest-House']


        let data = await Promise.all(TypeArray.map(type => { //fetching all counting of the query
            return HotelModel.countDocuments({ type: type })
        }))


        // return res.status(200).json({ countData: data, HotelType: TypeArray })
        return res.status(200).json([
            { type: TypeArray[0], count: data[0] },
            { type: TypeArray[1], count: data[1] },
            { type: TypeArray[2], count: data[2] },
            { type: TypeArray[3], count: data[3] },
            { type: TypeArray[4], count: data[4] },
            { type: TypeArray[5], count: data[5] }
        ])

    } catch (error) {
        console.log(error);
        return next(HandelError(404, 'No data Found'))
    }
}