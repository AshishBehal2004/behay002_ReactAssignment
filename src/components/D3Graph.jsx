import React,{ useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
function D3Graph({strudelData }) {

    const svgRef = useRef(null);

    
    useEffect(() => {

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

        svg.selectAll("rect")
            .data(numericDats)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => yScale(d))
            .attr("width", barWidth - 2)
            .attr("height", d => svgHeight - yScale(d))
            .attr("fill", d => d3.interpolateRainbow(d / maxValue))
            .attr("stroke", "222")
            .attr("fill-opacity", 0.85)
            .attr("stroke", "white")
            .attr("stroke-opacity",0.50)
            .attr("stroke-width", 0.9)
            .attr("rx",2)
            .transition().ease(d3.easeCubicInOut);
    }, [strudelData])


    return (
        <>
            <div>
                <h2 className="text-center" id="graphHeader"><b><i>D3 Graph</i></b></h2>
                <div className="d-flex justify-content-center mb-5">
                <div  style={{ width: "100%", maxWidth: "1000px", background: "#0F0F0F", borderRadius: "30px", boxShadow: " 4px 10px rgba(0,0,0,0.6)" }}>
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