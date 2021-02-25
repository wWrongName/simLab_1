const gravity = 9.8;

class Ball {
    constructor () {
        this.x = 0;
        this.y = 0;
    };

    countPosition (velocity, alpha, time) {
        this.y = velocity * time * Math.sin(alpha) - gravity * time**2 / 2;
        this.x = velocity * time * Math.cos(alpha);
        console.log('time : ' + time);
        console.log('velocity : ' + velocity);
        console.log('cos(alpha) : ' + Math.cos(alpha));
        console.log('x : ' + this.x);
        console.log('y : ' + this.н);
    };

    getPosition () {
        return {
            x : this.x,
            y : this.y
        };
    };
};

class Experiment {
    constructor (props) {
        this.time = props.time;
        this.alpha = props.alpha;
        this.velocity = props.velocity;
        this.S = props.S;
        this.H = props.H;
        this.ball = new Ball();
    };

    isValidAngle () {
        return (this.alpha >= Math.atan(this.H / this.S) && this.alpha <= 90) ? true : false;
    };

    countTime () {
        this.time = this.S / (this.velocity * Math.cos(this.alpha));
    };

    upd () {
        if (!this.isValidAngle())
            return;
        this.ball.countPosition(this.velocity, this.alpha, this.time);
        console.log(this.ball.getPosition());
    };
};

const model = new Experiment({
    time : 0,
    alpha : 0,
    velocity : 12,
    S : 10,
    H : 4
});