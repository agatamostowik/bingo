export const Circle = (props: { odd: boolean }) => {
  return (
    <svg height="50" width="50">
      <circle
        cx="25"
        cy="50"
        r="50%"
        fill={props.odd ? "#2D4C57" : "#FF3F27"}
      />
    </svg>
  );
};
