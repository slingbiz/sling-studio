import React, {Component} from 'react';
import {DirectionsRenderer, GoogleMap, withGoogleMap} from 'react-google-maps';

const google = window.google;

const DirectionsExampleGoogleMap = withGoogleMap((props) => (
  <GoogleMap defaultZoom={7} defaultCenter={props.center}>
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapDirections extends Component {
  constructor() {
    super();
    this.state = {
      origin: new google.maps.LatLng(41.85073, -87.65126),
      destination: new google.maps.LatLng(41.85258, -87.65141),
      directions: null,
    };
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: this.state.origin,
        destination: this.state.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  }

  render() {
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div className='cr-embed-responsive cr-embed-responsive-21by9' />
        }
        mapElement={<div className='cr-embed-responsive-item' />}
        center={this.state.origin}
        directions={this.state.directions}
      />
    );
  }
}
