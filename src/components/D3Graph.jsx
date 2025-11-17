import React,{ useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
function D3Graph({strudelData }) {

    const svgRef = useRef(null);

    
    useEffect(() => {
        //returns when there is no data in it or its length is 0(meainng empty array)
        if (!strudelData || strudelData.length === 0) {
            return;
        }
        //converting the strudel log entries(received as strings) into numbers 
        //(using.length to get length of each string) and using those to display live graph
        const numericDats = strudelData.map(entry => entry.length)
        const svg = d3.select(svgRef.current)
        const barWidth = 20; 
        const svgHeight = 150;
        const maxValue = d3.max(numericDats);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            //makes the bar grow upward
            .range([svgHeight,0])
        //clearing everything before drawing for safe display
        svg.selectAll("*").remove();

        //making bar graph
        svg.selectAll("rect")
            //passing on the data received through getting the highest value, creating rectangle for every data point
            .data(numericDats)
            .enter()
            .append("rect")
            //setting up the x position of each bar based on its index
            // i * barWidth evenly spaces the bars across the SVG
            .attr("x", (d, i) => i * barWidth)
            //y position using yScale and then flipping the value which makes the bar grow upward instead of top to bottom
            .attr("y", d => yScale(d))
            //setting how wide each bar is(leaving small gap for making them look little spaced with each other)
            .attr("width", barWidth - 2)
            ///bar height is based on data, higher value will result in taller bar.
            .attr("height", d => svgHeight - yScale(d))
            //styling of the graph,coloring the bar using rainbow gradient relative to max value as d/maxValue gives either 0 or 1 
            .attr("fill", d => d3.interpolateRainbow(d / maxValue))
            //adding stroke for separating tehm
            .attr("stroke", "222")
            //adds a little bit of transparency
            .attr("fill-opacity", 0.85)
            .attr("stroke", "white")
            //affected on bar borders 
            .attr("stroke-opacity", 0.50)
            //thicknes of the stroke adding the outlines
            .attr("stroke-width", 0.9)
            //for making the bar edges rounded
            .attr("rx", 2)
            //trying for smooth animation, but it doesnt do much, still display in a bit static, leaving it as is.
            .transition().ease(d3.easeCubicInOut);
    //all the above function runs when dtrudelData updates
    }, [strudelData])


    return (
        <>
            <div>
            {/*Displaying the heading*/}
                <h2 className="text-center" id="graphHeader"><b><i>D3 Graph</i></b></h2>
                <div className="d-flex justify-content-center mb-5">
                {/*Adding styling to the svge element in which the graph is drawn*/}
                    <div style={{ width: "100%", maxWidth: "1000px", background: "#0F0F0F", borderRadius: "30px", boxShadow: " 4px 10px rgba(0,0,0,0.6)" }}>
                {/*svg element in ehich the graph is drawn, reference is passed so it draws inside here, giving fixed height, a bit of styling*/}
                <svg className="graph-container"
                    ref={svgRef}
                        height={150}
                        style={{ width:"100%", border: "1px solid ", borderRadius: "30px" }}>
                </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
export default D3Graph;