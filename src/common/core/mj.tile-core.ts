/**
 * common types
 */

export type TileId = number;

/**
 * 动作类型
 */
export const ActionType = {
  Peng: "peng",
  Chi: "chi",
  Gang: "gang",
  Angang: "angang",
  Hu: "hu",
  Pass: "pass",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];

export const TileType = {
  WAN: "万",
  TONG: "筒",
  TIAO: "条",
  JIAN: "箭",
  KONG: " ",
} as const;

export type TileType = (typeof TileType)[keyof typeof TileType];

export class TileCore {
  /**
   * id 是牌的唯一标识(4个牌面相同的牌id是不同的)
   * id 也是 allTiles 数组中牌的索引
   * id = 999 是未知牌
   * id = 其他 (例如 -1) 是空牌 (没有牌)
   */
  constructor(
    public id: TileId, // unique identifier for the tile instance
    public type: TileType, // type of the tile
    public index: number, // index of the tile in the type
    public name: string, // name of the tile
    public nameIndex: number = 0, // index of the name
    public tid: number, // unique tile identifier for the tile (not instance)
  ) {}

  static readonly unknownId = 999;
  static readonly unknownTile = new TileCore(
    TileCore.unknownId,
    TileType.KONG,
    0,
    "",
    0,
    50,
  );

  static readonly voidId = -1;
  static readonly voidTile = new TileCore(
    TileCore.voidId,
    TileType.KONG,
    0,
    "",
    0,
    -1,
  );

