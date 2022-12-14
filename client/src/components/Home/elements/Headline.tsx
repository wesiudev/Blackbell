type headline = {
    text: string
}

export const Headline = (props: headline) => {
    return(
        <div className="headline">
            <h1>
                {props.text}
            </h1>
            <hr />
        </div>
    )
}