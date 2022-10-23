# Pool Token Marketplace Subgraph

This subgraph dynamically tracks the sale of capped pool tokens in the capped pool token marketplace, as part of our [asset management protocol v2](https://github.com/Tradegen/protocol-v2).

- aggregated data across marketplace listings,
- data on individual listings,
- data on individual transactions,
- data on each user's listings, transactions, sales, and volume,
- historical data on marketplace volume and transaction count

## Running Locally

Make sure to update package.json settings to point to your own graph account.

## Queries

Below are a few ways to show how to query the [pool-token-marketplace subgraph](https://thegraph.com/hosted-service/subgraph/tradegen/pool-token-marketplace) for data. The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://thegraph.com/docs/graphql-api). These queries can be used locally or in The Graph Explorer playground.

## Key Entity Overviews

#### Marketplace

Contains aggregated data across all listings and sales. This entity tracks the total number of listings, total volume (in USD), total number of tokens sold, and the total number of transactions.

#### Listing

Contains data on a specific marketplace listing. Each listing is linked to a User entity.

#### User

Contains data on a specific user. This entity tracks a user's total number of tokens sold, total trading volume (in USD), associated listings, and associated transactions.

#### Transaction

Tracks a specific transaction's block number, timestamp, associated User entity, and pool token address for the transaction's marketplace listing. Each Transaction entity also contains a reference to exactly one subtype (CreateListing, RemoveListing, UpdatePrice, UpdateQuantity, or Purchase entity).

## Example Queries

### Querying Aggregated Data

This query fetches aggredated data from all marketplace listings, to give a view into how much activity is happening on the marketplace.

```graphql
{
  marketplaces(first: 1) {
    listingCount
    totalVolumeUSD
    totalTokensSold
    txCount
  }
}
```
