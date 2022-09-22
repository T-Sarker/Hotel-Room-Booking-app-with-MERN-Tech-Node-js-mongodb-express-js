import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const allData = await axios.get(url)
                setData(allData.data.citydata)
                setCity(allData.data.city)
            } catch (error) {
                console.log(error);
                setError(error)
            }
            setLoading(false)
        }
        fetchData()

    }, [url])

    return { data, city, loading, error }

}
export default useFetch;