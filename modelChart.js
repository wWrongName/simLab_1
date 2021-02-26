let ctx1 = document.getElementById('modelChart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'white';
class ModelChart {
    constructor () {
        this.chart = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Трассировка',
                        data: [],
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: '#2EC2A7',
                        borderWidth: 1
                    },
                    {
                        label: 'Линия цели',
                        data: (() => {
                            let arr = [];
                            for (let i = 0; i <= 1000; i++)
                                arr.push(4);
                            return arr;
                        })(),
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
            }
        });
    };

    deleteGraph () {
        this.chart.data.labels = [];
        this.chart.data.datasets[0].data = [];
        this.chart.update();
    };

    deleteNode () {
        this.chart.data.labels.pop();
        this.chart.data.datasets[0].data.pop();
        this.chart.update();
    };

    addNode (xCoord, yCoord) {
        this.chart.data.labels.push((xCoord + '').substring(0, 4));
        this.chart.data.datasets[0].data.push(yCoord);
        this.chart.update();
    };
};

const chart = new ModelChart();