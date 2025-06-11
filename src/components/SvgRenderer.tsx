import { useState, useEffect } from 'react';

interface SvgRendererProps {
  src: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  className?: string;
  [key: string]: any;
}

export default function SvgRenderer({
  src,
  fill = 'currentColor',
  stroke,
  className,
  ...rest
}: SvgRendererProps) {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) throw new Error('Failed to fetch SVG');

        let svgText = await response.text();

        if (fill) svgText = svgText.replace(/fill="[^"]*"/g, `fill="${fill}"`);
        if (stroke)
          svgText = svgText.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
        if (className)
          svgText = svgText.replace(/<svg/, `<svg class="${className}"`);

        svgText = svgText.replace(
          /<svg/,
          '<svg shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"'
        );

        setSvgContent(svgText);
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    fetchSvg();
  }, [src, fill, stroke, className]);

  return (
    <div
      {...rest}
      style={{
        ...rest.style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        imageRendering: 'optimizeQuality',
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
