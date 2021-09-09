import Typewriter from "typewriter-effect";

import "./styles.scss";

type PropsT = {
    modifier: string
    isTyping: boolean
}

export const AppLogo: React.FC<PropsT> = ({modifier, isTyping}) => {

    return (
        <div className={`app-logo ${modifier}`}>
            { isTyping ?
            <Typewriter
                onInit={(typewriter) => {
                    typewriter.typeString('<strong style="font-size: 3.9rem; text-align: left">Hello! it\'s </strong>')
                        .pauseFor(400)
                        .deleteAll(20)
                        .typeString('<strong class="mx-auto" >Invest Track</strong>')
                        .start();
                }}
                options={{
                    delay: 30
                }}
            /> :
            <span>Invest Track</span>
            }
        </div>
    )
}