  static readonly allTiles = [
    new TileCore(0, TileType.WAN, 1, "一万", 0, 1),
    new TileCore(1, TileType.WAN, 1, "一万", 1, 1),
    new TileCore(2, TileType.WAN, 1, "一万", 2, 1),
    new TileCore(3, TileType.WAN, 1, "一万", 3, 1),
    new TileCore(4, TileType.WAN, 2, "二万", 0, 2),
    new TileCore(5, TileType.WAN, 2, "二万", 1, 2),
    new TileCore(6, TileType.WAN, 2, "二万", 2, 2),
    new TileCore(7, TileType.WAN, 2, "二万", 3, 2),
    new TileCore(8, TileType.WAN, 3, "三万", 0, 3),
    new TileCore(9, TileType.WAN, 3, "三万", 1, 3),
    new TileCore(10, TileType.WAN, 3, "三万", 2, 3),
    new TileCore(11, TileType.WAN, 3, "三万", 3, 3),
    new TileCore(12, TileType.WAN, 4, "四万", 0, 4),
    new TileCore(13, TileType.WAN, 4, "四万", 1, 4),
    new TileCore(14, TileType.WAN, 4, "四万", 2, 4),
    new TileCore(15, TileType.WAN, 4, "四万", 3, 4),
    new TileCore(16, TileType.WAN, 5, "五万", 0, 5),
    new TileCore(17, TileType.WAN, 5, "五万", 1, 5),
    new TileCore(18, TileType.WAN, 5, "五万", 2, 5),
    new TileCore(19, TileType.WAN, 5, "五万", 3, 5),
    new TileCore(20, TileType.WAN, 6, "六万", 0, 6),
    new TileCore(21, TileType.WAN, 6, "六万", 1, 6),
    new TileCore(22, TileType.WAN, 6, "六万", 2, 6),
    new TileCore(23, TileType.WAN, 6, "六万", 3, 6),
    new TileCore(24, TileType.WAN, 7, "七万", 0, 7),
    new TileCore(25, TileType.WAN, 7, "七万", 1, 7),
    new TileCore(26, TileType.WAN, 7, "七万", 2, 7),
    new TileCore(27, TileType.WAN, 7, "七万", 3, 7),
    new TileCore(28, TileType.WAN, 8, "八万", 0, 8),
    new TileCore(29, TileType.WAN, 8, "八万", 1, 8),
    new TileCore(30, TileType.WAN, 8, "八万", 2, 8),
    new TileCore(31, TileType.WAN, 8, "八万", 3, 8),
    new TileCore(32, TileType.WAN, 9, "九万", 0, 9),
    new TileCore(33, TileType.WAN, 9, "九万", 1, 9),
    new TileCore(34, TileType.WAN, 9, "九万", 2, 9),
    new TileCore(35, TileType.WAN, 9, "九万", 3, 9),
    new TileCore(36, TileType.TONG, 1, "一筒", 0, 11),
    new TileCore(37, TileType.TONG, 1, "一筒", 1, 11),
    new TileCore(38, TileType.TONG, 1, "一筒", 2, 11),
    new TileCore(39, TileType.TONG, 1, "一筒", 3, 11),
    new TileCore(40, TileType.TONG, 2, "二筒", 0, 12),
    new TileCore(41, TileType.TONG, 2, "二筒", 1, 12),
    new TileCore(42, TileType.TONG, 2, "二筒", 2, 12),
    new TileCore(43, TileType.TONG, 2, "二筒", 3, 12),
    new TileCore(44, TileType.TONG, 3, "三筒", 0, 13),
    new TileCore(45, TileType.TONG, 3, "三筒", 1, 13),
    new TileCore(46, TileType.TONG, 3, "三筒", 2, 13),
    new TileCore(47, TileType.TONG, 3, "三筒", 3, 13),
    new TileCore(48, TileType.TONG, 4, "四筒", 0, 14),
    new TileCore(49, TileType.TONG, 4, "四筒", 1, 14),
    new TileCore(50, TileType.TONG, 4, "四筒", 2, 14),
    new TileCore(51, TileType.TONG, 4, "四筒", 3, 14),
    new TileCore(52, TileType.TONG, 5, "五筒", 0, 15),
    new TileCore(53, TileType.TONG, 5, "五筒", 1, 15),
    new TileCore(54, TileType.TONG, 5, "五筒", 2, 15),
    new TileCore(55, TileType.TONG, 5, "五筒", 3, 15),
    new TileCore(56, TileType.TONG, 6, "六筒", 0, 16),
    new TileCore(57, TileType.TONG, 6, "六筒", 1, 16),
    new TileCore(58, TileType.TONG, 6, "六筒", 2, 16),
    new TileCore(59, TileType.TONG, 6, "六筒", 3, 16),
    new TileCore(60, TileType.TONG, 7, "七筒", 0, 17),
    new TileCore(61, TileType.TONG, 7, "七筒", 1, 17),
    new TileCore(62, TileType.TONG, 7, "七筒", 2, 17),
    new TileCore(63, TileType.TONG, 7, "七筒", 3, 17),
    new TileCore(64, TileType.TONG, 8, "八筒", 0, 18),
    new TileCore(65, TileType.TONG, 8, "八筒", 1, 18),
    new TileCore(66, TileType.TONG, 8, "八筒", 2, 18),
    new TileCore(67, TileType.TONG, 8, "八筒", 3, 18),
    new TileCore(68, TileType.TONG, 9, "九筒", 0, 19),
    new TileCore(69, TileType.TONG, 9, "九筒", 1, 19),
    new TileCore(70, TileType.TONG, 9, "九筒", 2, 19),
    new TileCore(71, TileType.TONG, 9, "九筒", 3, 19),
    new TileCore(72, TileType.TIAO, 1, "一条", 0, 21),
    new TileCore(73, TileType.TIAO, 1, "一条", 1, 21),
    new TileCore(74, TileType.TIAO, 1, "一条", 2, 21),
    new TileCore(75, TileType.TIAO, 1, "一条", 3, 21),
    new TileCore(76, TileType.TIAO, 2, "二条", 0, 22),
    new TileCore(77, TileType.TIAO, 2, "二条", 1, 22),
    new TileCore(78, TileType.TIAO, 2, "二条", 2, 22),
    new TileCore(79, TileType.TIAO, 2, "二条", 3, 22),
    new TileCore(80, TileType.TIAO, 3, "三条", 0, 23),
    new TileCore(81, TileType.TIAO, 3, "三条", 1, 23),
    new TileCore(82, TileType.TIAO, 3, "三条", 2, 23),
    new TileCore(83, TileType.TIAO, 3, "三条", 3, 23),
    new TileCore(84, TileType.TIAO, 4, "四条", 0, 24),
    new TileCore(85, TileType.TIAO, 4, "四条", 1, 24),
    new TileCore(86, TileType.TIAO, 4, "四条", 2, 24),
    new TileCore(87, TileType.TIAO, 4, "四条", 3, 24),
    new TileCore(88, TileType.TIAO, 5, "五条", 0, 25),
    new TileCore(89, TileType.TIAO, 5, "五条", 1, 25),
    new TileCore(90, TileType.TIAO, 5, "五条", 2, 25),
    new TileCore(91, TileType.TIAO, 5, "五条", 3, 25),
    new TileCore(92, TileType.TIAO, 6, "六条", 0, 26),
    new TileCore(93, TileType.TIAO, 6, "六条", 1, 26),
    new TileCore(94, TileType.TIAO, 6, "六条", 2, 26),
    new TileCore(95, TileType.TIAO, 6, "六条", 3, 26),
    new TileCore(96, TileType.TIAO, 7, "七条", 0, 27),
    new TileCore(97, TileType.TIAO, 7, "七条", 1, 27),
    new TileCore(98, TileType.TIAO, 7, "七条", 2, 27),
    new TileCore(99, TileType.TIAO, 7, "七条", 3, 27),
    new TileCore(100, TileType.TIAO, 8, "八条", 0, 28),
    new TileCore(101, TileType.TIAO, 8, "八条", 1, 28),
    new TileCore(102, TileType.TIAO, 8, "八条", 2, 28),
    new TileCore(103, TileType.TIAO, 8, "八条", 3, 28),
    new TileCore(104, TileType.TIAO, 9, "九条", 0, 29),
    new TileCore(105, TileType.TIAO, 9, "九条", 1, 29),
    new TileCore(106, TileType.TIAO, 9, "九条", 2, 29),
    new TileCore(107, TileType.TIAO, 9, "九条", 3, 29),
    new TileCore(108, TileType.JIAN, 1, "东", 0, 31),
    new TileCore(109, TileType.JIAN, 1, "东", 1, 31),
    new TileCore(110, TileType.JIAN, 1, "东", 2, 31),
    new TileCore(111, TileType.JIAN, 1, "东", 3, 31),
    new TileCore(112, TileType.JIAN, 2, "南", 0, 32),
    new TileCore(113, TileType.JIAN, 2, "南", 1, 32),
    new TileCore(114, TileType.JIAN, 2, "南", 2, 32),
    new TileCore(115, TileType.JIAN, 2, "南", 3, 32),
    new TileCore(116, TileType.JIAN, 3, "西", 0, 33),
    new TileCore(117, TileType.JIAN, 3, "西", 1, 33),
    new TileCore(118, TileType.JIAN, 3, "西", 2, 33),
    new TileCore(119, TileType.JIAN, 3, "西", 3, 33),
    new TileCore(120, TileType.JIAN, 4, "北", 0, 34),
    new TileCore(121, TileType.JIAN, 4, "北", 1, 34),
    new TileCore(122, TileType.JIAN, 4, "北", 2, 34),
    new TileCore(123, TileType.JIAN, 4, "北", 3, 34),
    new TileCore(124, TileType.JIAN, 5, "中", 0, 37),
    new TileCore(125, TileType.JIAN, 5, "中", 1, 37),
    new TileCore(126, TileType.JIAN, 5, "中", 2, 37),
    new TileCore(127, TileType.JIAN, 5, "中", 3, 37),
    new TileCore(128, TileType.JIAN, 6, "发", 0, 36),
    new TileCore(129, TileType.JIAN, 6, "发", 1, 36),
    new TileCore(130, TileType.JIAN, 6, "发", 2, 36),
    new TileCore(131, TileType.JIAN, 6, "发", 3, 36),
    new TileCore(132, TileType.JIAN, 7, "白", 0, 35),
    new TileCore(133, TileType.JIAN, 7, "白", 1, 35),
    new TileCore(134, TileType.JIAN, 7, "白", 2, 35),
    new TileCore(135, TileType.JIAN, 7, "白", 3, 35),
    // new TileCore( 136, TileType.HUA, 1, "春", 41 ),
    // new TileCore( 137, TileType.HUA, 2, "夏", 41 ),
    // new TileCore( 138, TileType.HUA, 3, "秋", 41 ),
    // new TileCore( 139, TileType.HUA, 4, "东", 41 ),
    // new TileCore( 140, TileType.HUA, 5, "梅", 41 ),
    // new TileCore( 141, TileType.HUA, 6, "兰", 41 ),
    // new TileCore( 142, TileType.HUA, 7, "竹", 41 ),
    // new TileCore( 143, TileType.HUA, 8, "菊", 41 ),
  ];

