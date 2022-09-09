// @ts-check

/**
 * @param {{angle: number, size: number, radius: number}} props
 */
export default function ArcIcon(props) {
  return _describeArc(props.size / 2, props.size / 2, 9.09, 0, props.angle);
}

/**
 * @param {!number} centerX centro de la circunferencia en X
 * @param {!number} centerY centro de la circunferencia en Y
 * @param {!number} radius radio de la circunferencia
 * @param {!number} angleInDegrees angulo en grados
 * @returns {{x: number, y: number}} coordenates
 */
const _polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  /** @type {(number)} */
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

/**
 * @param {!number} x - posición en X respecto el centro
 * @param {!number} y - posicion en Y respecto el centro
 * @param {!number} radius - radio de la circunferencia
 * @param {!number} startAngle - Angulo inicial del arco
 * @param {!number} endAngle - Angulo final del arco
 * @returns {JSX.Element} arc - <path> del svg que representa el arco
 */
const _describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = _polarToCartesian(x, y, radius, endAngle);
  const end = _polarToCartesian(x, y, radius, startAngle);

  /** @type {string} */
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  /** @type {string} */
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;

  return (
    <path id="arc1" fill="none" stroke="#0078D4" strokeWidth="1.82" d={d} />
  );
};
