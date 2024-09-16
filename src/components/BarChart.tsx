/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from "react";
import * as d3 from 'd3';

// Define the prop types
interface BarChartProps {
  data: number[]; // assuming the data is an array of numbers
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null); // specify the type of ref

  useEffect(() => {
    // Set up the dimensions and margins
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Select the SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f9f9f9")
      .style("overflow", "visible");

    // Create the x scale (band scale)
    const x = d3.scaleBand<number>()
      .domain(data.map((_, i) => i))  // x-values as the index of data
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Create the y scale (linear scale)
    const y = d3.scaleLinear()
      .domain([0, d3.max(data) as number])  // y-values are the data values
      .range([height - margin.bottom, margin.top]);

    // Create the axes
    const xAxis = d3.axisBottom(x).tickFormat((i: number) => (i + 1).toString());
    const yAxis = d3.axisLeft(y).ticks(5);

    // Append the x-axis
    svg.select<SVGGElement>(".x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    // Append the y-axis
    svg.select<SVGGElement>(".y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    // Bind the data to rectangles and update the chart
    svg.selectAll<SVGRectElement, number>(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => x(i) as number)  // casting since D3 may return null
      .attr("y", d => y(d))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d))
      .attr("fill", "steelblue");

  }, [data]);

  return (
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
};

export default BarChart;
