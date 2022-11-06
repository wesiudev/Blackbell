import send from '../../../common/images/send.png'

type button = {
    text: string
}

export const Button = (props: button) => {
    return(
        <>
            <div className="box">
            <button className="actionBtn">{props.text} <img src={send} alt="" /> 
            </button>
               
                <span className="right"></span>
                <span className="bottom"></span>

            </div> 
        </>
    )
}

export default Button