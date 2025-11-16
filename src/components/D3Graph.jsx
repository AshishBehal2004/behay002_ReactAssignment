import React,{ useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
function D3Graph({strudelData }) {

    const svgRef = useRef(null);

    
    useEffect(() => {

        if (!strudelData || strudelData.length === 0) {
            return;
        }
        //converting the strudel log entries(received as text strings) into numbers (using .length to get length of eah string)
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

        svg
            .selectAll("rect")
            .data(numericDats)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => yScale(d))
            .attr("width", barWidth - 2)
            .attr("height", d => svgHeight - yScale(d))
            .attr("fill", "skyblue");
    }, [strudelData])


    return (
        <>
            <div>
                <h2>D3 Graph</h2>
                <svg
                    ref={svgRef}
                    width={400}
                    height={150}
                    style={{ border: "1px solid red" }}
                ></svg>
            </div>
        </>
    );
}
export default D3Graph;