import { GameService } from '../../../../services/gameService';
import { BoostService } from '../../../../services/boostService';
import { useStateContext } from '../../../../contexts';

function normalizeRadius(radius: number, thickness: number) {
  return radius - thickness / 2;
}

export default function PlayerBoostMeter() {
  const { state } = useStateContext();

  const spectatedPlayer = GameService.getPlayerFromTarget(
    state.players,
    state.game.target
  );

  const RADIUS = 130;

  const BOOST_THICKNESS = 32;

  const BOOST_MARGIN = 8;

  const boostNormalizedRadius = normalizeRadius(RADIUS, BOOST_THICKNESS);

  const backgroundStrokeWidth = BOOST_MARGIN / 2;

  const backgroundNormalizedRadius = normalizeRadius(
    RADIUS,
    backgroundStrokeWidth
  );

  const circumference = 2 * Math.PI * boostNormalizedRadius;

  return (
    <>
      {spectatedPlayer && (
        <svg
          width={RADIUS * 2}
          height={RADIUS * 2}
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '52px',
          }}
        >
          {/* BACKGROUND */}
          <circle
            fill="rgba(28, 28, 28, 0.95)"
            r={backgroundNormalizedRadius}
            cx={RADIUS}
            cy={RADIUS}
            stroke={
              spectatedPlayer.team === 0
                ? 'rgba(34, 178, 255, 0.25)'
                : 'rgba(255, 138, 21, 0.25)'
            }
            strokeWidth={backgroundStrokeWidth}
          />

          {/* DETAILS */}
          <circle
            mask="url(#boostplaceholder-mask)"
            stroke={'#161616'}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={BoostService.getBoostBarCircumference(
              62.5,
              circumference
            )}
            strokeWidth={BOOST_THICKNESS - BOOST_MARGIN}
            fill="transparent"
            r={boostNormalizedRadius - BOOST_MARGIN / 2}
            cx={RADIUS}
            cy={RADIUS}
            transform={`rotate(90 ${RADIUS} ${RADIUS})`}
          />
          <mask id="boostplaceholder-mask">
            <circle
              stroke="white"
              strokeDashoffset={BoostService.getBoostBarCircumference(
                62.5,
                circumference
              )}
              strokeWidth={BOOST_THICKNESS - BOOST_MARGIN}
              fill="transparent"
              r={boostNormalizedRadius - BOOST_MARGIN / 2}
              cx={RADIUS}
              cy={RADIUS}
              transform={`rotate(90 ${RADIUS} ${RADIUS})`}
            />
            <circle
              stroke="black"
              strokeDasharray={`${circumference * 0.375} ${
                circumference * 0.359
              }`}
              strokeWidth={BOOST_THICKNESS - BOOST_MARGIN - 20}
              fill="transparent"
              r={boostNormalizedRadius - BOOST_MARGIN / 2}
              cx={RADIUS}
              cy={RADIUS}
              transform={`rotate(90 ${RADIUS} ${RADIUS})`}
            />
          </mask>

          {/* BOOST */}
          <circle
            stroke={spectatedPlayer.team === 0 ? '#22b0ff' : '#ff8a15'}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={BoostService.getBoostBarCircumference(
              spectatedPlayer.boost * 0.625,
              circumference
            )}
            style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            strokeWidth={BOOST_THICKNESS - BOOST_MARGIN}
            fill="transparent"
            r={boostNormalizedRadius - BOOST_MARGIN / 2}
            cx={RADIUS}
            cy={RADIUS}
            transform={`rotate(90 ${RADIUS} ${RADIUS})`}
          />

          {/* TEXT BACKGROUND */}
          <circle
            fill={'#161616'}
            r={boostNormalizedRadius - BOOST_THICKNESS / 2 - BOOST_MARGIN / 2}
            cx={RADIUS}
            cy={RADIUS}
          />

          {/* TEXT */}
          <text
            fill="#ffffff"
            x={RADIUS}
            y={RADIUS + 6}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Chivo Mono"
            fontStyle="italic"
            fontSize={54}
            fontWeight="bold"
          >
            {spectatedPlayer.boost}
          </text>
        </svg>
      )}
    </>
  );
}
