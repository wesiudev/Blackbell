export const AboutMe = () => {
    return(
        <div className="about paddingLeft">
            <AboutInput input={["Moje", "zamiłowanie", "do", "tworzenia", "zaczęło", "się"]}></AboutInput>
            <AboutInput input={["w", "2014", "roku.", "Był", "to", "świat", "w", "którym", "się"]}></AboutInput>
            <AboutInput input={["odnalazłam.","Z","czasem","zaczęłam","brać","to","na"]}></AboutInput>
            <AboutInput input={["poważnie,","aż","w","końcu","stało","się","to","dla","mnie"]}></AboutInput>
            <AboutInput input={["metodą","na","życie.","Ze","wszystkiego","można"]}></AboutInput>
            <AboutInput input={["czerpać","inspirację","jeżeli","potrafi","się","patrzeć,"]}></AboutInput>
            <AboutInput input={["a","co","więcej,","widzieć.","","","","","","","","","","","","","",""]}></AboutInput>
        </div>
    )
}

export const AboutMeEng = () => {
    return(
        <div className="about paddingLeft">
            <AboutInput input={["I'm", "passionate", "about", "art", "since", "year", "2014,"]}></AboutInput>
            <AboutInput input={["it", "was", "something", "that", "I", "found", "myself","in."]}></AboutInput>
            <AboutInput input={["Over","the","time","I","started","to", "take", "art", "seriously"]}></AboutInput>
            <AboutInput input={["and","it","became","my","method","for","living.","You","can"]}></AboutInput>
            <AboutInput input={["get","inspiration","from","everything","that","surruonds", "you,"]}></AboutInput>
            <AboutInput input={["if","you're","able","to","look,","for","it","and","more","immportant","to","truly","see", "it"]}></AboutInput>
        </div>
    )
}

export const AboutArt = () => {
    return(
        <div className="about paddingRight">
            <AboutInput input={["W","swoich","projektach","staram","się","umieszczać"]}></AboutInput>
            <AboutInput input={["myśli,","które","towarzyszą","mi","w","życiu","codziennym"]}></AboutInput>
            <AboutInput input={[ "i","nie","tylko.","Tworzę","obrazy","inspirowane","światem"]}></AboutInput>
            <AboutInput input={["przyrody,","okultyzmu","i","wnętrza","duchowego."]}></AboutInput>
            <AboutInput input={["Oczywiście","znajdą","się","takie,","które","będą","czysto"]}></AboutInput>
            <AboutInput input={["dekoracyjne."]}></AboutInput>

        </div>
    )
}

export const AboutArtEng = () => {
    return(
        <div className="about paddingRight">
            <AboutInput input={["When","I","create","I","always","try", "to", "materialize"]}></AboutInput>
            <AboutInput input={["my","thoughts","from","everyday","life,","in","addiction", ]}></AboutInput>
            <AboutInput input={["to","my","spiritual", "inside.","I","create","art","that's", "inspired"]}></AboutInput>
            <AboutInput input={["by","the","world","of","nature,","occultism", 'and','the', 'spirit.']}></AboutInput>
            <AboutInput input={["Of","course","there","will","be","art", "that","will","be", "purely"]}></AboutInput>
            <AboutInput input={["decorative."]}></AboutInput>

        </div>
    )
}

export const AboutRequest = () => {
    return(
        <div style={{margin:'50px auto', width:"70vw"}} className="about">
            <p>Zajmuję się tworzeniem sztuki na zamówienie, </p>
            <hr />
            <p>w celu zakupu pracy tego typu zapraszam do kontaktu.</p>
        </div>
    )
}

export const AboutRequestEng = () => {
    return(
        <div style={{margin:'50px auto', width:"70vw"}} className="about">
            <p>I create art on request,</p>
            <hr />
            <p>If you're interested in this type of art, please contact me.</p>
        </div>
    )
}

type text = {
    input: string[]
}

const AboutInput = (arrayOfText: text) => {
    return(
        <>
            <span className="about__text">
                {arrayOfText.input.map((item, idx) => (
                    <div key={idx}>{item}</div>
                ))}
            </span>
        </>
    )
}