  static fromId(id: TileId) {
    if (id === TileCore.unknownId) {
      return TileCore.unknownTile;
    }
    if (id === TileCore.voidId) {
      return TileCore.voidTile;
    }
    return (
      TileCore.allTiles.find((tile) => tile.id === id) || TileCore.unknownTile
    );
  }

  static fromNameAndIndex(name: string, index: number) {
    return (
      TileCore.allTiles.find(
        (tile) => tile.name === name && tile.nameIndex === index,
      ) || TileCore.unknownTile
    );
  }

  static isIdentical(tile1: TileCore | TileId, tile2: TileCore | TileId) {
    return (
      (typeof tile1 === "number" ? tile1 : tile1.id) ===
      (typeof tile2 === "number" ? tile2 : tile2.id)
    );
  }

  static isSame(
    tile1: TileCore | TileId,
    tile2: TileCore | TileId,
    tile3: TileCore | TileId = TileCore.voidId,
    tile4: TileCore | TileId = TileCore.voidId,
  ) {
    const t1 = tile1 instanceof TileCore ? tile1 : TileCore.fromId(tile1);
    const t2 = tile2 instanceof TileCore ? tile2 : TileCore.fromId(tile2);
    const t3 = tile3 instanceof TileCore ? tile3 : TileCore.fromId(tile3);
    const t4 = tile4 instanceof TileCore ? tile4 : TileCore.fromId(tile4);

    if (t1.name !== t2.name) {
      return false;
    }

    if (t3.id !== TileCore.voidId && t1.name !== t3.name) {
      return false;
    }

    if (t4.id !== TileCore.voidId && t1.name !== t4.name) {
      return false;
    }

    return true;
  }

