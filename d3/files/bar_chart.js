

// var svg = d3.select("#chart-container")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
function test()
{

    var svg = d3.select("#res")
    .append("svg")
        .attr("width", 1000)

    // Create the scale
    var x = d3.scaleLinear()
        .domain([0, 100])         // This is what is written on the Axis: from 0 to 100
        .range([100, 800]);       // This is where the axis is placed: from 100px to 800px

    // Draw the axis
    svg
    .append("g")
    .attr("transform", "translate(0,50)")      // This controls the vertical position of the Axis
    .call(d3.axisBottom(x))
    .attr('fill', 'cyan')
    .text('TEST 2222');
}

// Function to create bar chart
function createBarChart(svg, data, title) {
    const margin = { top: 20, right: 20, bottom: 200, left: 20 };
    // const width = +svg.attr('width') - margin.left - margin.right;
    // const height = +svg.attr('height') - margin.top - margin.bottom;
    width = 600 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    console.log("Width: " + width);
    console.log("height: " + height);

    // Adjust SVG size to include margins
    svg.attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom);

    svg.append('b').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height + margin.top, 0]);
    const categories = Object.keys(data);
    const formTypes = Object.values(data);

    // console.log("=========\n" + JSON.stringify(svg, null, 2));

    x.domain(categories);
    y.domain([0, d3.max(formTypes)]);

    // Add x-axis
    svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(${50 + 30},${height + margin.top + 30})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('class', 'axis-label')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '0.15em')
        .style('fill', 'white')
        .attr('transform', 'rotate(-65)')
        .enter()  // Ensure entering text elements if they don't exist
        .append('text')
        .text(d => d)
        .attr('transform', `translate(${x.bandwidth() / 2}, 6)`)
        .style('text-anchor', 'middle')
        .style('font-size', '100px');

    
    console.log("----------------")
    console.log(y)

    // Add y-axis
    svg.append('g')
        .attr('transform', `translate(${50 + 30},30)`)
        .call(d3.axisLeft(y).ticks(10).tickFormat(d3.format("d")))
        .append('text')
        // .text(d => d)
        // .attr('y', -margin.left + 15)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .style('font-size', '30px')
        
        .attr('fill', 'white')
        .attr('transform', `translate(50, 0)`)
        .text('Form Type')
        .attr('transform', 'rotate(-90)');

     // Tooltip setup
    const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('padding', '5px 10px')
    .style('background', 'rgba(0, 0, 0, 0.7)')
    .style('color', '#fff')
    .style('border-radius', '3px')
    .style('pointer-events', 'none')
    .style('opacity', 0);

    console.log(JSON.stringify(data, null, 2))


    const mainCanvas = svg.append("b")
                    .attr("width", width / 2)
                    .attr("height",  height / 2)
                    .attr("transform", `translate(${margin.left},
                        ${margin.top + 10 })`);

    
    //D3 Tip
    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([0, -3])
        .direction("e")
        .html(function(d) {
            var mainHtml = "<div id='thumbnail'><h3></h3></div>"
            +"<p>Total Received: " + "<span style='color:orange'>" + data[d] +"</span> </p>"
            +"<p>Base Type: " + "<span style='color:orange'>" +d+"</span> </p>";
        

        return mainHtml;
        });

    mainCanvas.call(tip)

    // Add bars with tooltip
    svg.selectAll('.bar')
     .data(categories)
     .enter().append('rect')
     .attr('class', 'bar')
     .attr("transform", `translate(${50 + 30}, 50)`)
     .attr('x', d => x(d))
     .attr('y', d => y(data[d]))
     .attr('width', x.bandwidth())
     .attr('height', d => height - y(data[d]))
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide);
     
    //  .on('mouseover', function(event, d) {
    //     const [xPos, yPos] = d3.mouse(this); // Get mouse position relative to 'this' (current element)

    //     tooltip.transition().duration(200).style('opacity', 0.9);
    //     tooltip.html(`Category: ${categories[d]}<br/>Number: ${formTypes[d]}`)
    //         .style('left', (xPos + 5) + 'px')  // Adjust tooltip position relative to mouse
    //         .style('top', (yPos - 28) + 'px');
    //     })
    //  .on('mouseout', function() {
    //      tooltip.transition().duration(200).style('opacity', 0);
    //  });


    // chart title
    // svg.append('text')
    //     .attr('class', 'chart-title')
    //     .attr('x', width / 2 + margin.left)
    //     .attr('y', margin.top / 2)
    //     .attr('text-anchor', 'middle')
    //     .style('font-size', '24px')
    //     //.text("Immigrant Form Data for Year: " + title);
    
}

// Function to update chart display based on the current state
function updateChartDisplay(state) {
    
    document.getElementById('chartTitle').textContent = `Most Common Form Types by Category ${state}`;
        
}

//  // Function to update chart display based on the current state
//  function updateChartDisplay(state) {
    
//     // if (state === "2018") {
//     //     d3.select("chart2018").classed("hidden", false);
//     //     d3.select("chart2021").classed("hidden", true);
//     // } else if (state === "2021") {
//     //     d3.select("chart2018").classed("hidden", true);
//     //     d3.select("chart2021").classed("hidden", false);
//     // }
//     // alert("New state: " + state);
// }