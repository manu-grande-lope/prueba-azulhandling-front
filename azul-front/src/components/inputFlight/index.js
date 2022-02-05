import { Fragment, useState } from "react";
import './styles.css'



export default function InputFlights() {

    const [atpReg, setAtpReg] = useState("")
    const [flightNumberReg, setflightNumberReg] = useState("")

    return (
        <Fragment>
            <div className='input_style'>
                <h1>ADD FLIGHT</h1>
                <label>APT</label>
                <input type="text"
                    onChange={(e) => {
                        setAtpReg(e.target.value);
                    }} />
                <label>Flight Number</label>
                <input type="text"
                    onChange={(e) => {
                        setflightNumberReg(e.target.value);
                    }} />
                <button>SEND</button>
            </div>
        </Fragment>
    )
}