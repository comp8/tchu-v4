import React from "react";

interface Props {
  className?: string;
  speed?: number;
  hmRatio?: number;
  color?: string;
  one?: boolean;
  reverse?: boolean;
}

export default function SpinnerClock(props: Props) {

  const { className, one, reverse } = props;

  const speed = props.speed || 1.0;
  const hmRatio = props.hmRatio || 12;
  const duration = 2 / speed;
  const color = props.color || '#fff';

  if (typeof speed === 'number') {
    speed
  }

  return (
    <svg className={className} version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 100 100" enableBackground="new 0 0 100 100">
      <circle fill="none" stroke={color} strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="48" />
      <line fill="none" strokeLinecap="round" stroke={color} strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
        <animateTransform
          attributeName="transform"
          dur={duration + "s"}
          type="rotate"
          from={reverse ? "360 50 50" : "0 50 50"}
          to={reverse ? "0 50 50" : "360 50 50"}
          repeatCount="indefinite" />
      </line>
      {
        one ? null :
          (
            <line fill="none" strokeLinecap="round" stroke={color} strokeWidth="4" strokeMiterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
              <animateTransform
                attributeName="transform"
                dur={(hmRatio * duration) + "s"}
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                repeatCount="indefinite" />
            </line>
          )
      }
    </svg>
  );
}