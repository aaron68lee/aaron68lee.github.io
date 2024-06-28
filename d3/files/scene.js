// Function to switch between scenes
function switchScene(scene) {
    // Update active tab appearance
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.querySelector(`button[onclick="switchScene('${scene}')"]`).classList.add("active");

    // Load data based on the scene parameter
    let dataFile;
    if (scene === '2018') {
        dataFile = 'https://aaron68lee.github.io/d3/files/data/uscis-forms-new.csv';
    } else if (scene === '2019') {
        dataFile = 'https://aaron68lee.github.io/d3/files/data/uscis2021.csv';
    }

    // Clear existing visualization
    d3.select("svg").selectAll("*").remove();

    // Call initializeVisualization with the new data file
    getCSVData(dataFile);
}

// // Function to initialize the visualization
// function initializeVisualization(dataFile) {
//     d3.csv(dataFile, function(data) {
//         // Your existing D3 visualization code here
//         // Example:
//         const svg = d3.select("#visualization");

//         // Append elements, create nodes, force simulation, etc.
//         // Example:
//         svg.selectAll("circle")
//             .data(data)
//             .enter().append("circle")
//             .attr("cx", d => Math.random() * 800)
//             .attr("cy", d => Math.random() * 500)
//             .attr("r", d => Math.sqrt(d.received) / 10)
//             .attr("fill", "steelblue")
//             .attr("opacity", 0.7);

//         // Example: Legend or other visual elements
//         // Add legend
//         const legend = d3.legendColor()
//             .scale(colorScale);
        
//         svg.append("g")
//             .attr("transform", "translate(800, 20)")
//             .call(legend);
//     });
// }