var paintColor = 'white'
var strokeWidth = 3;
const changeColor = (color) => {
    paintColor = color;
}

const increaseSize = () => {
    strokeWidth++;
    updateStrokeWidth();
}

const decreaseSize = () => {
    strokeWidth--;
    updateStrokeWidth(); 
}

const updateStrokeWidth = () => {
    $('#strokeWidth').html(strokeWidth);
}

$(document).ready(function() {
    // console.log("Hi there!!")

    // initializing hammer js and paper js 
    var mc = new Hammer(document.getElementById('draw'));
    paper.setup(document.getElementById('draw'));

    // handle touch inputs
    mc.on("hammer.input", function(ev) {
        console.log(ev);

        if (ev.isFirst) {
            // start
            if (ev.srcEvent.shiftKey) {
                // erase
                startDraw(ev, strokeWidth * 4, 'destination-out')
            } else {
                // draw
                startDraw(ev)
            }
        } else if (ev.isFinal){
            // last
            finalDraw(ev)

        } else {
            // middle
            middleDraw(ev)
        }
     });

     // handle start draw
     const startDraw = (ev, _strokeWidth=strokeWidth, blendMode='normal') => {
        console.log("start draw", ev.center.x, ev.center.y);
        
        var path = new paper.Path({
            strokeColor: paintColor,
            strokeWidth: _strokeWidth,
            strokeCap: 'round',
            blendMode: blendMode
        });
     }

     // handle middle draw
     const middleDraw = (ev) => {
        console.log("middle draw");

        paper.project._activeLayer.lastChild.add({x: ev.center.x, y: ev.center.y})
    }

     // handle end draw
     const finalDraw = (ev) => {
        console.log("final draw");

        paper.project._activeLayer.lastChild.simplify(2.5)
    }
     
});