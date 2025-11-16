import React,{ useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
function D3Graph({strudelData }) {

    const svgRef = useRef(null);
    const data = [10, 25, 40, 15, 30];
    useEffect(() => {
        const svg = d3.select(svgRef.current)
        const barWidth = 20;
        const svgHeight = 150;
        const maxValue = d3.max(data);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            //makes the bar grow upward
            .range([svgHeight,0])
        //clearing everything before drawing for safe display
        svg.selectAll("*").remove();

        svg
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * barWidth)
            .attr("y", d => yScale(d))
            .attr("width", barWidth - 2)
            .attr("height", d => svgHeight - yScale(d))
            .append("fill", "skyblue");
    },[])


    return (
        <>
            <div>
                <h2>D3 Graph</h2>
                <svg
                    ref={svgRef}
                    width={400}
                    height={150}
                    style={{ border: "1 px solid red" }}
                ></svg>
            </div>
        </>
    );
}
export default D3Graph;