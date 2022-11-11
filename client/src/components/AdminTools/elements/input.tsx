type InputProps = {
    name: string
    label: string
}

const Input = (props: InputProps) => {
    return(
        <>
            <div className="newProduct__content__inputs__input">
                <label htmlFor={props.name}>{props.label}</label>
                <input type="text" name={props.name} />
            </div>
        </>
    )
}

export default Input