  static isConsecutive(
    tile1: TileCore | TileId,
    tile2: TileCore | TileId,
    tile3: TileCore | TileId = TileCore.voidId,
  ) {
    const tiles: TileCore[] = [];
    tiles.push(tile1 instanceof TileCore ? tile1 : TileCore.fromId(tile1));
    tiles.push(tile2 instanceof TileCore ? tile2 : TileCore.fromId(tile2));
    if (tile3 !== TileCore.voidId) {
      tiles.push(tile3 instanceof TileCore ? tile3 : TileCore.fromId(tile3));
    }

    if (!tiles[0].isWan() && !tiles[0].isTong() && !tiles[0].isTiao()) {
      return false;
    }

    tiles.sort((a, b) => a.index - b.index);

    for (let i = 0; i < tiles.length - 1; i++) {
      if (
        tiles[i].type !== tiles[i + 1].type ||
        tiles[i].index + 1 !== tiles[i + 1].index
      ) {
        return false;
      }
    }
    return true;
  }

  static sortTiles(tiles: (TileCore | TileId)[]): (TileCore | TileId)[] {
    if (tiles.length == 0) {
      return tiles;
    }

    return tiles.sort((a, b) => {
      const aId = typeof a === "number" ? a : a.id;
      const bId = typeof b === "number" ? b : b.id;
      return aId - bId;
    });
  }

