function SvgPlayButtonPause(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="playButton_pause_svg__a" fill="#fff">
        <rect x={6} y={3} width={3} height={19} rx={0.5} />
      </mask>
      <rect
        x={6}
        y={3}
        width={3}
        height={19}
        rx={0.5}
        fill="#323232"
        stroke="#323232"
        strokeWidth={2}
        mask="url(#playButton_pause_svg__a)"
      />
      <rect x={15} y={3} width={3} height={19} rx={0.5} fill="#323232" />
    </svg>
  );
}

export default SvgPlayButtonPause;
