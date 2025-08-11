import { Title, List, ListItemStandard, ListItemCustom, Button, ListGrowingMode, SplitterLayout, SplitterElement, Input, Icon } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import CountryDetailPage from "./CountryDetailPage";
function CountriesMainPage() {
    const [countries, setCountries] = useState([]);
    const [countriesOriginal, setCountriesOriginal] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCountryName, setSelectedCountryName] = useState("");

    const fetchCountries = async () => {
        const baseURL = "MyDataprovider";
      //  const baseURL = process.env.REACT_APP_SERVER_URI;
        try {
            const response = await fetch(baseURL + '/countries', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            setCountries(result);
            setCountriesOriginal(result);
            if (!selectedCountry) {
                setSelectedCountry(result[0]);
                setSelectedCountryName(result[0].Country);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const filterCountries = (e) => {
        let filtervalue = e.target.value;

        if (filtervalue) {
            filtervalue = filtervalue.toLowerCase();
            console.log("Filter starts with", filtervalue);
            setCountries(countriesOriginal.filter(country => {
                return country.Country.toLowerCase().startsWith(filtervalue);
            }));
        } else {
            setCountries([...countriesOriginal]);
        }
    }
    useEffect(() => {
        fetchCountries();
    }, [])
    return <div>

        <SplitterLayout
            style={{
                height: '92vh',
                width: '100%'
            }}
        >
            <SplitterElement minSize="25dvw" size="25dvw" resizable={false}>
                <div style={{ width: "100%" }}>
                    <Input
                        showClearIcon={true}
                        placeholder="Search"
                        style={{ width: "100%", margin: "0px", height: "60px", borderRadius: "0px", fontSize:"20px" }}
                        icon={<Icon name="search"  style={{height: "60px", width:"30px"}} />}
                        onInput={function _a(e) { filterCountries(e); }}
                        onSuggestionItemPreview={function _a() { }}
                        onSuggestionItemSelect={function _a() { }}
                    />
                    <List style={{ height: "84vh" }}
                        onItemClick={(e) => {
                            console.log(e.detail.item.innerHTML);
                            let countryDetail = countriesOriginal.filter(item => item.Country === e.detail.item.innerHTML);

                            if (countryDetail.length === 1) {
                                setSelectedCountry(countryDetail[0]);
                                setSelectedCountryName(e.detail.item.innerHTML);
                            } else {
                                setSelectedCountry(null);
                                setSelectedCountryName("");
                            }
                        }}
                    >
                        {countries?.length > 0 && countries.map((country) => {
                            return <ListItemStandard
                                className="CountryList"
                                key={country.CountryCode2}
                                additionalText={country.CountryCode3}
                                type="Navigation"
                                image={country.flag}
                            >
                                {country.Country}
                            </ListItemStandard>
                        })}
                    </List>
                </div>
            </SplitterElement>
            <SplitterElement>
                <CountryDetailPage country={selectedCountry} countryName={selectedCountryName} />
            </SplitterElement>
        </SplitterLayout>
    </div>
}
export default CountriesMainPage;