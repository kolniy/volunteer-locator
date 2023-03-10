import React, { useState, useRef, useMemo, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Col,
  Container,
  Row,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import VolunteerMarker from "./VolunteerMarker";
import getAddressGiocode from "../utilities/getAddressGiocode";
import getVolunteerLocations from "../utilities/getVolunteerLocations";

const AppContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [volunteerLocations, setVolunteerLocations] = useState([]);
  const [myAddress, setMyAddress] = useState(null);
  const mapRef = useRef();
  const center = useMemo(() => ({ lat: 9.076479, lng: 7.398574 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const updatePosition = (coordinates) => {
    setMyAddress(coordinates);
    mapRef.current?.panTo(coordinates);
  };

  const handleFormSubmitHandler = async (e) => {
    e.preventDefault();
    const { lat, lng } = await getAddressGiocode(searchQuery);
    updatePosition({ lat, lng });
    const foundVolunteerLocations = await getVolunteerLocations({ lat, lng });
    setVolunteerLocations(foundVolunteerLocations);
  };

  return (
    <>
      <div className="app-container">
        <Container fluid>
          <Row>
            <Col xs="12" sm="3" md="3" lg="3">
              <div className="controls-container">
                <Form onSubmit={(e) => handleFormSubmitHandler(e)}>
                  <FormGroup className="form-group-style">
                    <Label>Input Address</Label>
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Location"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" block color="info">
                      Search
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </Col>
            <Col xs="12" sm="9" md="9" lg="9">
              <div className="map-views__container">
                {isLoaded ? (
                  <GoogleMap
                    center={center}
                    zoom={10}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                  >
                    {myAddress && (
                      <>
                        <Marker
                          position={myAddress}
                          icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                          title="Your Address."
                        />
                      </>
                    )}
                    {volunteerLocations.length > 0 && (
                      <>
                        {volunteerLocations.map((location) => (
                          <VolunteerMarker
                            key={location.place_id}
                            foundLocation={location}
                          />
                        ))}
                      </>
                    )}
                  </GoogleMap>
                ) : (
                  <></>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AppContainer;
