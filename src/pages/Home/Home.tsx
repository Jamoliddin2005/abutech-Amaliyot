import { useEffect, useState } from 'react'
import classes from "./Home.module.css"
import { api } from '../../api';
import Loading from '../../components/Loading/Loading';
import { Link } from 'react-router-dom';


interface Props {
    country: string,
    geonameid: number,
    name: string,
    subcountry: string,
}

function Home() {
    const [search, setSearch] = useState("")
    const [countries, setCountries] = useState<[]>([])
    const [loading, setLoading] = useState(true)

    const [searchedBoolean, setSearchedBoolean] = useState<boolean>(false)
    const [searchedCountries, setSearchedCountries] = useState<[]>([])


    // weather
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false)
    const [temp, setTemp] = useState<number>()
    const [description, setDescription] = useState<string>("")
    const [windSpeed, setWindSpeed] = useState<number>()
    const [humidity, setHumidity] = useState<number>()
    const [weatherImg, setWeatherImg] = useState<string>("")

    // Countries find

    useEffect(() => {
        getAllCountries()
    }, [])

    const getAllCountries = async () => {
        setLoading(true)
        let countries = await api.getCountries()
        const newFilter: any = countries.filter((value: any) => {
            return value.country.toLowerCase().includes("Uzbekistan".toLowerCase());
        });
        setCountries(newFilter);
        setLoading(false)
    }

    const GetCountry = (e: string) => {
        setSearchedBoolean(true)
        if (e == "") {
            setSearchedBoolean(false)
        }
        setSearch(e)
        if (!search) {
            setSearchedBoolean(false)
        }
        const searchWord = e;
        const newFilter: any = countries.filter((value: any) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        setSearchedCountries(newFilter);
    }

    // Country Find
    const GetId = async (item: Props) => {
        let geonameid = item.geonameid
        let name = item.name
        localStorage.setItem("country", JSON.stringify(geonameid))
        localStorage.setItem("countryName", name)
        FindCount()
    }

    const FindCount = async () => {
        if (!localStorage.getItem("countryName")) {
            localStorage.setItem("countryName", "Tashkent")
        }
        let name = localStorage.getItem("countryName")
        setWeatherLoading(true)
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`)
            .then((res) => res.json())
            .then(res => {
                setWeatherImg(`https://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`)
                setTemp(Math.floor(res.main.temp));
                setDescription(res.weather[0].description);
                setWindSpeed(Math.floor(res.wind.speed));
                setHumidity(res.main.humidity);
            }).catch(err => {
                localStorage.setItem("countryName", "Tashkent")
                FindCount()
            })
        setWeatherLoading(false)
    }

    useEffect(() => {
        FindCount()
    }, [])


    return (
        <div className={classes.Home}>
            <div className={classes.sidebar}>
                {
                    loading ? <Loading width="100px"
                        height="100px"
                        transform={"translateZ(0) scale(1)"}
                    />
                        : countries
                        && countries.map((item: Props, index) => {
                            return (
                                <Link
                                    to={`/${item.geonameid}`}
                                    key={index}
                                    className={classes.country}
                                    onClick={() => {
                                        GetId(item)
                                        setSearchedBoolean(false)
                                    }}
                                >
                                    {item.name}
                                </Link>
                            )
                        })
                }
            </div>
            <header>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='Search...'
                    className={classes.SearchInput}
                    value={search}
                    onChange={(e) => GetCountry(e.target.value)} />
                {searchedBoolean && <div className={classes.searchedDiv}>
                    {searchedCountries && searchedCountries.map((item: Props, index) => {
                        return (
                            <Link
                                to={`/${item.geonameid}`}
                                key={index}
                                className={classes.country}
                                onClick={() => {
                                    GetId(item)
                                    setSearchedBoolean(false)
                                }}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>}
                <div className={classes.weather}>
                    {
                        weatherLoading ? <Loading width="400px"
                            height="400px"
                            transform={"translateZ(0) scale(1)"} /> :
                            <div >
                                <h1>{localStorage.getItem("countryName")}</h1>
                                <img src={weatherImg} alt="" />
                                <span>{description}</span>
                                <h2>{temp}°</h2>
                                <div className={classes.weatherItem}>
                                    <h5>AIR CONDITIONS</h5>

                                    <div className="row">
                                        <div className={classes.item}>
                                            <div className={classes.item_left}>
                                                <svg viewBox="0 0 512 512">
                                                    <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className={classes.item_right}>
                                                <h4>Wind</h4>
                                                <h3>{windSpeed} m/h</h3>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.item_left}>
                                                <svg viewBox="0 0 352 512" >
                                                    <path d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className={classes.item_right}>
                                                <h4>Chance of rain</h4>
                                                <h3>{humidity} %</h3>
                                            </div>
                                        </div>
                                        <div className={classes.item}>
                                            <div className={classes.item_left}>
                                                <svg viewBox="0 0 352 512" >
                                                    <path d="M205.22 22.09c-7.94-28.78-49.44-30.12-58.44 0C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 448c-61.75 0-112-50.25-112-112 0-8.84 7.16-16 16-16s16 7.16 16 16c0 44.11 35.89 80 80 80 8.84 0 16 7.16 16 16s-7.16 16-16 16z">
                                                    </path>
                                                </svg>
                                            </div>
                                            <div className={classes.item_right}>
                                                <h4>Chance of rain</h4>
                                                <h3>{humidity} %</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </header>
        </div >
    );
}

export default Home