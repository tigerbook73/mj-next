# Planning feature: add support for @src/common/protocols/apis.models.ts GameEventType.ACTION

## Requirements

When user is playing a game, if there is an action event (chi/peng/hu/gang/angang/zimo/drop), show the Action in a floating panel "above" the player's hand tiles (similar to the existing ActionPanel, but only for players other than the current player). This makes it clear to the user what actions they can take in response to other players' moves.
This panel should only show for a short period of time (e.g. 1 second) after the action event is received, and then automatically disappear. This ensures that the UI is not cluttered with too many action panels if there are multiple events in quick succession.

## Implementation considerations

1. action event type is ACTION
2. the "above" position of the panel should be calculated based on the player's hand tiles position, and should be centered horizontally with respect to the player's hand tiles.
3. the panel should be styled in a way that it stands out from the rest
4. the panel should be centered horizontally with respect to the player's hand tiles, and should be positioned above the hand tiles (e.g. using absolute positioning with a negative top value).
5. the panel should show the action name in Chinese Characters and tiles related (e.g. "吃", "碰", "杠", "胡", "暗杠", "自摸") to make it clear to the user what action they can take. For "出牌", it should only show the tile that can be dropped, no action character.
6. hu/zimo should be shown with a more prominent style (e.g. larger font size, different color) to indicate that it's a winning action. And shall not disappear, except the game is reset.
