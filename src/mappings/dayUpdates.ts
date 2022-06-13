import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  MarketplaceDayData,
  Marketplace,
} from "../types/schema";
import { MARKETPLACE_ADDRESS, ZERO_BD, ZERO_BI } from "./helpers";

export function updateMarketplaceDayData(event: ethereum.Event): MarketplaceDayData {
  let marketplace = Marketplace.load(MARKETPLACE_ADDRESS);
  if (marketplace === null)
  {
    marketplace = new Marketplace(MARKETPLACE_ADDRESS);
    marketplace.listingCount = 0;
    marketplace.totalVolumeUSD = ZERO_BD;
    marketplace.totalTokensSold = ZERO_BI;
    marketplace.txCount = ZERO_BI;
  }
  marketplace.save();
  
  let timestamp = event.block.timestamp.toI32();
  let dayID = timestamp / 86400;
  let dayStartTimestamp = dayID * 86400;
  let marketplaceDayData = MarketplaceDayData.load(dayID.toString());
  if (marketplaceDayData === null)
  {
    marketplaceDayData = new MarketplaceDayData(dayID.toString());
    marketplaceDayData.date = dayStartTimestamp;
    marketplaceDayData.dailyVolumeUSD = ZERO_BD;
    marketplaceDayData.totalVolumeUSD = ZERO_BD;
    marketplaceDayData.dailyNumberOfTokensSold = ZERO_BI;
    marketplaceDayData.txCount = ZERO_BI;
  }

  marketplaceDayData.totalVolumeUSD = marketplace.totalVolumeUSD;
  marketplaceDayData.txCount = marketplace.txCount;
  marketplaceDayData.save();

  return marketplaceDayData as MarketplaceDayData;
}