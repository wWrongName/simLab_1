let ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 18;
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'y(alpha)',
            data: [],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#2EC2A7',
            borderWidth: 1
        }]
    },
    options: {
    }
});