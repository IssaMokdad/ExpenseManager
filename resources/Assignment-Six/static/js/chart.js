class Statistic{
    static initializeChart(){
        let formData = new FormData();
        formData.append('section', 'categorygroup');
        fetch('api/index.php', {
          method: 'POST',
          body: formData
        }).then(function (response) {
            response.text().then(function (responseText) {
                responseText = JSON.parse(responseText)
                let categoryNames =[]
                let data = []
                for(let i=0; i<responseText.length; i++){
                    categoryNames.push(responseText[i].category)
                    data.push(responseText[i].amount)
                }
                if(categoryNames.length===0){
                    categoryNames.push('You have no expenses with categories yet')
                    data.push(1)
                }
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: categoryNames,
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
            });
        });
      }
}



