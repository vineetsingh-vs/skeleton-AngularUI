import { state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';


export function fadeIn(selector = ':enter', duration = '400ms ease-out') {
  return [
    transition(selector, [
      query(selector, [
        style({ opacity: 0, transform: 'translateY(-100px)'}),
        stagger('250ms', [
          animate(duration, keyframes([
            style({ opacity: 1, transform: 'translateY(0px)' }),
          ]))
        ])
      ], {optional: true })
    ])
  ];
}

