const event = {
  type: "gameUpdated",
  data: {
    clients: [
      {
        id: "XilP6LyfBrOzT67iAAAF",
        user: {
          name: "example@email.com",
          firstName: "example",
          lastName: "email.com",
          email: "example@email.com",
          type: "human",
        },
        socketId: "XilP6LyfBrOzT67iAAAF",
      },
    ],
    rooms: [
      {
        name: "room-1",
        state: "started",
        players: [
          {
            userName: "bot-0",
            roomName: "room-1",
            role: "player",
            type: "bot",
            position: 0,
          },
          {
            userName: "bot-2",
            roomName: "room-1",
            role: "player",
            type: "bot",
            position: 2,
          },
          {
            userName: "bot-3",
            roomName: "room-1",
            role: "player",
            type: "bot",
            position: 3,
          },
          {
            userName: "example@email.com",
            roomName: "room-1",
            role: "player",
            type: "human",
            position: 1,
          },
        ],
        game: {
          players: [
            {
              position: 0,
              handTiles: [14, 33, 36, 39, 48, 74, 84, 87, 88, 93, 95, 98, 99],
              picked: -1,
              openedSets: [],
            },
            {
              position: 1,
              handTiles: [3, 4, 7, 10, 20, 21, 24, 53, 59, 92, 97],
              picked: -1,
              openedSets: [
                {
                  tiles: [128, 130, 131],
                  target: 130,
                  actionType: "peng",
                  from: 1,
                },
              ],
            },
            {
              position: 2,
              handTiles: [8, 9, 13, 32, 44, 45, 57, 63, 68, 73, 81, 96, 133],
              picked: -1,
              openedSets: [],
            },
            {
              position: 3,
              handTiles: [15, 27, 29, 40, 41, 47, 52, 58, 69, 75, 78, 80, 94],
              picked: -1,
              openedSets: [],
            },
          ],
          walls: [
            {
              position: 0,
              tiles: [
                71, 6, 25, 1, 70, 123, 118, 100, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
              ],
            },
            {
              position: 1,
              tiles: [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1,
              ],
            },
            {
              position: 2,
              tiles: [
                -1, -1, -1, 51, 115, 114, 28, 46, 11, 65, 72, 23, 17, 86, 18,
                103, 101, 109, 102, 64, 124, 50, 38, 19, 42, 90, 35, 61, 60, 16,
                106, 120, 119, 108,
              ],
            },
            {
              position: 3,
              tiles: [
                85, 89, 31, 121, 77, 83, 126, 107, 26, 129, 56, 43, 67, 22, 82,
                49, 105, 91, 104, 62, 34, 117, 30, 5, 134, 0, 55, 112, 12, 132,
                79, 66, 54, 122,
              ],
            },
          ],
          discards: [
            { position: 0, tiles: [116, 135, 2] },
            { position: 1, tiles: [76, 37] },
            { position: 2, tiles: [110, 125, 130] },
            { position: 3, tiles: [111, 113, 127] },
          ],
          state: "waiting_action",
          latestTile: -1,
          current: 1,
          dealer: 0,
          pickPosition: 2,
          pickIndex: 3,
          reversePickPosition: 0,
          reversePickIndex: 7,
          passedPlayers: [],
        },
      },
    ],
  },
};

export function getFakeEvent() {
  return event;
}
