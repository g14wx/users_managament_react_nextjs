import {MutableRefObject, useEffect, useRef} from "react";
import anime, {AnimeInstance} from "animejs";


interface IAnimatedTextProps {
    title: string | null,
    showButton: boolean | null
}

export default function AnimatedTextEffect13({title, showButton}: IAnimatedTextProps) {
    const animationRef: MutableRefObject<AnimeInstance | null> = useRef(null);

    useEffect(() => {
        const textWrapper: HTMLElement = document.querySelector('.ml3') as HTMLElement;
        textWrapper.innerHTML = textWrapper.textContent?.replace(/\S/g, "<span class='letter'>$&</span>") as string;
        animationRef.current = anime.timeline({loop: true})
            .add({
                targets: '.ml3 .letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 2250,
                delay: (_, i) => 150 * (i + 1)
            }).add({
                targets: '.ml3',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            });
    }, []);

    return (
        <>
            {showButton ? <button onClick={() => animationRef.current?.restart()}>Restart</button> : null}
            <h1 className="ml3">{title || 'demo'}</h1>
        </>);
}