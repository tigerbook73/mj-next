import { Game, GameState, Position } from "./mj.game";
import { ActionType, type TileId } from "./mj.tile-core";

describe("Game serialization", () => {
  it("should serialize and deserialize the game state correctly", () => {
    const game = new Game();
    game.init([Position.East, Position.South, Position.West, Position.North]);

    let json = game.toJSON();
    json.passedPlayers = [];
    let jsonNew = Game.fromJSON(json).toJSON();
    jsonNew.passedPlayers = [];
    expect(jsonNew).toEqual(json);

    game.start();
    json = game.toJSON();
    json.passedPlayers = [];
    jsonNew = Game.fromJSON(json).toJSON();
    jsonNew.passedPlayers = [];
    expect(jsonNew).toEqual(json);

    game.drop(game.current?.handTiles[0] as TileId);
    json = game.toJSON();
    json.passedPlayers = [];
    jsonNew = Game.fromJSON(json).toJSON();
    jsonNew.passedPlayers = [];
    expect(jsonNew).toEqual(json);

    // pass all players (or resolve pick sentinel)
    while (game.state === GameState.WaitingPass) {
      if (game.queuedActions.some((a) => a.type === ActionType.Pick)) {
        game.handleQueuedActions();
      } else {
        const next = game.getNextPlayer(game.current);
        game.pass(next);
      }
      json = game.toJSON();
      json.passedPlayers = [];
      jsonNew = Game.fromJSON(json).toJSON();
      jsonNew.passedPlayers = [];
      expect(jsonNew).toEqual(json);
    }
  });
});
