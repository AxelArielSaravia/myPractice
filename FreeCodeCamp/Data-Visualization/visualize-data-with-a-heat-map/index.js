
function visualizeDataWithAHeatMap(data) {
    const monthlyVariance = data.monthlyVariance;
    const temperature = (d) => (d.variance + data.baseTemperature).toFixed(1)

    let width = 900;
    let height = 400;
    let padding = {
        top: 80,
        right: 60,
        down: 40,
        left: 80
    }

    const colors = [
        '#00dfff',
        '#00ffef',
        '#00ffaf',
        '#bfff00',
        '#fff000',
        '#ffc000',
        '#ff8000',
        '#ff4000',
        '#ff0000'
    ]
    const limits = [
        2.8,
        3.9,
        5.0 ,
        6.1,
        7.2,
        8.3,
        9.5,
        10.6,
        11.7,
        12.8
    ]

    const svg = d3.select('.svg')
        .attr('viewBox', `0 0 ${width} ${height}` );

    const maxYear = d3.max(monthlyVariance, d => d.year);
    const minYear = d3.min(monthlyVariance, d => d.year);
    /* X SCALE */
    const xScale = d3.scaleTime()
        .domain([minYear - 1, maxYear])
        .range([padding.left, width - padding.right]);
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format('d')) 

    /* Y SCALE */
    const yScale = d3.scaleTime()
        .domain([ 
            new Date(0, 0, 0, 0, 0),
            new Date(0, 12, 0, 0, 0)
        ])
        .range([padding.top, height - padding.down]);
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d3.timeFormat('%B'));

    /* TOOLTIP */
    const tooltip = d3.select('.container')
        .append('div')
        .attr('id', 'tooltip')
        .attr('class', 'tooltip')
        .style('display', 'none')
        .style('position', 'absolute');

    /* LEGEND */
    const legend = svg.append('g')
        .attr('id', 'legend')
        .attr('class', 'legend');
    const rectLegSize = 19;
    const ticksName = limits.map(d => d.toString())

    const xScaleLegend = d3.scaleBand()
        .domain(ticksName)
        .range([width - padding.right - rectLegSize * 11, width - padding.right + rectLegSize])
        .round(true);
    const xAxisLegend = d3.axisBottom(xScaleLegend)
        .tickSizeOuter(0)
        .tickSizeInner(-rectLegSize);
        


    /* Title */
    svg.append('text')
        .attr('class', 'title')
        .attr('id', 'title')
        .attr('x', padding.left)
        .attr('y', 40)
        .style('font-size', '20px')
        .text('Monthly Global Land-Surface Temperature');

    /* subtitle */
    svg.append('text')
        .attr('class', 'subtitle')
        .attr('x', padding.left)
        .attr('y', 60)
        .style('font-size', '12px')
        .text(`${minYear} - ${maxYear}: base temperature ${data.baseTemperature}℃`);

    /* legend rects*/
    legend.selectAll('rect')
        .data(colors).enter()
        .append('rect')
        .attr('class', 'legend-rect')
        .attr('x', (d, i) => xScaleLegend(ticksName[i]) + 11)
        .attr('y', rectLegSize)
        .attr('width', d => xScaleLegend.bandwidth())
        .attr('height', rectLegSize)
        .attr('fill', d => d);
    /* legend axis*/  
    legend.append('g')
        .attr('class', 'legendAxis')
        .attr('transform', `translate(0, ${rectLegSize * 2})`)
        .call(xAxisLegend);

    /* in svg X SCALE */
    svg.append('g')
        .attr('id','x-axis')
        .attr('transform', `translate(0, ${height - padding.down})`)
        .call(xAxis);

    /* in svg Y SCALE */
    svg.append('g')
        .attr('id','y-axis')
        .attr('transform', `translate(${padding.left}, 0)`)
        .call(yAxis);

    /* rect */
    svg.selectAll('rect')
        .data(monthlyVariance).enter()
        .append('rect')
        .attr('height', 27)
        .attr('width', width / (maxYear - minYear))
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(new Date(0, d.month - 1)) - 15)
        .attr('data-month', d => d.month)
        .attr('data-year', d => d.year)
        .attr('data-temp', d => temperature(d))
        .attr('variance', d => d.variance)
        .attr('class', d => {
            const t = temperature(d);
            if( t < limits[1]) return `cell cell-${colors[0]}`;
            if( t < limits[2] ) return `cell cell-${colors[1]}`;
            if( t < limits[3] ) return `cell cell-${colors[2]}`;
            if( t < limits[4] ) return `cell cell-${colors[3]}`;
            if( t < limits[5] ) return `cell cell-${colors[4]}`;
            if( t < limits[6] ) return `cell cell-${colors[5]}`;
            if( t < limits[7] ) return `cell cell-${colors[6]}`;
            if( t < limits[8] ) return `cell cell-${colors[7]}`;
            if( t >= limits[8] ) return `cell cell-${colors[8]}`;
        })
        .attr('fill', d => {
            const t = temperature(d);
            if( t < limits[1]) return colors[0];
            if( t < limits[2] ) return colors[1];
            if( t < limits[3] ) return colors[2];
            if( t < limits[4] ) return colors[3];
            if( t < limits[5] ) return colors[4];
            if( t < limits[6] ) return colors[5];
            if( t < limits[7] ) return colors[6];
            if( t < limits[8] ) return colors[7];
            if( t >= limits[8] ) return colors[8];
        });
    
    document.addEventListener('mouseover', function(e){
        if( e.target.matches('.cell') ){
            const $cell = e.target;
            tooltip.style('display', 'block')
            tooltip.html(
                `${$cell.getAttribute('data-year')} - ${$cell.getAttribute('data-month')} <br/>` + 
                `${$cell.getAttribute('variance')}℃ <br/>` +
                `${$cell.getAttribute('data-temp')}℃`
            )
            .attr('data-year', $cell.getAttribute('data-year'))
            .style('left', `${e.pageX + 10}px`)
            .style('top', `${e.pageY - 30}px`)
        }
    });
    document.addEventListener('mouseout', function(e){
        if( e.target.matches('.cell') ){
            tooltip.style('display', 'none')
        }
    });
}

document.addEventListener('DOMContentLoaded', e => {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
    .then( res => res.json() )
    .then( data =>  visualizeDataWithAHeatMap(data) )
})