interface Props {
  /**@title Exibe informações de parcelamento? */
  /**@description Ativa/Desativa exibição de parcelamento */
  /**@default true */
  showInstallments: boolean;
  /**@title Parcelamento máximo */
  /**@description Quantidade de parcelas máxima que loja pode parcelar */
  /**@default 12 */
  maxInstallment: number;
  /**@title Valor mínimo por parcelas */
  /**@default 0 */
  /**@description Ex: 100, isto quer dizer que se o valor do produto for 200 só poderá parcelar em 2 vezes, totalizando 100 por parcela. Caso não queira limite digitar 0, para que exiba sempre no parcelamento máximo sem limite */
  minValue: number;
}

export interface Returns {
  showInstallments: boolean;
  maxInstallment: number;
  minValue: number;
}

export default function loader(
  { maxInstallment, minValue, showInstallments }: Props,
): Returns {
  return {
    showInstallments,
    maxInstallment,
    minValue,
  };
}
