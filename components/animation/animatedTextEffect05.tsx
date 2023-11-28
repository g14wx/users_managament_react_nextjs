import {MutableRefObject, useEffect, useRef} from "react";
import anime, {AnimeInstance} from "animejs";
import {Button} from "antd";


interface IAnimatedTextProps {
    title1: string | null,
    title2: string | null,
    showButton: boolean | null
}

export default function AnimatedTextEffect05({title1, title2, showButton}: IAnimatedTextProps) {
    const animationRef: MutableRefObject<AnimeInstance | null> = useRef(null);

    useEffect(() => {
        animationRef.current = anime.timeline({loop: false})
            .add({
                targets: '.ml5 .line',
                opacity: [0.5,1],
                scaleX: [0, 1],
                easing: "easeInOutExpo",
                duration: 700
            }).add({
                targets: '.ml5 .line',
                duration: 600,
                easing: "easeOutExpo",
                translateY: (_: Element, i: number) => (-0.625 + 0.625*2*i) + "em"
            }).add({
                targets: '.ml5 .ampersand',
                opacity: [0,1],
                scaleY: [0.5, 1],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=600'
            }).add({
                targets: '.ml5 .letters-left',
                opacity: [0,1],
                translateX: ["0.5em", 0],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=300'
            }).add({
                targets: '.ml5 .letters-right',
                opacity: [0,1],
                translateX: ["-0.5em", 0],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=600'
            });
        setTimeout(()=>{
            if (!animationRef.current?.paused){
                animationRef.current?.pause();
            }
        }, 3000);
    }, []);

    return (
        <>
            {showButton ? <Button onClick={() => animationRef.current?.restart()}>Restart</Button> : null}
            <h1 className="ml5">
  <span className="text-wrapper">
    <span className="line line1"></span>
    <span className="letters letters-left">{title1 || "title1"} </span>
    <span className="letters ampersand">&amp;</span>
    <span className="letters letters-right"> {title2 || "title2"}</span>
    <span className="line line2"></span>
  </span>
            </h1>
        </>);
}