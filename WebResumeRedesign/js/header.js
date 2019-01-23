var titleBg = document.getElementById("title-bg");

recalculateAngle = () => {

    //Calculate the correct angle to skew the title 
    //background by. We want the title background
    //To be angled such that it forms a triangle
    //whose top side is 75% the length of the viewport
    let display = "";
    let viewHeight = window.innerHeight;
    let viewWidth = window.innerWidth;
    let sideOpposite = viewHeight;
    let sideAdjacent = .75 * viewWidth;
    let thetaRad = Math.atan(sideOpposite / sideAdjacent);

    if (viewHeight <= 800 || viewWidth <= 800) {
        display = "display: none;";
    } else {
        display = "";
    }

    titleBg.setAttribute("style",
        `position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: skewY(${-thetaRad}rad);
        transform-origin: top left;
        background-image: linear-gradient(rgba(0, 42, 121, 1.0), rgb(34, 86, 121));
        border-bottom: 10px solid lightgrey;
        ${display}`
    );

    // console.log(sideOpposite, sideAdjacent, thetaDegree);
}
window.onload = recalculateAngle;
window.onresize = recalculateAngle;
