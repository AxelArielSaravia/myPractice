'use strict'

let width = 900;
let height = 400;
let padding = 40; 


function getTitleName (title) {
    const $Title = document.getElementById('title');
    $Title.textContent = title
}



function visualizationData (data) {

    /* GDP = Gross Domestic PRoducts */
    const rData = data.map(e => {
        let GDP = e[1]
        let date = new Date(e[0])
        return [date, GDP] 
    });

    /* X AXIS */
    const xMax = d3.max(rData, d => d[0]);
    const xMin = d3.min(rData, d => d[0]);
    const xScale = d3.scaleTime()
                     .domain([xMin, xMax])
                     .range([padding, width-padding]);
    const xAxis = d3.axisBottom().scale(xScale);

    /* Y AXIS */
    const yMax = d3.max(rData, d => d[1]);
    const yScale = d3.scaleLinear()
                     .domain([0, yMax])
                     .range([height - padding, padding]);
    const yAxis = d3.axisLeft(yScale);
    

    /* yTitle and xTitle format: title, x, y, font-size */
    const yTitle = ['Gross Domestic Product', -250, 13, 13]

    const tooltip = d3.select('.visualizate')
                      .append('div')
                      .attr('id', 'tooltip')
                      .style('opacity', 0)



    const svg = d3.select('.visualizate')
                  .append('svg')
                  .attr("width", width)
                  .attr("height", height)
                  .attr('class', 'svg');

    
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', yTitle[1])
      .attr('y', yTitle[2])
      .style('font-size',yTitle[3])
      .text(yTitle[0]);

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('class', 'tick')
        .attr("transform", "translate("+ (yTitle[2] + 6) +"," + (height - padding) + ")")
        .call(xAxis);

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('class', 'tick')
        .attr("transform", "translate(" + (padding + yTitle[2] + 5) + ", 0)")
        .call(yAxis);

    let barWidth = 3
    svg.selectAll('rect')
        .data(rData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-date', d => d[0].toLocaleDateString('en-GB', {timeZone: 'UTC'}))
        .attr('data-gdp', d => d[1])
        .attr('x', d => yTitle[2]+ 6 + xScale(d[0]))
        .attr('y', d => yScale(d[1]))
        .attr("width", barWidth)
        .attr("height",(d) => (height - padding - yScale(d[1])))
        .style('fill', '#567539')


        document.addEventListener('mouseover', function(e){
            if( e.target.matches('.bar') ){
                const $bar = e.target;
                $bar.style.setProperty('fill', '#333');
               
                tooltip.transition().duration(170).style('opacity', 0.9);
                tooltip.html(
                            $bar.getAttribute('data-date') + '<br>' + Math.trunc($bar.getAttribute('data-gdp')) + ' Billions'
                        )
                tooltip.attr('data-date', $bar.getAttribute('data-date'))
                        .style('position', 'absolute')
                        .style('left', parseInt($bar.getAttribute('x'))+ 150 + 'px')
                        .style('top', parseInt($bar.getAttribute('y')) - 30 + 'px')
                        .style('transform', 'translateX(60px)');

            }
        })
        document.addEventListener('mouseout', function(e){
            if( e.target.matches('.bar')){
                const $bar = e.target;
                $bar.style.setProperty('fill', '#567539');
                tooltip.transition().duration(170).style('opacity', 0);
            }
        })

}



document.addEventListener('DOMContentLoaded', function(e){
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
        .then( res => res.json() )
        .then( data => {
            getTitleName(data.source_name);

            visualizationData(data.data);
        })
        .catch( err => {
            let message = err.statusText || 'Error';
            return document.querySelector('.container').innerHTML = `ERROR ${err.status}: ${message}`;
        });
});

