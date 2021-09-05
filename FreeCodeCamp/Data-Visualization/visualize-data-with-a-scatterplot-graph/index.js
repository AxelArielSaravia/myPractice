
function visualizeDataWithAScatterplot (data) {
    const margin = {
        top: 30,
        right: 20,
        bottom: 50,
        left: 40
    };
    const width = 900;
    const height = 400;
    
    const svg = d3.select('.svg')
        .attr('viewBox', `0 0 ${width} ${height}`);

    /* X SCALE */
    const xScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.Year) - 1 ,
            d3.max(data, d => d.Year) + 1
        ])
        .range([margin.left, width - margin.right]);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));

    /* Y SCALE */
    const yScale = d3.scaleTime()
        .domain([
            d3.min(data, d => new Date(d.Seconds) * 1000 ),
            d3.max(data, d => new Date(d.Seconds) * 1000)
        ])
        .range([margin.top, height - margin.bottom]);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
    
    const legend = svg.append('g')
            .attr('id', 'legend')
            .attr('class', 'legend');

    const tooltip = d3.select('.container')
            .append('div')
            .attr('id', 'tooltip')
            .style('display', 'none')
            .style('position', 'absolute');

    svg.append('text')
        .attr('transform', `rotate(-90)`)
        .attr('x', -200)
        .attr('y', 60)
        .style('font-size', `13px`)
        .text('Time in minutes')

    svg.append('g')
            .attr('id','x-axis')
            .attr('transform', `translate(0, ${height - margin.left})`)
            .call(xAxis);
    
    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis);

    svg.selectAll('circle')
        .data(data).enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.Year))
        .attr('cy', d => yScale( new Date(d.Seconds) * 1000))
        .attr('r', 5)
        .attr('data-xvalue', d => d.Year)
        .attr('data-yvalue', d => d.Time)
        .attr('data-name', d => d.Name)
        .attr('data-nationality', d => d.Nationality)
        .attr('data-doping', d => d.Doping)
        .attr('fill', d => {
            return (d.Doping === "")? "#888" : '#a34c4c';
        });
    
        
    legend.append('rect')
        .attr('y', margin.top - 19)
        .attr('x', width - margin.left - 70)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#888');

    legend.append('text')
        .attr('y', margin.top - 10)
        .attr('x', width - margin.left - 50)
        .style('font-size', `13px`)
        .text('No doping')
   
    legend.append('rect')
        .attr('y', margin.top + 1)
        .attr('x', width - margin.left - 70)
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', '#a34c4c');
    
    legend.append('text')
        .attr('y', margin.top + 10)
        .attr('x', width - margin.left - 50)
        .style('font-size', `13px`)
        .text('Doping riders');


    document.addEventListener('mouseover', (e) => {
        if(e.target.matches('.dot')){
            const $dot = e.target;
            tooltip.style('display', 'block')
            tooltip.html(
                $dot.getAttribute('data-name') + ' ' + $dot.getAttribute('data-nationality') +
                '<br/>' +
                'Year: ' + $dot.getAttribute('data-xvalue') + ', Time: ' + $dot.getAttribute('data-yvalue') +
                ($dot.getAttribute('data-doping') !== '' ? '<br/><br/>' + $dot.getAttribute('data-doping') : '')
            )
            .attr('data-year', $dot.getAttribute('data-xvalue'))
            .style('left', `${e.pageX + 30}px`)
            .style('top', `${e.pageY - 10}px`)
        }
    });
    document.addEventListener('mouseout', e => {
        if(e.target.matches('.dot')){
            tooltip.style('display', 'none')
        }
    })

}

document.addEventListener('DOMContentLoaded', function(e){
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then( res => res.json() )
    .then( data => visualizeDataWithAScatterplot(data) )
    .catch( err => console.log(err))
});