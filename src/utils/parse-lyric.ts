// 歌词解析
export interface ILyric {
  text: string;
  time: number;
}

const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function parseLyric(lyricString: string) {
  const lyrics: ILyric[] = [];
  // 拿到一行一行的歌词
  const lines = lyricString.split('\n');

  for (const line of lines) {
    const result = timeRegExp.exec(line);

    if (!result) continue;
    // 获取每一组的时间
    const time1 = Number(result[1]) * 60 * 1000;
    const time2 = Number(result[2]) * 1000;
    const time3 =
      result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10;
    const time = time1 + time2 + time3;
    // 获取每一组的文本
    const text = line.replace(timeRegExp, '');

    lyrics.push({ text, time });
  }

  return lyrics;
}
