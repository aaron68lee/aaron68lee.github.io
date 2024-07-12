<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Immigration Data Visualization</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .chart-container {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;
        }
        .chart {
            width: 45%;
        }
        .bar {
            fill: steelblue;
        }
        .axis-label {
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>Greatest Received Form Type per Category</h1>
    <div class="chart-container">
        <div id="chart2018" class="chart"></div>
        <div id="chart2021" class="chart"></div>
    </div>
    <script>
        // Load the CSV data and create the charts
        d3.csv("data_2018.csv").then(data2018 => {
            const processedData2018 = processData(data2018);
            createBarChart("#chart2018", processedData2018, "2018");
        });

        d3.csv("data_2021.csv").then(data2021 => {
            const processedData2021 = processData(data2021);
            createBarChart("#chart2021", processedData2021, "2021");
        });

        // Process data to find the maximum received form type for each category
        function processData(data) {
            const categoryData = {};
            data.forEach(row => {
                const category = row.Category;
                const formType = parseInt(row['Received Form Type']);
                if (!categoryData[category] || formType > categoryData[category]) {
                    categoryData[category] = formType;
                }
            });
            return categoryData;
        }

        // Create a bar chart using D3.js
        function createBarChart(container, data, title) {
            const categories = Object.keys(data);
            const formTypes = Object.values(data);

            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 500 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const svg = d3.select(container)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleBand()
                .domain(categories)
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(formTypes)])
                .nice()
                .range([height, 0]);

            svg.append("g")
                .selectAll(".bar")
                .data(categories)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d))
                .attr("y", d => y(data[d]))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(data[d]));

            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-40)")
                .style("text-anchor",

