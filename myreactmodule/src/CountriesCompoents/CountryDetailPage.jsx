import { Form, FormItem, Text, Link, Input, Icon, Button } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import OSM from 'ol/source/OSM.js';
import Vector from 'ol/layer/Vector';
import Feature from "ol/Feature";
import VectorSrc from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile.js';
import Overlay from "ol/Overlay";

import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
function CountryDetailPage({ country, countryName }) {
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    const [map, setMap] = useState(null);
    const [overlay, setOverlay] = useState(null);
    var closer = document.getElementById('popup-closer');
    const [cities, setCities] = useState([]);
    const [citiesBackup, setCitiesBackup] = useState([]);
    const [countryDetail, setCountryDetail] = useState({"Country":"","ISO_Code":"","CountryCode2":"","CountryCode3":"","CurrencyName":"","CurrencyCode":"","CapitalCity":"","flag":""});
    console.log("countryDetail", countryDetail);


    // let layer = new Vector({
    //     source: new VectorSrc({
    //         features: [
    //             new Feature({
    //                 geometry: new Point(fromLonLat([4.35247, 50.84673]))
    //             })
    //         ]
    //     })
    // });
    // map.addLayer(layer);
    const removePointLayers = () => {
        map.getLayers().getArray()
            .filter(layer => layer.get('name') === 'mapPointer')
            .forEach(layer => map.removeLayer(layer));
    }
    const addSelectedCityLayer = (Lng, Lat) => {
        let layer = new Vector({
            source: new VectorSrc({
                features: [
                    new Feature({
                        geometry: new Point(fromLonLat([Lng, Lat])),
                        name: "Testing"
                    })
                ]
            }),
            name: "mapPointer",
            style: {
                'circle-radius': 5,
                'circle-fill-color': 'green',
                'circle-stroke-color': 'green',
                'circle-stroke-width': 1,
            },
        });
        if (map) {
            map.addLayer(layer);
            // map.getView().setZoom(6);
            map.getView().setCenter(fromLonLat([Lng, Lat]));
        }
    }


    const fetchCitiesDetail = async () => {
      //  const baseURL = process.env.REACT_APP_SERVER_URI;
        const baseURL = "MyDataprovider";
        try {
            if (country) {
                const response = await fetch(baseURL + '/countries/' + country.Country + "/cities", {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                console.log(result)
                setCities(result);
                setCitiesBackup(result);

                let capitalCity = result.filter((item) => {
                    if (item.City === country.CapitalCity) {
                        return item;
                    }
                });
                console.log(capitalCity);
                if(capitalCity.length > 0){
                    addSelectedCityLayer(capitalCity[0].Lng, capitalCity[0].Lat);
                }
               
            }
        } catch (error) {
            console.log(error);
        }
    }
    const filterCities = (e) => {
        let filtervalue = e.target.value;
        if (filtervalue) {
            filtervalue = filtervalue.toLowerCase();
            console.log("Filter starts with", filtervalue);
            let filteredCities = citiesBackup.filter(city => {
                return city.City.toLowerCase().startsWith(filtervalue);
            });
            setCities(filteredCities);
        } else {
            setCities(citiesBackup);
        }
    }
    useEffect(() => {
        if(map){
        removePointLayers();
    }
        setCountryDetail(country);
        fetchCitiesDetail();


    }, [countryName]);
    useEffect(() => {
        var map = new Map({
            layers: [
                new TileLayer({ source: new OSM() }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 4,
            }),
            target: 'map',
        });
        var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        setOverlay(overlay);
        map.addOverlay(overlay);
        if (closer) {
            closer.onclick = function () {
                if (overlay) {
                    overlay.setPosition(undefined);
                }
                if (closer) {
                    closer.blur();
                }
                return false;
            };
        }
        // map.on('singleclick', function (event) {
        //     if (map.hasFeatureAtPixel(event.pixel) === true) {
        //         var coordinate = event.coordinate;
        //         if(content){
        //             content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
        //         }
        //       if(overlay){
        //         overlay.setPosition(coordinate);
        //       }

        //     } else {
        //         if(overlay){
        //             overlay.setPosition(undefined);
        //         }
        //         if(closer){
        //             closer.blur();
        //         }
        //     }
        // });
        if (content) {
            content.innerHTML = '<b>Hello !</b><br />I am here.';
        }
        // if (overlay) {
        //     overlay.setPosition(fromLonLat([4.35247, 50.84673]));
        // }
        setMap(map);
    }, []);
    return <div className="sapScrollBar" style={{ width: "100%", background: "var(--sapGroup_ContentBackground)", overflowY: "scroll" }}>
     
            <>
                <div style={{ display: "flex", justifyContent: "space-between", height: "60px", background: "var(--sapContent_Illustrative_Color1)", color: "white" }}>
                    <h1 style={{ marginLeft: "10px", marginTop:"0px", marginBottom:"0px" }}> {country.Country} ( {countryDetail.CapitalCity} )</h1>
                    <img src={countryDetail.flag} style={{ marginRight: "10px", borderRadius: "10px" }} />
                </div>
                 <Form
                    backgroundDesign="Solid"
                    columnsL={3} columnsM={3} columnsS={1} columnsXL={2}
                    labelSpanL={4} labelSpanM={4} labelSpanS={12} labelSpanXL={4}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <FormItem label="ISO Code">
                        <Text>   {countryDetail.ISO_Code} </Text>
                    </FormItem>
                    {/* <FormItem label="Country Code">
                        <Text>   {countryDetail.CountryCode2} / {countryDetail.CountryCode3}</Text>
                    </FormItem> */}
                    <FormItem label="Currency">
                        <Text>   {countryDetail.CurrencyName} </Text>
                    </FormItem>
                    <FormItem label="Currency Code">
                        <Text>  {countryDetail.CurrencyCode} </Text>
                    </FormItem>
                </Form> 

                <div> <h2 style={{margin:"0px", color:"var(--sapTextColor)"}}> Cities ( {cities?.length} )</h2>
                    <Input placeholder="Search" icon={<Icon name="search" />}
                        onInput={function _a(e) { filterCities(e); }} />
                    <Button onClick={() => {
                        removePointLayers();
                    }}>Clear Points</Button></div>
                <div className="sapScrollBar" style={{ background: "var(--sapGroup_ContentBackground)", maxHeight: "50px", overflowY: "auto" }}>
                    {cities?.map((city) => {
                        return  (<><Link key={city.City} onClick={function _a() {
                            console.log(city);

                            addSelectedCityLayer(city.Lng, city.Lat);
                            // if (overlay) {
                            //     overlay.setPosition(fromLonLat([city.Lng, city.Lat]));
                            // }
                        }}>
                            {city.City}
                        </Link>
                        <span style={{color:"var(--sapTextColor)" ,marginLeft:"3px", marginRight:"3px"}}>|</span>
                        </>)
                    })
                    }
                </div>

            </>
        
        <div id="map" style={{ width: "100%", height: "70vh" }}></div>
        <div id="popup" className="ol-popup">
            <a href="#" id="popup-closer" className="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
    </div>
}
export default CountryDetailPage;