import type { LanguageModel, ModelMessage } from 'ai';

export type PlayerId = `id-${number}`;

export type VotePhase = 'nomination' | 'execution';

export type GameEvent =
  | {
      type: 'broadcast';
      content: string;
    }
  | {
      type: 'flash';
      id: PlayerId;
      content: string;
    }
  | {
      type: 'speak';
      id: PlayerId;
      content: string;
    }
  | {
      type: 'start-vote';
      phase?: VotePhase;
    }
  | {
      type: 'vote';
      id: PlayerId;
      target: PlayerId;
    }
  | VotesRevealEvent
  | ExecutionEvent
  | {
      type: 'start-defend';
    }
  | { type: 'lie' };

export interface VotesRevealEvent {
  type: 'reveal-votes';
  phase?: VotePhase;
  result: Map<PlayerId, number>;
  mostVoted: PlayerId[];
  isDraw: boolean;
}

export interface ExecutionEvent {
  type: 'execute';
  id: PlayerId;
}

/**
 * Player & Round
 */

export interface StaticPlayer {
  model: LanguageModel;
  name: string;
}

export interface Player extends StaticPlayer {
  messages: ModelMessage[];
}

export interface Round {
  index: number;
  playerIds: PlayerId[];
  playerSet: Set<PlayerId>;
  executed: PlayerId[];
}
