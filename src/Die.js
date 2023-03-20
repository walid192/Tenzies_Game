import React from "react"


export default function Die(props){
    let backgroundColor=props.isHeld ? "#59E391" : "white"

    return(
        <div className="die--face" style={{backgroundColor:backgroundColor}} onClick={props.holdDice}>
            <h2 className="die--num">{props.value}</h2>
        </div>
    )
}





// export default function Die(props) {
//     const styles = {
//         backgroundColor: props.held ? "#59E391" : "white"
//     }
//     return (
//         <div className="die-face" onClick={props.hold} style={styles}>
//             <h2 className="die-num">{props.value}</h2>
//         </div>
//     )
// }