  static canHu(handTiles: readonly TileId[], tile = TileCore.voidId) {
    const tiles = handTiles.slice();
    if (tile !== TileCore.voidId) {
      tiles.push(tile);
    }

    // sort tiles
    TileCore.sortTiles(tiles);

    for (let i = 0; i < tiles.length - 1; i++) {
      // try all pairs from start
      if (!TileCore.isSame(tiles[i], tiles[i + 1])) {
        continue;
      }
      const rest = tiles.slice();
      const result: Array<[TileId, TileId] | [TileId, TileId, TileId]> = [
        rest.splice(i, 2) as [TileId, TileId],
      ];

      while (rest.length >= 3) {
        // try the same 3 tiles
        if (TileCore.isSame(rest[0], rest[1], rest[2])) {
          result.push([rest[0], rest[1], rest[2]]);
          rest.splice(0, 3);
          continue;
        }

        // try the consecutive 3 tiles
        const t1 = 0;
        const t2 = rest.findIndex((tile) =>
          TileCore.isConsecutive(rest[t1], tile),
        );
        if (t2 < 0) {
          break; // no consecutive tiles
        }
        const t3 = rest.findIndex((tile) =>
          TileCore.isConsecutive(rest[t1], rest[t2], tile),
        );
        if (t3 < 0) {
          break; // no consecutive tiles
        }

        result.push([rest[t1], rest[t2], rest[t3]]);
        rest.splice(t3, 1);
        rest.splice(t2, 1);
        rest.splice(t1, 1);
      }

      if (rest.length === 0) {
        return true;
      }
    }

    return false;
  }

  static canPeng(handTiles: readonly TileId[], target: TileId): boolean {
    return handTiles.filter((t) => TileCore.isSame(t, target)).length >= 2;
  }

  static canGang(handTiles: readonly TileId[], target: TileId): boolean {
    return handTiles.filter((t) => TileCore.isSame(t, target)).length >= 3;
  }

  static canAngang(handTiles: readonly TileId[]): boolean {
    const handTileSet = new Map<TileId, number>();
    for (const tile of handTiles) {
      const count = handTileSet.get(tile) || 0;
      if (count === 3) {
        return true;
      }
      handTileSet.set(tile, count + 1);
    }
    return false;
  }

  static canChi(handTiles: readonly TileId[], target: TileId): boolean {
    const filteredTiles = []; // tiles list that does not contain the latest tile and duplicate tiles
    let previousTile = TileCore.voidId;
    for (const tile of handTiles) {
      if (
        !TileCore.isSame(tile, target) &&
        !TileCore.isSame(tile, previousTile)
      ) {
        filteredTiles.push(tile);
      }
      previousTile = tile;
    }

    for (let i = 0; i < filteredTiles.length - 1; i++) {
      if (
        TileCore.isConsecutive(filteredTiles[i], filteredTiles[i + 1], target)
      ) {
        return true;
      }
    }
    return false;
  }

  isWan() {
    return this.type === TileType.WAN;
  }

  isTong() {
    return this.type === TileType.TONG;
  }

  isTiao() {
    return this.type === TileType.TIAO;
  }

