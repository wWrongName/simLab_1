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
            } else {
                element.value = model[elId];
            }
        }
        model.upd(elId);
    }
    prepareView () {
        let ids = ['time', 'velocity', 'alpha'];
        for (let id of ids)
            document.getElementById(id).innerHTML = model[id];
    };
};

const controller = new Controller();