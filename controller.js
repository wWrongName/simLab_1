class Controller {
    handleInput (elId) {
        let element = document.getElementById(elId);
        let newVal = element.value;
        if (newVal === '') {
            model[elId] = 0;
            return;
        } else {
            if ((new RegExp('^[0-9]+\\.?[0-9]*$')).test(newVal) && !(new RegExp('^0(0)+')).test(newVal)) {
                model[elId] = newVal;
            }
        }
        model.upd();
        controller.updView();
    };

    updView () {
        let ids = ['time', 'velocity', 'alpha'];
        for (let id of ids)
            document.getElementById(id).value = model[id];
        this.updBallCoords();
        if (model.warn.exist) {
            document.getElementById('warning').style.visibility = 'visible';
            document.getElementById('warning').innerHTML = model.warn.text;
        } else {
            document.getElementById('warning').style.visibility = 'hidden';
        }
    };

    updBallCoords () {
        document.getElementById('x').innerHTML = `x = ${(model.ball.x + '').substring(0, 4)}, м`;
        document.getElementById('y').innerHTML = `y = ${(model.ball.y + '').substring(0, 4)}, м`;
    };

    addNode () { // and add node
        myChart.data.labels.push(model.alpha); // alpha
        myChart.data.datasets[0].data.push(model.ball.y); // y(alpha)
        myChart.update();
    };

    deleteNode () {
        myChart.data.labels.pop();
        myChart.data.datasets[0].data.pop();
        myChart.update();
    }

    setTableHeader () {
        this.putInsideTable('alpha', 'y');
    };

    deleteTable () {
        document.getElementById('scroll-table').innerText = '';
    };

    putInsideTable (alpha, y_alpha) {
        alpha = (alpha + '').substring(0,5);
        y_alpha = (y_alpha + '').substring(0,4);
        let table = document.getElementById('scroll-table');
        table.innerHTML += `<option>${alpha}------------------${y_alpha}</option>`;
    };

    autoSearch () {
        let addition = 90.0;
        let target = 4;
        model.velocity = 12;
        model.alpha = 0;
        model.ball.clearCoords();
        this.deleteTable();
        this.setTableHeader();
        while ((model.ball.y + '').substring(0, 4) != target) {
            addition /= 2;
            if (model.ball.y > target)
                model.alpha -= addition;
            else
                model.alpha += addition;
            model.upd();
            this.putInsideTable(model.alpha, model.ball.y);
            myChart.data.labels.push(model.alpha);
            myChart.data.datasets[0].data.push(model.ball.y);
            if (addition == 0) // if something will go wrong 
                breack;
        }
        model.alpha = model.alpha.toFixed(2);
        myChart.update();
        this.updView();
    };
};

const controller = new Controller();
controller.updView();