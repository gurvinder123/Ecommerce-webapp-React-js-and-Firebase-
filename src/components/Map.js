import React, {Component} from 'react';
import { Map,
         InfoWindow,
         Marker,
         GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: true,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div style={{width:'500px', height:'500px'}}>
        <Map
          google={this.props.google}
          initialCenter={{ lat: 37.3357807, lng: -121.8821639 }}
          zoom={15}
          onClick={this.onMapClicked}
          responsive
        >
          <Marker onClick={this.onMarkerClick} name={'ShopLift'} />
          <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
            <h1>{this.state.selectedPlace.name}</h1>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({})(MapContainer);
