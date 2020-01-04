import React from 'react';
import { Wrapper, Container, Informational, Price, Button } from './styles/TotalPrice.js';
import NightsMessage from './NightsMessage.jsx';
import ServiceFees from './ServiceFees.jsx'

class TotalPrice extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            pricePerNight: this.props.pricePerNight,
            cleaningFees: this.props.cleaningFees,
            serviceFees: this.props.serviceFees,
            amountOfNights: this.calcTotalNights(),
            isNightMessageClicked: false,
            isServiceFeesMessageClicked: false,
        }
        this.calcTotalNights = this.calcTotalNights.bind(this);
        this.clickNightMessage = this.clickNightMessage.bind(this);
        this.clickServiceFeesMessage = this.clickServiceFeesMessage.bind(this);
    }

    componentDidUpdate() {
        if (this.state.pricePerNight !== this.props.pricePerNight ||
             this.state.cleaningFees !== this.props.cleaningFees ||
             this.state.serviceFees !== this.props.serviceFees ||
             this.props.end - this.props.start !== this.state.amountOfNights) {
                this.setState({pricePerNight: this.props.pricePerNight,
                cleaningFees: this.props.cleaningFees,
                serviceFees: this.props.serviceFees,
            amountOfNights: this.calcTotalNights()})
             }
    }

    calcTotalNights() {
        return this.props.end - this.props.start;
    }

    clickNightMessage() {
        this.state.isNightMessageClicked ?
        this.setState({isNightMessageClicked: false}) :
        this.setState({isNightMessageClicked: true});
    }

    clickServiceFeesMessage() {
        this.state.isServiceFeesMessageClicked ?
        this.setState({isServiceFeesMessageClicked: false}) :
        this.setState({isServiceFeesMessageClicked: true});
    }

    render() {
      let total = this.calcTotalNights();
      let totalBillForRooms = total * this.state.pricePerNight;
      const {pricePerNight, cleaningFees, serviceFees} = this.state;
        return(
            <Wrapper>
        <Container><Informational>{pricePerNight} x {total} nights <Button onClick={this.clickNightMessage}>?</Button></Informational><Price>{pricePerNight * total}</Price></Container>
            {this.state.isNightMessageClicked ? <NightsMessage/> : <div></div>}
            <Container><Informational>Service fees <Button onClick={this.clickServiceFeesMessage}>?</Button></Informational><Price>{serviceFees}</Price></Container>
            {this.state.isServiceFeesMessageClicked ? <ServiceFees/> : <div></div>}
        <Container><Informational>Occupancy taxes and fees</Informational><Price>{cleaningFees}</Price></Container>
    <Container><Informational>Total:</Informational><Price>{cleaningFees + serviceFees + totalBillForRooms}</Price></Container>
            </Wrapper>
        )
    }
}

export default TotalPrice;