  /**
   * 分析手牌，统计牌型和计算分数
   * @param tiles 手牌数组
   * @returns 包含牌统计信息和分数的分析结果
   */
  private static analyzeTiles(tiles: readonly TileId[]) {
    const sortedTiles = [...tiles].sort((a, b) => a - b);

    // 统计每种牌的数量
    const tileCount = new Map<string, { ids: TileId[]; count: number }>();
    for (const tileId of sortedTiles) {
      const tile = TileCore.fromId(tileId);
      const key = `${tile.type}-${tile.index}`;
      if (!tileCount.has(key)) tileCount.set(key, { ids: [], count: 0 });
      const entry = tileCount.get(key)!;
      entry.ids.push(tileId);
      entry.count++;
    }

    // 给每张牌计算分数（分数越低越容易打出）
    const tileScores = new Map<TileId, number>();

    for (const tileId of sortedTiles) {
      const tile = TileCore.fromId(tileId);
      const key = `${tile.type}-${tile.index}`;
      const entry = tileCount.get(key)!;

      let score = 0;

      // 刻子 / 杠子 → 保留
      if (entry.count >= 3) {
        score += 100;
      }
      // 对子 → 次高保留
      else if (entry.count === 2) {
        score += 50;
      }
      // 单张 → 基础分
      else {
        score += 10;
      }

      // 数牌顺子潜力
      if (tile.isWan() || tile.isTong() || tile.isTiao()) {
        const prevKey = `${tile.type}-${tile.index - 1}`;
        const nextKey = `${tile.type}-${tile.index + 1}`;
        const prev2Key = `${tile.type}-${tile.index - 2}`;
        const next2Key = `${tile.type}-${tile.index + 2}`;

        // 存在邻牌 → 增加保留分
        if (tileCount.has(prevKey)) score += 20;
        if (tileCount.has(nextKey)) score += 20;
        if (tileCount.has(prev2Key)) score += 10;
        if (tileCount.has(next2Key)) score += 10;

        // 边张（1/9）孤张 → 减分，容易打出
        if (tile.index === 1 || tile.index === 9) score -= 15;

        // 中间牌（4/5/6） → 保留价值稍高
        if (tile.index >= 4 && tile.index <= 6) score += 5;
      } else {
        // 字牌
        if (entry.count === 1)
          score -= 20; // 孤张字牌 → 优先打出
        else if (entry.count === 2) score += 0; // 对子字牌 → 保留
      }

      tileScores.set(tileId, score);
    }

    return {
      sortedTiles,
      tileCount,
      tileScores,
    };
  }

  /**
   * 判断麻将下一张牌应该打什么
   * @param tiles 手牌数组, 长度可以是14/11/8/5/2，因为已经碰/吃的牌就不用考虑了
   * @return 如果能胡牌，返回 null，否则返回一个 TileId
   */
  static decideDiscard(tiles: readonly TileId[]): TileId | null {
    if (tiles.length === 0) return null;

    // 1. 如果能胡牌，不出牌（返回 null 表示可以胡牌）
    const { sortedTiles, tileScores } = TileCore.analyzeTiles(tiles);
    if (TileCore.canHu(sortedTiles)) return null;

    // 2. 找到分数最低的牌打出
    let minScore = Infinity;
    for (const tileId of sortedTiles) {
      const score = tileScores.get(tileId) || 0;
      if (score < minScore) {
        minScore = score;
      }
    }

    // 3. 如果有多张相同分数的牌，按类型优先级选择
    const minScoreTiles = sortedTiles.filter(
      (tileId) => (tileScores.get(tileId) || 0) === minScore,
    );

    // 优先打孤张字牌 → 边张 → 中间数牌
    minScoreTiles.sort((a, b) => {
      const tileA = TileCore.fromId(a);
      const tileB = TileCore.fromId(b);

      const weight = (tile: TileCore) => {
        if (tile.type === TileType.JIAN) return 3;
        if (tile.index === 1 || tile.index === 9) return 2;
        return 1;
      };

      return weight(tileB) - weight(tileA); // 分值高的留着，低的先打
    });

    return minScoreTiles[0];
  }

