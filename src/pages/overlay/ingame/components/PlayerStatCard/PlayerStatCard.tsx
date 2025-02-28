import { FC } from 'react';
import { useStateContext } from '../../../../contexts';
import { GameService } from '../../../../services/gameService';
import './PlayerStatCard.css';

const SVGStat: FC<{ x: number; num: number; label: string }> = ({
  x,
  num,
  label,
}) => {
  return (
    <>
      <text
        dominantBaseline="middle"
        textAnchor="end"
        x={x.toString()}
        y="19"
        fill="#ffffff"
        style={{
          fontFamily: 'Chivo',
          fontWeight: '500',
          fontStyle: 'italic',
          fontSize: '20px',
        }}
      >
        {num}
      </text>
      <text
        dominantBaseline="middle"
        x={(x + 8).toString()}
        y="18"
        fill="#dfdfdf"
        style={{
          fontFamily: 'Chivo',
          fontWeight: '400',
          fontStyle: 'italic',
          fontSize: '14px',
        }}
      >
        {label}
      </text>
    </>
  );
};

export default function PlayerStatCard() {
  const { state } = useStateContext();

  const spectatedPlayer = GameService.getPlayerFromTarget(
    state.players,
    state.game.target
  );

  return (
    <>
      {spectatedPlayer && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 818 36"
          width={818}
          height={36}
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '25px',
          }}
        >
          <g id="Statcard">
            <g id="Stats">
              <polygon
                id="Panel"
                className="psc-cls-1"
                points="806 36 240 36 252 0 818 0 806 36"
              />
              <SVGStat x={318} num={spectatedPlayer.score} label="PUNTOS" />
              <SVGStat
                x={430}
                num={spectatedPlayer.goals}
                label={
                  spectatedPlayer.goals === 0 || spectatedPlayer.goals > 1
                    ? 'GOLES'
                    : 'GOL'
                }
              />
              <SVGStat x={530} num={spectatedPlayer.shots} label={'TIROS'} />
              <SVGStat x={628} num={spectatedPlayer.assists} label={'AST'} />
              <SVGStat x={710} num={spectatedPlayer.saves} label={'SALVADAS'} />
            </g>
            <g id="Player">
              <polygon
                id="Panel-2"
                data-name="Panel"
                className="psc-cls-3"
                points="241 36 0 36 12 0 253 0 241 36"
              />
              <text
                dominantBaseline="middle"
                textAnchor="middle"
                x="128"
                y="18"
                fill="#ffffff"
                style={{
                  fontFamily: 'Chivo',
                  fontWeight: '400',
                  fontStyle: 'italic',
                  fontSize: '18px',
                }}
              >
                {spectatedPlayer.name}
              </text>
              <g id="Details">
                <polygon
                  fill={spectatedPlayer.team === 0 ? '#22b0ff' : '#ff8a15'}
                  points="1 36 0 36 12 0 13 0 1 36"
                />
                <polygon
                  fill={spectatedPlayer.team === 0 ? '#22b0ff' : '#ff8a15'}
                  points="241 36 0 36 1 35 242 35 241 36"
                />
              </g>
            </g>
          </g>
        </svg>
      )}
    </>
  );
}
