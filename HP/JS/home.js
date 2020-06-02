window.addEventListener('load', () => {
    // variables at top scope has been used since, i've used only 1 line as an object;
    let body = document.querySelector('body');
    let canvas = document.querySelector('.canvas');
    let c = undefined;
    let checkBtn = [...document.querySelectorAll("input")];
    
    //let px, py1,py2,initialPoints,linePoints,distance,linesArray,noOfLines; 
    if(canvas.getContext){
        c = canvas.getContext('2d');
    }
    let setCanvas  = () => {
        canvas.width  = window.innerWidth;
        setTimeout(() => {
            canvas.height = window.innerHeight;
        },0)
    }
    body.style.margin = '0';
    window.onresize = setCanvas;
    setCanvas();
    // canvas variables
    let px = canvas.width/2;
    let py1 = 10;
    let py2 = canvas.height-10;
    let initialPoints= [[px,py1]];
    let linePoints = [];
    let distance;
    let linesArray = [];
    let noOfLines = 1;
    let colorChange = 0 ;

    // helperFunctions
    let minMax = (min,max) => {
        return (Math.random()* (max -min)) + min;
    }

    let randomColor = () => {
        if(colorChange == 0) {
            let color = '#fff';
            return color;
        }else {
            let r = Math.floor(minMax(10,254));
            let g = Math.floor(minMax(5,254));
            let b = Math.floor(minMax(10,254));
            let color = `rgb(${r}, ${g}, ${b})`;
            return color;
        }
    }

    // line object
    class Line {
        constructor(){
            this.midPoint;
        } 
        drawLine(){  
                let strokeWidth = minMax(0.2,4);
                let color = randomColor();
                c.beginPath();
                c.moveTo(linePoints[0][0],linePoints[0][1]);
                for(let i = 1; i < linePoints.length ; i++) {
                    c.lineTo(linePoints[i][0],linePoints[i][1])
                }
                c.lineWidth = strokeWidth;
                c.stroke();
                c.strokeStyle = color;
        }
        midPointBreak(){
         initialPoints= [[px,py1]];
         let noOfBreak = Math.floor(Math.random() * (5-4) + 4);
         let maxDisplacement = Math.round(Math.random()) * 2-1;
         maxDisplacement = ((Math.random()* (90-15)) + 15) * maxDisplacement;
         // setting the last Point
         let lastX = minMax((canvas.width/2)-10,(canvas.width/2) + 10);
         let lastY = canvas.height;
         initialPoints.push([lastX,lastY]);
         let points = [[...initialPoints[0]]];
         let dx = (initialPoints[1][0] - initialPoints[0][0]);
         let dy = (initialPoints[1][1] - initialPoints[0][1]);
         distance = Math.sqrt((dx * dx) + (dy*dy));
         let singleSectionLength;
         let divisor = 2;
         for(let i = 1; i <= noOfBreak; i++){
            singleSectionLength = distance/ divisor;
            divisor = divisor * 2;
         }
         let noOfPoints = (divisor/2)-1;
         let midPoint = ((noOfPoints+1)/2);
         for(let i = 0; i < noOfPoints; i++ ) {
            // below code is to displace right at the middle point of the line
            //  if(i == midPoint){
            //      points.push([points[i][0]+singleSectionLength,this.pmV-maxDisplacement]);
            //  }else {
            //     points.push([points[i][0]+singleSectionLength,this.pmV + (Math.random() * (maxDisplacement- 10 ))]);
            //  }
            //points.push([points[i][0]+singleSectionLength,this.pmV + (Math.random() * (maxDisplacement-10) + 10)]);
            points.push([px + (Math.random() * maxDisplacement), points[i][1] + singleSectionLength]);
         }
         linePoints = [...points,[lastX,lastY]]
         this.drawLine();
        }
    }

    // creating the line --> Just a single line
    for (let i = 0; i < noOfLines; i++) {
        linesArray.push(new Line());
    }
    let init = () => {
        setTimeout(() => {
            requestAnimationFrame(init);
            c.clearRect(0,0,canvas.width,canvas.height)
            for(let i = 0; i < linesArray.length; i++ ) {
                linesArray[i].midPointBreak();
            }
        },60);
    }
    init();

    for(let i = 0; i < checkBtn.length; i++){
        checkBtn[i].addEventListener('click', () => {
            if(checkBtn[0].checked == 1) {
                colorChange = 0;
            }
            else if(checkBtn[1].checked == 1){
                colorChange = 1;
            }
        })
    }

    window.addEventListener('resize', () => {
        px = canvas.width/2;
        initialPoints= [[px,py1]];
    })
})
