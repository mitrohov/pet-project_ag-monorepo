export class PluralForm {
  constructor(
    public readonly one: string,
    public readonly few: string,
    public readonly many: string,
  ) {}
}

const getPluralForm = (count: number): keyof PluralForm => {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return 'one';
  } else if (
    remainder10 >= 2 &&
    remainder10 <= 4 &&
    (remainder100 < 10 || remainder100 >= 20)
  ) {
    return 'few';
  } else {
    return 'many';
  }
};

export const pluralize = (count: number, words: PluralForm): string => {
  const form = getPluralForm(count);
  return `${words[form]}`;
};
