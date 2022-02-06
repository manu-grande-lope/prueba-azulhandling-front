import { Fragment, useState } from "react";
import './styles.css'



export default function InputFlights() {

    const [flightNumberReg, setflightNumberReg] = useState("")
    const [regReg, setRegReg] = useState("")
    const [airportReg, setAirportReg] = useState("")
    const [ailineReg, setAirlineReg] = useState("")
    const [statusReg, setStatusReg] = useState("")


    return (
        <Fragment>
            <div className='input_style'>
                <h2>ADD FLIGHT</h2>
                <label>Flight Number</label>
                <input type="text"
                    onChange={(e) => {
                        setflightNumberReg(e.target.value);
                    }} />
                       <label>REG</label>
                <input type="text"
                    onChange={(e) => {
                        setRegReg(e.target.value);
                    }} />
                <label>Airport</label>
                <input type="text"
                    onChange={(e) => {
                        setAirportReg(e.target.value);
                    }} />
                     <label>Airline</label>
                <input type="text"
                    onChange={(e) => {
                        setAirlineReg(e.target.value);
                    }} />
                <label>Status</label>
                <input type="text"
                    onChange={(e) => {
                        setStatusReg(e.target.value);
                    }} />
                <button>SEND</button>
            </div>
        </Fragment>
    )
}