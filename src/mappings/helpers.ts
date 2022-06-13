import {
    Address,
    BigDecimal,
    BigInt
  } from "@graphprotocol/graph-ts";
  import { Marketplace as MarketplaceContract} from "../types/Marketplace/Marketplace";
  
  export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  
  export const MARKETPLACE_ADDRESS = "0xF59CF0Cc65a80143672B7ff2c3F51eDEdD73A442";
  
  export const cUSD = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  
  export let ZERO_BI = BigInt.fromI32(0);
  export let ONE_BI = BigInt.fromI32(1);
  export let ZERO_BD = BigDecimal.fromString("0");
  export let ONE_BD = BigDecimal.fromString("1");
  export let BI_18 = BigInt.fromI32(18);
  
  export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1");
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
      bd = bd.times(BigDecimal.fromString("10"));
    }
    return bd;
  }
  
  export function bigDecimalExp18(): BigDecimal {
    return BigDecimal.fromString("1000000000000000000");
  }
  
  export function convertEthToDecimal(eth: BigInt): BigDecimal {
    return eth.toBigDecimal().div(exponentToBigDecimal(new BigInt(18)));
  }
  
  export function convertTokenToDecimal(
    tokenAmount: BigInt,
    exchangeDecimals: BigInt
  ): BigDecimal {
    if (exchangeDecimals == ZERO_BI) {
      return tokenAmount.toBigDecimal();
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
  }
  
  export function equalToZero(value: BigDecimal): boolean {
    const formattedVal = parseFloat(value.toString());
    const zero = parseFloat(ZERO_BD.toString());
    if (zero == formattedVal) {
      return true;
    }
    return false;
  }
  
  export function isNullEthValue(value: string): boolean {
    return (
      value ==
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    );
  }
  
  export function fetchTokenClass(listingIndex: BigInt): BigInt {
    let contract = MarketplaceContract.bind(Address.fromString(MARKETPLACE_ADDRESS));
  
    let result = contract.try_getMarketplaceListing(listingIndex);
    let resultValue2 = result.value.toMap().get("value2").toBigInt();
  
    return resultValue2 ? resultValue2 : ZERO_BI;
  }