const PathUtil = (pathname: string, index: number): number => {
  const segments = pathname.split('/').filter(Boolean);
  const segment = segments[index];

  if (!segment) {
    throw new Error(
      `PathUtil: index ${index}에 해당하는 세그먼트가 없습니다. (pathname: ${pathname})`
    );
  }

  const parsed = Number(segment);

  if (Number.isNaN(parsed)) {
    throw new Error(`PathUtil: 세그먼트 "${segment}"는 숫자가 아닙니다.`);
  }

  return parsed;
};

export default PathUtil;