  /**
   * 判断麻将下一张牌是否应该吃/碰
   * @param handTiles 手牌数组, 长度可以是13/10/7/4，因为已经碰/吃的牌就不用考虑了
   * @param target 目标牌
   * @param allowActions = [Chi, Peng]
   * @return 如果应该吃/碰，返回 Action及参与action的tiles（不含target), 否则返回 null
   */
  static decideAction(
    handTiles: readonly TileId[],
    target: TileId,
    allowActions: ActionType[],
  ): { action: ActionType; tiles: TileId[] } | null {
    if (handTiles.length === 0) return null;

    // 1. 优先级：胡牌 > 杠 > 碰 > 吃
    // 检查是否能胡牌（加上目标牌后）
    if (allowActions.includes(ActionType.Hu)) {
      if (TileCore.canHu(handTiles, target)) {
        return { action: ActionType.Hu, tiles: [] }; // 胡牌不需要额外的tiles
      }
    }

    // 2. 检查是否能杠
    if (allowActions.includes(ActionType.Gang)) {
      if (TileCore.canGang(handTiles, target)) {
        // 找到用于杠的三张牌
        const gangTiles = TileCore.findGangTiles(handTiles, target);
        return { action: ActionType.Gang, tiles: gangTiles };
      }
    }

    // 3. 分析手牌价值
    const { tileCount } = TileCore.analyzeTiles(handTiles);

    // 4. 检查是否应该碰
    if (allowActions.includes(ActionType.Peng)) {
      if (TileCore.canPeng(handTiles, target)) {
        const pengResult = TileCore.evaluatePengValue(
          handTiles,
          target,
          tileCount,
        );
        if (pengResult.value > 30) {
          // 阈值可调
          return { action: ActionType.Peng, tiles: pengResult.tiles };
        }
      }
    }

    // 5. 检查是否应该吃（优先级最低）
    if (allowActions.includes(ActionType.Chi)) {
      if (TileCore.canChi(handTiles, target)) {
        const chiResult = TileCore.evaluateChiValue(handTiles, target);
        if (chiResult.value > 25) {
          // 阈值可调
          return { action: ActionType.Chi, tiles: chiResult.tiles };
        }
      }
    }

    return null;
  }

  /**
   * 评估碰牌的价值
   */
  private static evaluatePengValue(
    handTiles: readonly TileId[],
    target: TileId,
    tileCount: Map<string, { ids: TileId[]; count: number }>,
  ): { value: number; tiles: TileId[] } {
    const targetTile = TileCore.fromId(target);
    const targetKey = `${targetTile.type}-${targetTile.index}`;
    const entry = tileCount.get(targetKey);

    if (!entry || entry.count < 2) {
      return { value: 0, tiles: [] };
    }

    // 找到用于碰的两张牌
    const pengTiles = handTiles
      .filter((tileId) => TileCore.isSame(tileId, target))
      .slice(0, 2);

    let value = 20; // 基础碰牌价值

    // 字牌碰牌价值更高（字牌只能做刻子）
    if (targetTile.type === TileType.JIAN) {
      value += 15;
    }

    // 边张（1,9）碰牌价值较高（顺子潜力小）
    if (
      (targetTile.isWan() || targetTile.isTong() || targetTile.isTiao()) &&
      (targetTile.index === 1 || targetTile.index === 9)
    ) {
      value += 10;
    }

    // 如果手牌中已经有很多这种牌，碰的价值更高
    if (entry.count >= 3) {
      value += 20; // 可以直接杠
    }

    // 模拟碰牌后的手牌，看是否更接近胡牌
    const afterPengTiles = handTiles.filter(
      (id) => !TileCore.isSame(id, target),
    );
    const beforeHuPotential = TileCore.calculateHuPotential(handTiles);
    const afterHuPotential = TileCore.calculateHuPotential(afterPengTiles);

    if (afterHuPotential > beforeHuPotential) {
      value += 15;
    }

    return { value, tiles: pengTiles };
  }

