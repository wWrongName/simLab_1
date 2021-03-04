const gravity = 9.8;

class Ball {
    constructor () {
        this.x = 0;
        this.y = 0;
    };

    clearCoords () {
            this.x = 0;
            this.y = 0;
    }

    countPosition (velocity, alpha, time, yOffset) {
            this.y = yOffset + velocity * time * Math.sin(alpha) - gravity * time**2 / 2;
            if (this.y < 0) 
                this.y = 0;
    };
};

class Experiment {
    constructor (props) {
        this.warn = {
            exist : false,
            text : ""
        };

        this.time = props.time;
        this.alpha = props.alpha;
        this.velocity = props.velocity;
        this.S = props.S;
        this.H = props.H;
        this.yOffset = 2;
        this.ball = new Ball();
    };
    
    getDegree (rad) {
        return rad * 180 / Math.PI;
    };

    getRadians (deg) {
        return deg * Math.PI / 180;
    }

    resolveQuadEquation (a, b, c) { // at^2+bt+c
        let D = b**2 - 4 * a * c;
        let t0 = (-b + Math.sqrt(D)) / (2 * a);
        let t1 = (-b - Math.sqrt(D)) / (2 * a);
        return (t0 <= 0) ? t1 : t0 ;
    };

    isValidAngle () {
        return (this.alpha >= this.getDegree(Math.atan((this.H - this.yOffset) / this.S)) && this.alpha <= 90) ? true : false;
    };

    countTime (xCoord) {
            if (this.velocity == 0) {
                this.time = 0;
            } else {
                this.time = xCoord / (this.velocity * Math.cos(this.getRadians(this.alpha)));
            }
    };

    countActualTime (xCoord) {
        this.countTime(xCoord);
    };

    countByY () {
        chart.addNode(this.ball.x, this.ball.y);
        let topTime = this.velocity / gravity;
        let bottomTime = this.resolveQuadEquation(-gravity / 2, this.velocity, this.yOffset);
        this.time = topTime + bottomTime;
    };

    upd () {
            if (!this.isValidAngle()) {
                this.warn = {
                    exist : true,
                    text : "Неверный угол"
                };
                this.ball.clearCoords();
                chart.deleteGraph();
                return;
            } else {
                this.warn.exist = false;
            }
           
            this.time = 0;
            chart.deleteGraph();
            this.ball.clearCoords();

            if (this.alpha == 90)
                this.countByY();
            else {
                for (this.ball.x = 0; this.ball.x <= this.S && this.velocity != 0; this.ball.x = +(this.ball.x + 0.1).toFixed(1)) {
    
                    this.countActualTime(this.ball.x);
                    
                    this.ball.countPosition(this.velocity, this.getRadians(this.alpha), this.time, this.yOffset);
    
                    if (this.ball.y == 0) {
                        chart.deleteNode();
                        chart.addNode(this.ball.x, this.ball.y);
                        break;
                    }
                    chart.addNode(this.ball.x, this.ball.y);
                }
                if (this.ball.x != 0)
                    this.ball.x -= 0.1;
            }
    };
};

const model = new Experiment({
    time : 0,
    alpha : 0,
    velocity : 0,
    S : 10,
    H : 4
});