  /**
   * 评估吃牌的价值
   */
  private static evaluateChiValue(
    handTiles: readonly TileId[],
    target: TileId,
  ): { value: number; tiles: TileId[] } {
    const targetTile = TileCore.fromId(target);

    // 字牌不能吃
    if (targetTile.type === TileType.JIAN) {
      return { value: 0, tiles: [] };
    }

    // 检查能组成的顺子类型和数量
    const possibleChiCombos = TileCore.getPossibleChiCombinations(
      handTiles,
      target,
    );

    if (possibleChiCombos.length === 0) {
      return { value: 0, tiles: [] };
    }

    let value = 15; // 基础吃牌价值

    // 中间牌吃牌价值更高
    if (targetTile.index >= 4 && targetTile.index <= 6) {
      value += 5;
    }

    if (possibleChiCombos.length > 1) {
      value += 10; // 有多种吃法选择
    }

    // 选择最优的组合（简化：取第一个组合）
    const bestCombo = possibleChiCombos[0];

    // 模拟吃牌后的手牌，看是否更接近胡牌
    const afterChiTiles = handTiles.filter((id) => !bestCombo.includes(id));
    const beforeHuPotential = TileCore.calculateHuPotential(handTiles);
    const afterHuPotential = TileCore.calculateHuPotential(afterChiTiles);

    if (afterHuPotential > beforeHuPotential) {
      value += 10;
    }

    return { value, tiles: bestCombo };
  }

  /**
   * 计算胡牌潜力（简化版）
   */
  private static calculateHuPotential(tiles: readonly TileId[]): number {
    const { tileCount } = TileCore.analyzeTiles(tiles);
    let potential = 0;

    // 统计对子、刻子数量
    let pairs = 0;
    let triplets = 0;

    for (const [, entry] of tileCount) {
      if (entry.count === 2) pairs++;
      if (entry.count >= 3) triplets++;
    }

    potential += pairs * 10 + triplets * 20;

    // 统计顺子潜力
    for (const [key, entry] of tileCount) {
      if (entry.count > 0) {
        const [type, index] = key.split("-");
        const idx = parseInt(index);

        if (type !== TileType.JIAN.toString()) {
          // 检查顺子潜力
          const nextKey1 = `${type}-${idx + 1}`;
          const nextKey2 = `${type}-${idx + 2}`;

          if (tileCount.has(nextKey1) && tileCount.has(nextKey2)) {
            potential += 15; // 连续三张
          } else if (tileCount.has(nextKey1) || tileCount.has(nextKey2)) {
            potential += 8; // 有一张相邻
          }
        }
      }
    }

    return potential;
  }

  /**
   * 找到用于杠的三张牌
   */
  private static findGangTiles(
    handTiles: readonly TileId[],
    target: TileId,
  ): TileId[] {
    // 使用 filter 找到所有匹配的牌，然后取前3张
    return handTiles
      .filter((tileId) => TileCore.isSame(tileId, target))
      .slice(0, 3);
  }

  /**
   * 获取可能的吃牌组合
   */
  private static getPossibleChiCombinations(
    handTiles: readonly TileId[],
    target: TileId,
  ): TileId[][] {
    const targetTile = TileCore.fromId(target);
    const combinations: TileId[][] = [];

    if (targetTile.type === TileType.JIAN) return combinations;

    // 检查三种吃牌可能：ABC, XAB, ABX (A是目标牌)
    const targetIndex = targetTile.index;

    // 情况1: target-2, target-1, target (目标牌在最后)
    if (targetIndex >= 3) {
      const tile1 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex - 2;
      });
      const tile2 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex - 1;
      });

      if (tile1 !== undefined && tile2 !== undefined) {
        combinations.push([tile1, tile2]);
      }
    }

    // 情况2: target-1, target, target+1 (目标牌在中间)
    if (targetIndex >= 2 && targetIndex <= 8) {
      const tile1 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex - 1;
      });
      const tile2 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex + 1;
      });

      if (tile1 !== undefined && tile2 !== undefined) {
        combinations.push([tile1, tile2]);
      }
    }

    // 情况3: target, target+1, target+2 (目标牌在最前)
    if (targetIndex <= 7) {
      const tile1 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex + 1;
      });
      const tile2 = handTiles.find((id) => {
        const t = TileCore.fromId(id);
        return t.type === targetTile.type && t.index === targetIndex + 2;
      });

      if (tile1 !== undefined && tile2 !== undefined) {
        combinations.push([tile1, tile2]);
      }
    }

    return combinations;
  }
}
